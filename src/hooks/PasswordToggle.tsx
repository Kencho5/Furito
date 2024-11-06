import { LuEye, LuEyeOff } from "react-icons/lu";

const PasswordToggle = ({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) => (
  <div className="absolute inset-y-0 right-4 flex cursor-pointer items-center">
    {show ? (
      <LuEyeOff size={18} color="#888888" onClick={onToggle} />
    ) : (
      <LuEye size={18} color="#888888" onClick={onToggle} />
    )}
  </div>
);

export default PasswordToggle;
