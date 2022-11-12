import React from "react";
import { FaBalanceScale, FaMoneyBill } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { GiPayMoney } from "react-icons/gi";
import { AiOutlineTransaction } from "react-icons/ai";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { NavLink } from "../../utils/NavLink";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const NavDesktop = ({ icon, name, path, active }) => {
  return (
    <NavLink to={path} activeClassName={active}>
      <div className="flex items-center pl-6">
        {icon}
        <span className="pl-6 font-bold">{name}</span>
      </div>
    </NavLink>
  );
};

export const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  let active = "bg-gray-900 text-white pl-16 easy-in duration-300";
  const NavDesktopLinks = [
    { icon: <AiOutlineTransaction />, name: "Transactions", path: "/" },
    { icon: <FaMoneyBill />, name: "Deposit", path: "/deposit" },
    { icon: <GiPayMoney />, name: "Pay", path: "/pay" },
    { icon: <FaBalanceScale />, name: "Balance", path: "/balance" },
    { icon: <FiSend />, name: "Send Money", path: "/send" },
  ];

  return (
    <>
      <div className="m-3 md:hidden">
        <Hamburger isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
      </div>
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-3 text-white fixed w-[200px] h-[250px] left-[50%] top-[5%] ml-[-100px] bg-gray-900 rounded-xl"
        >
          <Link onClick={() => setSidebarOpen(false)} to="/transactions">
            Transactions
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/deposit">
            Deposit
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/pay">
            Pay
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/balance">
            Balance
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/send">
            Send Money
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/transactions">
            Profile
          </Link>
          <Link onClick={() => setSidebarOpen(false)} to="/transactions">
            Logout
          </Link>
        </motion.div>
      )}

      <div className="hidden md:flex flex-col w-80 bg-white h-full rounded-r-3xl">
        <div className="m-8 mx-12">
          <h1 className="text-3xl">Alkemy</h1>
          <h1 className="text-3xl text-right">Wallet</h1>
        </div>

        <div className="mt-8 flex flex-col flex-1">
          {NavDesktopLinks.map((link, i) => (
            <NavDesktop
              key={i}
              icon={link.icon}
              name={link.name}
              path={link.path}
              active={active}
            />
          ))}
        </div>
        <hr className="my-4 mx-10 h-[2px] bg-gray-900 " />
        <div className="flex flex-col mb-12">
          <NavLink to="/profile" activeClassName={active}>
            <div className="flex items-center pl-6">
              <CgProfile />
              <span className="pl-6 font-bold">Profile</span>
            </div>
          </NavLink>
          <button
            onClick={onLogout}
            className="py-3 pl-6 bg-gray-900 text-white"
          >
            <div className="flex items-center pl-6">
              <CgLogOut />
              <span className="pl-6 font-bold">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
