import { UseFormRegister } from "react-hook-form";

export interface ILoginInputs {
  email: string;
  password: string;
}

export interface IRegisterInputs {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface IRegisterProps {
  register: UseFormRegister<IRegisterInputs>;
  errors: {
    name?: { message?: string };
    phone?: { message?: string };
    email?: { message?: string };
    password?: { message?: string };
  };
}
