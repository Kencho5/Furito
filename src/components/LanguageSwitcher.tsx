import { useTranslation } from "react-i18next";
import { useState } from "react";
import OutsideClickHandler from "../utils/OutsideClick";

import { IoIosArrowDown } from "react-icons/io";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [lang, setLang] = useState(
    localStorage.getItem("language") || i18n.language,
  );

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative inline-block text-left font-normal">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-0.5"
        >
          {lang === "en" ? "Eng" : "ქარ"}
          <IoIosArrowDown size={20} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-6 w-36 origin-top-right rounded-xl bg-white shadow-md">
            <div className="p-2 font-normal">
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full rounded-lg px-4 py-2 text-left transition hover:bg-neutral-100"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("ge")}
                className="block w-full rounded-lg px-4 py-2 text-left transition hover:bg-neutral-100"
              >
                ქართული
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default LanguageSwitcher;
