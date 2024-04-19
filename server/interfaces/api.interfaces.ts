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

// UPDATE USER INFORMATION INTERFACE [ USER ]
interface IUpdateUserInfo {
  name: string;
  email: string;
}

export {
  IRegistrationBody,
  IActivationRequest,
  ILoginRequest,
  ISocialAuthBody,
  IUpdateUserInfo,
};
