import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";
import { Combobox } from "../components/Combobox";

export const Home = () => {
  const { loggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-2 rounded-xl bg-neutral-100 p-4">
      <h3 className="mb-4 text-2xl font-bold text-neutral-900">
        {t("HOME.home")}
      </h3>
      <Combobox />

      {loggedIn ? (
        <p className="mb-4 text-lg text-lime-600">Authenticated</p>
      ) : (
        <p className="mb-4 text-lg text-orange-600">Unauthorized</p>
      )}
    </div>
  );
};
