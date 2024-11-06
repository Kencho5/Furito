import { useTranslation } from "react-i18next";
import { IRegisterProps } from "../../auth/AuthTypes";
import { Input } from "../../components/inputs/Input";
import { GetCode } from "./GetCode";

export const UserForm = ({ register, errors }: IRegisterProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        placeholder={t("AUTH.name")}
        {...register("name", { required: true })}
        error={!!errors.name}
      />

      <div className="relative">
        <Input
          placeholder={t("AUTH.email")}
          type="email"
          {...register("email", { required: true })}
          error={!!errors.email}
        />

        <GetCode />
      </div>
    </>
  );
};
