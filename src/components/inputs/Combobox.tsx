import { useState, useMemo, useRef, useEffect } from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import OutsideClickHandler from "../../hooks/OutsideClick";

interface ComboboxItem {
  value: string;
  label: string;
}

interface ComboboxProps {
  items: ComboboxItem[];
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  className?: string;
  onSelect?: (value: string) => void;
}

export function Combobox({
  items,
  placeholder,
  searchPlaceholder,
  notFoundText,
  className,
  onSelect,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, items],
  );

  useEffect(() => {
    if (open && selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue === value ? "" : selectedValue);
    onSelect?.(selectedValue);
    setOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className={`relative ${className}`}>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 px-3 py-2 text-base font-normal"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <LuChevronsUpDown size={18} className="ml-2 opacity-50" />
        </button>

        {open && (
          <div className="absolute z-10 mt-2 w-full rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-300">
              <FiSearch size={18} className="ml-3 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-t-md px-3 py-2 pl-2 outline-none"
              />
              <div className="mr-3 flex-shrink-0">
                {search && (
                  <IoClose
                    size={18}
                    className="cursor-pointer text-neutral-500"
                    onClick={() => setSearch("")}
                  />
                )}
              </div>
            </div>

            <div className="max-h-40 overflow-y-auto p-2 font-normal">
              {filteredItems.length === 0 ? (
                <div className="flex items-center justify-center p-2 text-center">
                  {notFoundText}
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    ref={value === item.value ? selectedRef : null}
                    className={`mx-auto mt-1 flex w-full items-center rounded-md px-2 py-2 text-center transition-colors hover:bg-neutral-100 ${
                      value === item.value ? "bg-neutral-100" : ""
                    }`}
                    onClick={() => handleSelect(item.value)}
                  >
                    <span className="mr-2 h-4 w-4">
                      {value === item.value && <FaCheck />}
                    </span>
                    {item.label}
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
