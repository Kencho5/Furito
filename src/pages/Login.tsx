import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "../components/auth/ErrorMessage";

import { Input } from "../components/inputs/Input";
import { AuthForm } from "../components/auth/AuthForm";
import { useAuth } from "../auth/AuthContext";
import { Spinner } from "../components/ui/Spinner";
import PasswordToggle from "../hooks/PasswordToggle";
import { ILoginInputs } from "../auth/AuthTypes";

const API_URL = import.meta.env.VITE_API_URL;

const loginRequest = async ({ email, password }: ILoginInputs) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData.error;
  }

  return responseData.token;
};

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>();

  const { mutate } = useMutation(loginRequest, {
    onSuccess: async (token) => {
      setLoading(false);

      const loggedIn = await login(token);
      setErrorMessage(null);
      if (loggedIn) navigate("/profile");
    },
    onError: (error: string) => {
      setErrorMessage(error);
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    setLoading(true);
    mutate(data);
  };

  return (
    <AuthForm title={t("AUTH.login")} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder={t("AUTH.email")}
        type="email"
        {...register("email", { required: true })}
        error={!!errors.email}
      />

      <div className="relative">
        <Input
          placeholder={t("AUTH.password")}
          type={showPassword ? "text" : "password"}
          {...register("password", { required: true })}
          error={!!errors.password}
        />
        <PasswordToggle
          show={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </div>

      {errorMessage && <ErrorMessage message={t(errorMessage)} />}

      <Link
        to="/auth/reset-password"
        className="text-right text-sm text-neutral-900"
      >
        {t("AUTH.reset_password")}
      </Link>

      <button
        type="submit"
        className={`rounded-2xl bg-yellow-400 px-5 py-2.5 text-base font-semibold text-neutral-900 ${loading && "animate-pulse"} flex max-h-[44px] items-center justify-center`}
      >
        {!loading ? (
          t("AUTH.submit")
        ) : (
          <Spinner
            fillColor="fill-orange-500"
            textColor="text-white"
            size={30}
          />
        )}
      </button>

      <Link
        to="/auth/register"
        className="text-center text-sm font-normal text-neutral-400"
      >
        {t("AUTH.no_account")}{" "}
        <span className="text-orange-500">{t("AUTH.register")}</span>
      </Link>
    </AuthForm>
  );
};

export default Login;
