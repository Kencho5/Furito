import { useTranslation } from "react-i18next";
import { IRegisterProps } from "../../auth/AuthTypes";
import { Input } from "../../components/inputs/Input";
import { GetCode } from "./GetCode";

export const CompanyForm = ({ register, errors }: IRegisterProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder={t("AUTH.company_code")}
          {...register("companyCode", { required: true })}
          error={!!errors.companyCode}
          className="w-1/2"
        />
        <Input
          placeholder={t("AUTH.company_name")}
          {...register("companyName", { required: true })}
          error={!!errors.companyName}
          className="w-1/2"
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
