import { TiWarningOutline } from "react-icons/ti";

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2">
    <TiWarningOutline size={24} color="#fd590d" />
    <span className="font-normal text-orange-500">{message}</span>
  </div>
);
