import { useEffect, useRef } from "react";

interface OutsideClickHandlerProps {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

const OutsideClickHandler = ({
  onOutsideClick,
  children,
}: OutsideClickHandlerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

export default OutsideClickHandler;
