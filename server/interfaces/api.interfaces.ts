// USER REGISTER INTERFACE [ USER ]
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// ACTIVATE USER INTERFACE [ USER ]
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

// LOGIN USER INTERFACE [ USER ]
interface ILoginRequest {
  email: string;
  password: string;
}

// SOCCIAL AUTHENTICATION INTERFACE [ USER ]
interface ISocialAuthBody {
  name: string;
  email: string;
  avatar: string;
}

// UPDATE INFORMATION INTERFACE [ USER ]
interface IUpdateUserInfo {
  name: string;
  email: string;
}

// UPDATE PASSWORD INTERFACE [ USER ]
interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

// UPDATE PROFILE PICTURE INTERFACE [ USER ]
interface IUpdateProfilePicture {
  avatar: string;
}

export {
  IRegistrationBody,
  IActivationRequest,
  ILoginRequest,
  ISocialAuthBody,
  IUpdateUserInfo,
  IUpdatePassword,
  IUpdateProfilePicture,
};
