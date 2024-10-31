import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/inputs/Input";
import { AuthForm } from "../components/auth/AuthForm";
import { useMutation } from "react-query";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

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

      <div className="relative">
        <Input
          label="პაროლი"
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "This field is required" })}
          error={!!errors.password}
        />

        <div>
          <LuEye
            size={18}
            className={`absolute right-4 top-1/2 ${showPassword && "hidden"} translate-y-1/2 cursor-pointer`}
            color="#888888"
            onClick={() => setShowPassword(true)}
          />
          <LuEyeOff
            size={18}
            className={`absolute right-4 top-1/2 ${!showPassword && "hidden"} translate-y-1/2 cursor-pointer`}
            color="#888888"
            onClick={() => setShowPassword(false)}
          />
        </div>
      </div>

      <Link
        to="/auth/forgot-password"
        className="text-right text-sm text-orange-500"
      >
        დაგავიწყდა პაროლი?
      </Link>

      {Object.keys(errors).length > 0 && (
        <span>{errors.email?.message || errors.password?.message}</span>
      )}
      {errorMessage && <span>{errorMessage}</span>}

      <button
        type="submit"
        className="rounded-2xl bg-yellow-400 px-5 py-2.5 text-base font-bold"
      >
        შესვლა
      </button>

      <Link to="/auth/register" className="text-center text-sm font-normal">
        არ გაქვს ანგარიში?{" "}
        <span className="font-semibold text-orange-500">რეგისტრაცია</span>
      </Link>
    </AuthForm>
  );
};

export default Login;
