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

// COMMENT INTERAFCE - [ COURSE MODEL 0.1 ]
export interface IQuestion extends Document {
  user: IUser;
  question: string;
  questionReplies: IQuestion[];
}

// REVIEW INTERAFCE - [ COURSE MODEL 0.2 ]
export interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IQuestion[];
}

// LINK INTERAFCE - [ COURSE MODEL 0.3 ]
export interface ILink extends Document {
  title: string;
  url: string;
}

// COURSE DATA INTERAFCE - [ COURSE MODEL 0.4 ]
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

// ORDER MODEL INTERAFCE
export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

// NOTIFICATION MODEL INTERAFCE
export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}
