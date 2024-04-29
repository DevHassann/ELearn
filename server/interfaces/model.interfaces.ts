import { Document } from "mongoose";

// USER MODEL INTERAFCE
interface IUser extends Document {
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
interface IComment extends Document {
  user: object;
  comment: string;
  commentReplies?: IComment[];
}

// REVIEW INTERAFCE - COURSE MODEL
interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

// LINK INTERAFCE - COURSE MODEL
interface ILink extends Document {
  title: string;
  url: string;
}

// COURSE DATA INTERAFCE - COURSE MODEL
interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

// COURSE MODEL INTERAFCE
interface ICourse extends Document {
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

export { IUser, IComment, IReview, ILink, ICourseData, ICourse };
