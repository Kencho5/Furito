import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

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
  service_category: string;
}

export interface IRegisterProps {
  register: UseFormRegister<IRegisterInputs>;
  errors: FieldErrors<IRegisterInputs>;
  setValue?: UseFormSetValue<IRegisterInputs>;
}
