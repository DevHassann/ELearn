import { Document } from "mongoose";

// USER MODEL INTERAFCE
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

// COMMENT INTERAFCE - COURSE MODEL
export interface IQuestion extends Document {
  user: IUser;
  question: string;
  questionReplies: IQuestion[];
}

// REVIEW INTERAFCE - COURSE MODEL
export interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IQuestion[];
}

// LINK INTERAFCE - COURSE MODEL
export interface ILink extends Document {
  title: string;
  url: string;
}

// COURSE DATA INTERAFCE - COURSE MODEL
export interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IQuestion[];
}

// COURSE MODEL INTERAFCE
export interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}
