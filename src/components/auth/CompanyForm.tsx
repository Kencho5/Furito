import { useTranslation } from "react-i18next";
import { IRegisterProps } from "../../auth/AuthTypes";
import { Input } from "../../components/inputs/Input";
import { GetCode } from "./GetCode";
import { Combobox } from "../inputs/Combobox";

export const CompanyForm = ({ register, errors, setValue }: IRegisterProps) => {
  const { t } = useTranslation();

  const services = [
    { value: "veterinary", label: t("AUTH.SERVICES.veterinary") },
    { value: "food", label: t("AUTH.SERVICES.food") },
    { value: "training", label: t("AUTH.SERVICES.training") },
    { value: "grooming", label: t("AUTH.SERVICES.grooming") },
  ];

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

      <Combobox
        items={services}
        placeholder={t("AUTH.service_category")}
        searchPlaceholder={t("COMBOBOX.search")}
        notFoundText={t("COMBOBOX.not_found")}
        onSelect={(value) => {
          setValue?.("service_category", value, {
            shouldValidate: true,
          });
        }}
        error={!!errors.service_category}
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
