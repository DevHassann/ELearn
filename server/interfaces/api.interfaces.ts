// USER REGISTER INTERFACE [ USER ]
export interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// ACTIVATE USER INTERFACE [ USER ]
export interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

// LOGIN USER INTERFACE [ USER ]
export interface ILoginRequest {
  email: string;
  password: string;
}

// SOCCIAL AUTHENTICATION INTERFACE [ USER ]
export interface ISocialAuthBody {
  name: string;
  email: string;
  avatar: string;
}

// UPDATE INFORMATION INTERFACE [ USER ]
export interface IUpdateUserInfo {
  name: string;
  email: string;
}

// UPDATE PASSWORD INTERFACE [ USER ]
export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

// UPDATE PROFILE PICTURE INTERFACE [ USER ]
export interface IUpdateProfilePicture {
  avatar: string;
}

// ADD QUESTION INTERFACE [ COURSE ]
export interface IQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

// ADD ANSWER INTERFACE [ COURSE ]
export interface IAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

// ADD REVIEW INTERFACE [ COURSE ]
export interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

// ADD REPLY TO REVIEW [ COURSE ]
export interface IAddReplyReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
