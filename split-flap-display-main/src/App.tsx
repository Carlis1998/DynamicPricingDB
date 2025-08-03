import { AdminPage } from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  return isAdmin ? <AdminPage /> : <HomePage />;
}
