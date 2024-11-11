import { useTranslation } from "react-i18next";
import { IRegisterProps } from "../../auth/AuthTypes";
import { Input } from "../../components/inputs/Input";
import { GetCode } from "./GetCode";

export const CompanyForm = ({ register, errors }: IRegisterProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder={t("AUTH.company_code")}
          {...register("company_code", { required: true })}
          error={!!errors.company_code}
          className="w-full sm:w-1/2"
        />
        <Input
          placeholder={t("AUTH.company_name")}
          {...register("company_name", { required: true })}
          error={!!errors.company_name}
          className="w-full sm:w-1/2"
        />
      </div>

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
