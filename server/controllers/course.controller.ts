import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncErrors } from "../middlewares/CatchAsyncErrors";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../databases/redisDatabase";
import {
  CourseNotFoundMessage,
  InvalidContentIDMessage,
  InvalidQuestionIDMessage,
  NotEligibleToAccessMessage,
  ReviewNotFoundMessage,
} from "../messages/api.messages";
import {
  IAddReplyReviewData,
  IAddReviewData,
  IAnswerData,
  IQuestionData,
} from "../interfaces/api.interfaces";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/SendMail";

// CREATE COURSE FUNCTION
export const uploadCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "Elearn Courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// EDIT COURSE FUNCTION
export const editCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const courseId = req.params.id;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "Elearn Courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// GET SINGLE COURSE FUNCTION - [ WITHOUT PURCHASING ]
export const getSingleCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set(courseId, JSON.stringify(course));

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// GET ALL COURSES FUNCTION - [ WITHOUT PURCHASING ]
export const getAllCourses = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);

        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set("allCourses", JSON.stringify(courses));

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// GET COURSE CONTENT FUNCTION - [ ONLY FOR VALID USERS ]
export const getCourseByUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(new ErrorHandler(NotEligibleToAccessMessage, 404));
      }

      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// ADD QUESTION IN COURSE FUNCTION
export const addQuestion = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IQuestionData = req.body;
      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler(InvalidContentIDMessage, 404));
      }

      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler(InvalidContentIDMessage, 404));
      }

      // CREATE A NEW QUESTION OBJECT
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // ADD THIS QUESTION TO OUR COURSE CONTENT
      courseContent.questions.push(newQuestion);

      // SAVE THE UPADATED COURSE
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// ADD ANSWER IN COURSE QUESTION FUNCTION
export const addAnswer = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { answer, courseId, contentId, questionId }: IAnswerData = req.body;
    const course = await CourseModel.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return next(new ErrorHandler(InvalidContentIDMessage, 404));
    }

    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );
    if (!courseContent) {
      return next(new ErrorHandler(InvalidContentIDMessage, 404));
    }

    const question = courseContent?.questions?.find((item: any) =>
      item._id.equals(questionId)
    );
    if (!question) {
      return next(new ErrorHandler(InvalidQuestionIDMessage, 404));
    }

    // CREATE A NEW ANSWER OBJECT
    const newAnswer: any = {
      user: req.user,
      answer,
    };

    // ADD THIS ANSWER TO OUR COURSE CONTENT
    question.questionReplies.push(newAnswer);

    await course?.save();

    if (req.user?._id === question.user._id) {
      // CREATE A NOTIFICATION
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../templates/question-reply.ejs"),
        data
      );

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question Reply",
          template: "question-reply.ejs",
          data,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// ADD REVIEW IN COURSE FUNCTION
export const addReview = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      // CHECK IF COURSE-ID ALREADY EXISTS IN USER COURSE LIST BASED ON _id.
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );
      if (!courseExists) {
        return next(new ErrorHandler(NotEligibleToAccessMessage, 404));
      }

      const course = await CourseModel.findById(courseId);
      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(reviewData);

      // RATING FUNCTION & MATH
      let avg = 0;
      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });
      if (course) {
        course.ratings = avg / course.reviews.length;
      }

      await course?.save();

      const notification = {
        title: "New Review Received",
        message: `${req.user?.name} has given a review in ${course?.name}`,
      };

      // CREATE NOTIFICATION

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// ADD REPLY TO REVIEW IN COURSE FUNCTION
export const AddReplyToReview = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReplyReviewData;

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(CourseNotFoundMessage, 404));
      }

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler(ReviewNotFoundMessage, 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
