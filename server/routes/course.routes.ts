import express from "express";
import {
  addAnswer,
  addQuestion,
  AddReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getCourses,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/Auth";

// INITIALIZATING ROUTER
const courseRouter = express.Router();

// API PATHS
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-all-courses", getAllCourses);

courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

courseRouter.put("/add-question", isAuthenticated, addQuestion);

courseRouter.put("/add-answer", isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", isAuthenticated, addReview);

courseRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRole("admin"),
  AddReplyToReview
);

courseRouter.get(
  "/get-courses",
  isAuthenticated,
  authorizeRole("admin"),
  getCourses
);

courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteCourse
);

export default courseRouter;
