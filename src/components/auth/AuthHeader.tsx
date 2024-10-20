import LanguageSelector from "../navbar/LanguageSelector";
import { Link } from "react-router-dom";

function AuthHeader() {
  return (
    <div className="flex w-full max-w-[550px] items-center justify-between">
      <Link to="/">
        <img
          src="/Logo.svg"
          alt="Logo"
          className="h-[31px] w-[135px] sm:h-[35px] sm:w-[154px]"
        />
      </Link>

      <LanguageSelector />
    </div>
  );
}

export default AuthHeader;
