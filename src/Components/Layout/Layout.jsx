import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectUser, setCredentials } from "../../store/authSlice";

const InitialLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokens = localStorage.getItem("jwt");
    if (tokens) {
      dispatch(setCredentials({ token: tokens }));
    }
  }, []);
  return <Outlet />;
};

export default InitialLayout;
