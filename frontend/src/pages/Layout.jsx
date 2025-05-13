import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mt-6 mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
