import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import OutsideClickHandler from "../utils/OutsideClick";
import { useIpData } from "../utils/Location";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useIpData();

  const [lang, setLang] = useState(
    language || localStorage.getItem("language") || i18n.language,
  );

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      setLang(language);
    }
  }, [language, i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none"
        >
          {lang === "en" ? "English" : "Georgian"}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("ge")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Georgian
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default LanguageSwitcher;
