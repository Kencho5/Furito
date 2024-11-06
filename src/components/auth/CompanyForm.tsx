import { useTranslation } from "react-i18next";
import { IRegisterProps } from "../../auth/AuthTypes";
import { Input } from "../../components/inputs/Input";

export const CompanyForm = ({ register, errors }: IRegisterProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        placeholder={t("AUTH.email")}
        {...register("email", { required: true })}
        error={!!errors.email}
      />
    </>
  );
};
