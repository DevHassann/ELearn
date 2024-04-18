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

export { IRegistrationBody, IActivationRequest, ILoginRequest };
