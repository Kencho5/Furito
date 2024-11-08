import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface ILoginInputs {
  email: string;
  password: string;
}

export interface IRegisterInputs {
  name: string;
  email: string;
  companyCode: string;
  companyName: string;
  registrationType: string;
  phone: string;
  phoneCode: string;
  password: string;
  terms: boolean;
}

export interface IRegisterProps {
  register: UseFormRegister<IRegisterInputs>;
  errors: FieldErrors<IRegisterInputs>;
}
