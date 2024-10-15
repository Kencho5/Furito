import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

import { FaCirclePlus } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { loggedIn } = useAuth();
  //const handleLogout = async () => {
  //  await logout();
  //};

  const { t } = useTranslation();

  return (
    <nav className="flex h-[72px] items-center border-b border-neutral-200 bg-neutral-100 sm:h-20">
      <div className="container mx-auto flex items-center justify-between px-6 sm:px-4 lg:px-0">
        <Link to="">
          <img
            src="/logo.svg"
            alt="Logo"
            width={135}
            height={31}
            className="hidden sm:block"
          />
          <img
            src="/logo_min.svg"
            alt="Logo"
            width={45}
            height={31}
            className="min-w-[45px] sm:hidden"
            loading="lazy"
          />
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="upload"
            className="hidden items-center justify-center gap-2 rounded-2xl border-2 border-orange-500 bg-white px-3 py-2.5 text-sm font-bold text-orange-500 sm:flex"
          >
            <FaCirclePlus size={20} />
            {t("NAV.upload")}
          </Link>
          <div className="hidden h-6 w-px bg-neutral-300 sm:flex"></div>

          {loggedIn ? (
            <>
              <button>
                <GoHeart color="#888888" size={22} strokeWidth={1} />
              </button>
              <button>
                <FiShoppingCart color="#888888" size={22} strokeWidth={2.5} />
              </button>
              <button>
                <CgProfile color="#888888" size={22} strokeWidth={0.5} />
              </button>
            </>
          ) : (
            <Link
              to="login"
              className="flex h-10 items-center justify-center rounded-2xl bg-yellow-400 px-3.5 py-2.5 text-sm font-semibold sm:h-11 sm:px-5 sm:py-2.5"
            >
              {t("NAV.login")}
            </Link>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
