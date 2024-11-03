import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { TiWarningOutline } from "react-icons/ti";

import { Input } from "../components/inputs/Input";
import { AuthForm } from "../components/auth/AuthForm";
import { useAuth } from "../auth/AuthContext";
import { Spinner } from "../components/ui/Spinner";

const API_URL = import.meta.env.VITE_API_URL;

interface IFormInputs {
  email: string;
  password: string;
}

const PasswordToggle = ({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) => (
  <div className="absolute inset-y-0 right-4 flex cursor-pointer items-center">
    {show ? (
      <LuEyeOff size={18} color="#888888" onClick={onToggle} />
    ) : (
      <LuEye size={18} color="#888888" onClick={onToggle} />
    )}
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2">
    <TiWarningOutline size={24} color="#fd590d" />
    <span className="font-normal text-orange-500">{message}</span>
  </div>
);

const loginRequest = async ({ email, password }: IFormInputs) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { mutate } = useMutation(loginRequest, {
    onSuccess: async (token) => {
      setLoading(false);

      const loggedIn = await login(token);
      setErrorMessage(false);
      if (loggedIn) navigate("/profile");
    },
    onError: () => {
      setErrorMessage(true);
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setLoading(true);
    mutate(data);
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
        <PasswordToggle
          show={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </div>

      {errorMessage && <ErrorMessage message={t("LOGIN.error")} />}

      <Link
        to="/auth/reset-password"
        className="text-right text-sm text-neutral-900"
      >
        {t("LOGIN.reset_password")}
      </Link>

      <button
        type="submit"
        className={`rounded-2xl bg-yellow-400 px-5 py-2.5 text-base font-semibold text-neutral-900 ${loading && "animate-pulse"} flex max-h-[44px] items-center justify-center`}
      >
        {!loading ? (
          t("LOGIN.submit")
        ) : (
          <Spinner fillColor="orange-500" textColor="white" size={30} />
        )}
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
