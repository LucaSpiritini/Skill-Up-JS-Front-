import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" md:flex md:h-full">
      <Navbar />

      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
