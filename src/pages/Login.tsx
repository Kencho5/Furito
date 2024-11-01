import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/inputs/Input";
import { AuthForm } from "../components/auth/AuthForm";
import { useMutation } from "react-query";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { LuEye, LuEyeOff } from "react-icons/lu";
import { TiWarningOutline } from "react-icons/ti";

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
  const { t } = useTranslation();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation(loginRequest, {
    onSuccess: async (token) => {
      await login(token);
      setErrorMessage(false);
    },
    onError: () => {
      setErrorMessage(true);
    },
    onSettled: () => {},
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <AuthForm title={t("LOGIN.auth")} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder={t("LOGIN.email")}
        {...register("email", { required: "This field is required" })}
        error={!!errors.email}
      />

      <div className="relative">
        <Input
          placeholder={t("LOGIN.password")}
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

      {errorMessage && (
        <div className="flex items-center gap-2">
          <TiWarningOutline size={24} color="#fd590d" />

          <span className="font-normal text-orange-500">
            {t("LOGIN.error")}
          </span>
        </div>
      )}

      <Link
        to="/auth/reset-password"
        className="text-right text-sm text-neutral-900"
      >
        {t("LOGIN.reset_password")}
      </Link>

      <button
        type="submit"
        className="rounded-2xl bg-yellow-400 px-5 py-2.5 text-base font-semibold text-neutral-900"
      >
        {t("LOGIN.submit")}
      </button>

      <Link
        to="/auth/register"
        className="text-center text-sm font-normal text-neutral-400"
      >
        {t("LOGIN.no_account")}{" "}
        <span className="text-orange-500">{t("LOGIN.register")}</span>
      </Link>
    </AuthForm>
  );
};

export default Login;
