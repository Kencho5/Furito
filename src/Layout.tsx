import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
//import { useNavigation } from "react-router-dom";
//import TopBarProgress from "react-topbar-progress-indicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Layout() {
  //const navigation = useNavigation();
  const { i18n } = useTranslation();
  const language = i18n.language;
  const fontClass = language === "ge" ? "font-geo" : "font-eng";

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className={fontClass}>
          <Navbar />
          {/* navigation.state == "loading" && <TopBarProgress /> */}
          <Outlet />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default Layout;
