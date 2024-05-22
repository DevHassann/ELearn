import { Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncErrors } from "../middlewares/CatchAsyncErrors";

// CREATE COURSE FUNCTION
export const createCourseService = CatchAsyncErrors(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

// GET ALL COURSES FUNCTION
export const getAllCourseService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
