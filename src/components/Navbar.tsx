import { Link } from "react-router-dom";
//import { useAuth } from "../auth/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

import { FaCirclePlus } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  //const { loggedIn, logout } = useAuth();
  //
  //const handleLogout = async () => {
  //  await logout();
  //};
  const { t } = useTranslation();

  return (
    <nav className="flex h-20 items-center border-b border-neutral-200 bg-neutral-100">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="">
          <img src="/logo.svg" alt="Logo" width={135} height={30} />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="upload"
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-orange-500 bg-white px-3 py-2.5 text-sm font-bold text-orange-500"
          >
            <FaCirclePlus size={20} />
            {t("NAV.upload")}
          </Link>
          <div className="h-6 w-px bg-neutral-300"></div>
          <button>
            <GoHeart color="#888888" size={22} strokeWidth={1} />
          </button>
          <button>
            <FiShoppingCart color="#888888" size={22} strokeWidth={2.5} />
          </button>
          <button>
            <CgProfile color="#888888" size={22} strokeWidth={0.5} />
          </button>

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
