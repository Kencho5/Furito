import { useTranslation } from "react-i18next";

export function GetCode() {
  const { t } = useTranslation();

  return (
    <>
      <button
        type="button"
        className="absolute right-1.5 top-1/2 flex h-8 -translate-y-1/2 cursor-pointer items-center rounded-xl bg-neutral-100 px-3 text-sm"
      >
        {t("AUTH.get_code")}
      </button>
    </>
  );
}
