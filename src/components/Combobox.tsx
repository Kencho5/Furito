import { useState, useMemo, useRef, useEffect } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import OutsideClickHandler from "../utils/OutsideClick";
import { getCountries } from "../utils/countries";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  const { t, i18n } = useTranslation();
  const countries = useMemo(() => getCountries(t, i18n), [t, i18n]);

  const filteredcountries = useMemo(
    () =>
      countries.filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, countries],
  );

  useEffect(() => {
    if (open && selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="relative mb-4 w-[274px]">
        <button
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : t("COMBOBOX.select")}
          <LuChevronsUpDown size={18} className="ml-2 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-10 mt-2 w-full rounded-lg border border-stone-300 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-stone-300">
              <div className="py-2">
                <FiSearch size={18} className="ml-3" />
              </div>
              <input
                autoFocus
                type="text"
                placeholder={t("COMBOBOX.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-t-md px-3 py-2 pl-2 outline-none"
              />
              <div className="py-2">
                <IoClose
                  size={18}
                  color="#78716c"
                  className="mr-3 cursor-pointer"
                  onClick={() => setSearch("")}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto p-2">
              {filteredcountries.length === 0 ? (
                <div className="p-3 text-center">{t("COMBOBOX.not_found")}</div>
              ) : (
                filteredcountries.map((country) => (
                  <button
                    key={country.value}
                    ref={value === country.value ? selectedRef : null}
                    className={`mx-auto flex w-full items-center rounded-md px-2 py-2 text-center transition-colors hover:bg-stone-100 ${value === country.value ? "bg-stone-100" : ""}`}
                    onClick={() => {
                      setValue(value === country.value ? "" : country.value);
                      setOpen(false);
                    }}
                  >
                    {value === country.value && (
                      <FaCheck className="mr-2 h-4 w-4 opacity-100" />
                    )}
                    {value !== country.value && (
                      <span className="mr-2 h-4 w-4 opacity-0" />
                    )}
                    {country.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
