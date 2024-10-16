import { useTranslation } from "react-i18next";
import { useState } from "react";
import OutsideClickHandler from "../utils/OutsideClick";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(
    localStorage.getItem("language") || i18n.language,
  );

  const changeLanguage = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang);
    setLang(selectedLang);
    localStorage.setItem("language", selectedLang);
    setIsOpen(false);
  };

  const languages = [
    { code: "ge", label: "ქართული" },
    { code: "en", label: "English" },
  ];

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative z-10 inline-block text-left font-normal">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 items-center rounded-2xl border border-neutral-300 p-2.5 text-neutral-400 sm:h-11 sm:px-3 sm:py-2.5"
        >
          <MdOutlineLanguage color="#888888" size={20} className="mr-1.5" />
          <span className="mr-0.5 text-sm font-semibold">
            {lang === "en" ? "Eng" : "ქარ"}
          </span>
          <IoIosArrowDown color="#888888" size={20} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-6 w-72 origin-top-right rounded-2xl bg-white shadow-md">
            <div className="space-y-2.5 p-2.5 font-normal">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`flex w-full items-center justify-between rounded-lg p-2.5 text-left transition hover:bg-neutral-100 ${
                    lang === code ? "bg-neutral-100 font-medium" : ""
                  }`}
                >
                  {label}
                  {lang === code && <FaCheck color="#FD590D" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default LanguageSwitcher;
