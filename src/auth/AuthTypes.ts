import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface ILoginInputs {
  email: string;
  password: string;
}

export interface IRegisterInputs {
  email: string;
  registration_type: string;
  phone: string;
  phone_code: string;
  password: string;

  // OPTIONAL
  name: string;
  company_code: string;
  company_name: string;
  terms: boolean;
}

export interface IRegisterProps {
  register: UseFormRegister<IRegisterInputs>;
  errors: FieldErrors<IRegisterInputs>;
}
