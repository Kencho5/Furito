import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import { LocationProvider } from "./utils/Location";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LocationProvider>
            <Navbar />
            <Outlet />
          </LocationProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
