import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth);

  return (
    <div className="w-full flex flex-row justify-end items-center mb-10 md:my-10 pr-6 md:pr-16 lg:pr-24 xl:pr-36 space-x-12">
      <p className="bg-white rounded-xl py-2 px-4 ">
        Welcome {user.user.firstName}
      </p>

      <Link to="/profile">
        <img src={user.user.avatar} alt="avatar" className="h-8 rounded-3xl" />
      </Link>
    </div>
  );
};

export default Header;
