import { useState } from "react";
import { useTranslation } from "react-i18next";
import OutsideClickHandler from "../../hooks/OutsideClick";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import UserPaw from "../../assets/icons/UserPaw.svg";
import UserMenuProfile from "../../assets/icons/UserMenuProfile.svg";
import UserMenuPic from "../../assets/icons/UserMenuPic.svg";
import UserMenuSuitcase from "../../assets/icons/UserMenuSuitcase.svg";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const { t } = useTranslation();

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <button
        className="flex h-6 items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CgProfile color="#888888" size={22} strokeWidth={0.5} />
      </button>

      {isOpen && (
        <div className="absolute right-10 z-10 mt-10 w-[300px] origin-top-right rounded-2xl bg-white shadow-md sm:right-28">
          <div className="flex items-center gap-3 p-4">
            <img src={UserPaw} width={48} height={48} />

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg">გიორგი კენჭაძე</h1>
              <p className="truncate text-sm font-normal text-neutral-500">
                giokenchadze@gmail.com
              </p>
            </div>
          </div>

          <div className="h-px bg-neutral-200"></div>

          <div
            className="text-sm font-semibold"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link
              to="profile"
              className="flex items-center gap-3.5 p-4 transition hover:bg-neutral-50"
            >
              <img src={UserMenuProfile} width={20} height={20} />
              {t("NAV.MENU.profile")}
            </Link>
            <Link
              to="profile"
              className="flex items-center gap-3.5 p-4 transition hover:bg-neutral-50"
            >
              <img src={UserMenuPic} width={20} height={20} />
              {t("NAV.MENU.posts")}
            </Link>
            <Link
              to="profile"
              className="flex items-center gap-3.5 p-4 transition hover:bg-neutral-50"
            >
              <img src={UserMenuSuitcase} width={20} height={20} />
              {t("NAV.MENU.services")}
            </Link>
          </div>

          <div className="h-px bg-neutral-200"></div>

          <button
            className="flex w-full items-center gap-3.5 rounded-b-2xl p-4 text-sm transition hover:bg-neutral-50"
            onClick={handleLogout}
          >
            <FiLogOut size={20} />
            {t("NAV.MENU.logout")}
          </button>
        </div>
      )}
    </OutsideClickHandler>
  );
}

export default UserMenu;
