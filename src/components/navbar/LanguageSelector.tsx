import { useTranslation } from "react-i18next";
import { useState } from "react";
import OutsideClickHandler from "../../hooks/OutsideClick";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const LANGUAGES = [
  { code: "ge", label: "ქართული", shortLabel: "ქარ" },
  { code: "en", label: "English", shortLabel: "Eng" },
] as const;

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("language") || i18n.language,
  );

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
    localStorage.setItem("language", code);
    setIsOpen(false);
  };

  const getShortLabel = (code: string) => {
    return LANGUAGES.find((lang) => lang.code === code)?.shortLabel;
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative inline-block text-left font-normal">
        <LanguageButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          shortLabel={getShortLabel(selectedLang)}
        />
        {isOpen && (
          <LanguageDropdown
            selectedLang={selectedLang}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </div>
    </OutsideClickHandler>
  );
}

type LanguageButtonProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  shortLabel: string | undefined;
};

function LanguageButton({
  isOpen,
  setIsOpen,
  shortLabel,
}: LanguageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="flex h-10 items-center rounded-2xl border border-neutral-300 p-2.5 text-neutral-400 sm:h-11 sm:px-3 sm:py-2.5"
    >
      <MdOutlineLanguage color="#888888" size={22} className="mr-1.5" />
      <span className="mr-0.5 text-sm font-semibold">{shortLabel}</span>
      <IoIosArrowDown color="#888888" size={20} />
    </button>
  );
}

type LanguageDropdownProps = {
  selectedLang: string;
  onLanguageChange: (code: string) => void;
};

function LanguageDropdown({
  selectedLang,
  onLanguageChange,
}: LanguageDropdownProps) {
  return (
    <div className="absolute right-0 z-10 mt-6 w-72 origin-top-right rounded-2xl bg-white shadow-md">
      <div className="space-y-2.5 p-2.5 font-normal">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => onLanguageChange(code)}
            className={`flex w-full items-center justify-between rounded-lg p-2.5 text-left transition hover:bg-neutral-100 ${
              selectedLang === code ? "bg-neutral-100 font-medium" : ""
            }`}
          >
            {label}
            {selectedLang === code && <FaCheck color="#FD590D" />}
          </button>
        ))}
      </div>
    </div>
  );
}
