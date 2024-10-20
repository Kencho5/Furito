import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/inputs/Input";
import { AuthForm } from "../components/auth/AuthForm";
import { useMutation } from "react-query";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { AuthSkeleton } from "../components/auth/AuthSkeleton";

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

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <AuthForm
      title="ავტორიზაცია"
      titleSub="შეიყვანე შენი დეტალები"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="ელ. ფოსტა"
        placeholder="example@gmail.com"
        {...register("email", { required: "This field is required" })}
        error={!!errors.email}
      />
      <Input
        label="პაროლი"
        placeholder="••••••••"
        type="password"
        {...register("password", { required: "This field is required" })}
        error={!!errors.password}
      />
      {Object.keys(errors).length > 0 && (
        <span>{errors.email?.message || errors.password?.message}</span>
      )}
      {errorMessage && <span>{errorMessage}</span>}

      <button type="submit">Login</button>
    </AuthForm>
  );
};

export default Login;
