import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="md:h-screen ">
      <div className=" md:flex md:h-full md:mb-24 mb-auto">
        <Navbar />

        <div className="flex flex-col w-full">
          <Header />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
