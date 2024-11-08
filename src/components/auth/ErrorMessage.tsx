import { TiWarningOutline } from "react-icons/ti";

export const ErrorMessage = ({ message }: { message: string | null }) => (
  <div className="flex items-center gap-2 text-sm sm:text-base">
    <TiWarningOutline size={24} color="#fd590d" />
    <span className="text-orange-500">{message}</span>
  </div>
);
