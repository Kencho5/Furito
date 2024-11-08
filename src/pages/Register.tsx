import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "../components/auth/ErrorMessage";

import { AuthForm } from "../components/auth/AuthForm";
import { useAuth } from "../auth/AuthContext";
import { Spinner } from "../components/ui/Spinner";
import { IRegisterInputs } from "../auth/AuthTypes";
import { UserForm } from "../components/auth/UserForm";
import { CompanyForm } from "../components/auth/CompanyForm";
import { Input } from "../components/inputs/Input";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import PasswordToggle from "../hooks/PasswordToggle";
import { phoneCodes } from "../utils/phoneCodes";
import { Combobox } from "../components/inputs/Combobox";
import { GetCode } from "../components/auth/GetCode";

const API_URL = import.meta.env.VITE_API_URL;

const registerRequest = async (data: IRegisterInputs) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw responseData.error;
  }

  return responseData.token;
};

const Register = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    () => localStorage.getItem("authTab") || "user",
  );
  const [selectedPhoneCode, setSelectedPhoneCode] = useState<string>("995");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IRegisterInputs>();

  const tabButtonClass = (isActive: boolean) =>
    `w-1/2 rounded-xl px-3 py-2 text-center ${
      isActive ? "bg-white text-neutral-900 shadow-sm" : ""
    }`;

  const { mutate } = useMutation(registerRequest, {
    onSuccess: async (token) => {
      await login(token);
      setLoading(false);
      setErrorMessage(null);
    },
    onError: (error: string) => {
      setErrorMessage(error);
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IRegisterInputs> = (data) => {
    if (!checked) {
      setErrorMessage(t("AUTH.ERROR.terms_error"));
      return;
    }
    setLoading(true);
    mutate({
      ...data,
      phoneCode: selectedPhoneCode,
      registrationType: activeTab,
    });
  };

  const handleTabChange = (tab: string) => {
    localStorage.setItem("authTab", tab);
    setActiveTab(tab);
    reset();
  };

  const handlePhoneCodeSelect = (value: string) => {
    setSelectedPhoneCode(value);
  };

  const handleTerms = () => {
    setChecked(!checked);
    if (!checked) setErrorMessage(null);
  };

  const password = watch("password") || "";

  return (
    <AuthForm title={t("AUTH.register")} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-12 gap-2 rounded-2xl bg-neutral-50 p-1 text-neutral-500">
        <button
          type="button"
          className={tabButtonClass(activeTab === "user")}
          onClick={() => handleTabChange("user")}
        >
          ფიზიკური პირი
        </button>
        <button
          type="button"
          className={tabButtonClass(activeTab === "company")}
          onClick={() => handleTabChange("company")}
        >
          იურიდიული პირი
        </button>
      </div>

      {activeTab == "user" ? (
        <UserForm register={register} errors={errors} />
      ) : (
        <CompanyForm register={register} errors={errors} />
      )}

      <div className="flex gap-4">
        <Combobox
          items={phoneCodes}
          defaultValue="995"
          placeholder="(+995)"
          searchPlaceholder={t("COMBOBOX.search")}
          notFoundText={t("COMBOBOX.not_found")}
          onSelect={handlePhoneCodeSelect}
          className="min-w-32"
        />

        <div className="flex-grow">
          <div className="relative">
            <Input
              placeholder={t("AUTH.phone")}
              type="number"
              {...register("phone", { required: true })}
              error={!!errors.phone}
            />
            <GetCode />
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <Input
            placeholder={t("AUTH.password")}
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true, minLength: 6 })}
            error={!!errors.password}
          />
          <PasswordToggle
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <FaCircleCheck
            size={18}
            color={
              !password
                ? "#6d6d6d" // gray when undefined or empty
                : password.length < 6
                  ? "#fd590d" // red when length is 1-5
                  : "#74d546" // green when length is 6 or more
            }
          />
          <p className="text-sm font-normal text-neutral-500">
            {t("AUTH.password_requirement")}
          </p>
        </div>
      </div>

      <div className="flex gap-3 text-sm font-normal text-neutral-500">
        {!checked ? (
          <FaRegCircleCheck
            size={18}
            className="cursor-pointer"
            onClick={handleTerms}
          />
        ) : (
          <FaCircleCheck
            size={18}
            className="cursor-pointer"
            color="#74d546"
            onClick={handleTerms}
          />
        )}

        <div>
          {t("AUTH.agree")}{" "}
          <Link to="/rules" className="font-medium text-neutral-900 underline">
            {t("AUTH.terms")}
          </Link>
        </div>
      </div>

      {errorMessage && <ErrorMessage message={t(errorMessage)} />}

      <button
        type="submit"
        className={`rounded-2xl bg-yellow-400 px-5 py-2.5 text-base font-semibold text-neutral-900 ${loading ? "animate-pulse" : ""} flex max-h-[44px] items-center justify-center`}
      >
        {!loading ? (
          t("AUTH.register")
        ) : (
          <Spinner
            fillColor="fill-orange-500"
            textColor="text-white"
            size={30}
          />
        )}
      </button>

      <Link
        to="/auth/login"
        className="text-center text-sm font-normal text-neutral-400"
      >
        {t("AUTH.have_account")}{" "}
        <span className="text-orange-500">{t("AUTH.login")}</span>
      </Link>
    </AuthForm>
  );
};

export default Register;
