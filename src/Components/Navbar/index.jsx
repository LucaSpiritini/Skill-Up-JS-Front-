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

export const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  let active = "bg-black text-white pl-16 easy-in duration-300";
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
          className="flex flex-col items-center space-y-3 text-white fixed w-[200px] h-[250px] left-[50%] top-[5%] ml-[-100px] bg-black rounded-xl"
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
          <NavLink to="/transactions" activeClassName={active}>
            <div className="flex items-center pl-6">
              <AiOutlineTransaction />
              <span className="pl-6 font-bold">Transactions</span>
            </div>
          </NavLink>
          <NavLink to="/deposit" activeClassName={active}>
            <div className="flex items-center pl-6">
              <FaMoneyBill />
              <span className="pl-6 font-bold">Deposit</span>
            </div>
          </NavLink>
          <NavLink to="/pay" activeClassName={active}>
            <div className="flex items-center pl-6">
              <GiPayMoney />
              <span className="pl-6 font-bold">Pay</span>
            </div>
          </NavLink>

          <NavLink to="/balance" activeClassName={active}>
            <div className="flex items-center pl-6">
              <FaBalanceScale />
              <span className="pl-6 font-bold">Balance</span>
            </div>
          </NavLink>
          <NavLink to="/send" activeClassName={active}>
            <div className="flex items-center pl-6">
              <FiSend />
              <span className="pl-6 font-bold">Send Money</span>
            </div>
          </NavLink>
        </div>
        <hr className="my-4 mx-10 h-[2px] bg-black" />
        <div className="flex flex-col mb-12">
          <NavLink to="/profile" activeClassName={active}>
            <div className="flex items-center pl-6">
              <CgProfile />
              <span className="pl-6 font-bold">Profile</span>
            </div>
          </NavLink>
          <button onClick={onLogout} className="py-3 pl-6 bg-black text-white">
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
