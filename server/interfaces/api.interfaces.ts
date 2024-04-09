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

export { IRegistrationBody, IActivationRequest };
