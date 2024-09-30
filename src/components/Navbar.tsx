import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { loggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <NavLink
                to="/"
                className="text-2xl font-bold tracking-tight text-white"
              >
                <img src="/logo.svg" alt="" width={130} height={36} />
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-6 flex space-x-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-yellow-500 text-stone-900"
                      : "text-gray-300 hover:bg-stone-700 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-stone-700 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-yellow-500 text-stone-900"
                        : "text-gray-300 hover:bg-stone-700 hover:text-white"
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
            <div className="ml-4 flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
