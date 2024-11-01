import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/inputs/Input";
import { AuthForm } from "../components/auth/AuthForm";
import { useMutation } from "react-query";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

import { LuEye, LuEyeOff } from "react-icons/lu";

const API_URL = import.meta.env.VITE_API_URL;

interface IFormInputs {
  email: string;
  password: string;
}

const loginRequest = async ({ email, password }: IFormInputs) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  return (await response.json()).token;
};

export const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation(loginRequest, {
    onSuccess: async (token) => {
      await login(token);
      setErrorMessage(null);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
    onSettled: () => {},
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <AuthForm title="ავტორიზაცია" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          placeholder="ელ. ფოსტა"
          {...register("email", { required: "This field is required" })}
          error={!!errors.email}
        />
        {errors.email && (
          <p className="mt-2 text-sm font-normal text-orange-500">
            შეყვანილი ველი არასწორია
          </p>
        )}
      </div>

      <div className="relative">
        <Input
          placeholder="პაროლი"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "This field is required" })}
          error={!!errors.password}
        />

        <div className="absolute inset-y-0 right-4 flex cursor-pointer items-center">
          <LuEye
            size={18}
            className={showPassword ? "hidden" : ""}
            color="#888888"
            onClick={() => setShowPassword(true)}
          />
          <LuEyeOff
            size={18}
            className={!showPassword ? "hidden" : ""}
            color="#888888"
            onClick={() => setShowPassword(false)}
          />
        </div>
      </div>

      <Link
        to="/auth/forgot-password"
        className="text-right text-sm text-neutral-900"
      >
        პაროლის აღდგენა
      </Link>

      {Object.keys(errors).length > 0 && (
        <span>{errors.email?.message || errors.password?.message}</span>
      )}
      {errorMessage && <span>{errorMessage}</span>}

      <button
        type="submit"
        className="rounded-2xl bg-yellow-400 px-5 py-2.5 text-base font-bold text-neutral-900"
      >
        შესვლა
      </button>

      <Link
        to="/auth/register"
        className="text-center text-sm font-normal text-neutral-400"
      >
        არ გაქვს ანგარიში? <span className="text-orange-500">რეგისტრაცია</span>
      </Link>
    </AuthForm>
  );
};

export default Login;
