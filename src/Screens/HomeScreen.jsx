import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/authApiSlice";
import { setCredentials } from "../store/authSlice";
import Loading from "../Components/Loading/Loading";
const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      const { token } = data.body;
      console.log(token);
      dispatch(setCredentials({ token }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return <Loading />; // TODO change to Loader Spinner
  }

  function toRegister() {
    navigate("/register");
  }
  return (
    <div className="my-64">
      <form
        className="flex flex-col md:w-1/2 lg:w-1/3 space-y-6 rounded-lg p-5 mx-auto border-2 mb-8"
        onSubmit={handleLogin}
      >
        <div className="p-5">
          <h2 className="text-center text-xl md:text-4xl">Login</h2>
        </div>
        <label htmlFor="username">Email: </label>
        <input
          className="border rounded-lg p-1 outline-none"
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="pt-4" htmlFor="password">
          Password:
        </label>
        <input
          className=" border rounded-lg p-1 outline-none"
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between pt-4">
          <button className="py-2 px-6 border-2 rounded-xl border-white">
            Login
          </button>
          <Link className="py-2 px-6 border-2 rounded-xl border-white" to='/register'>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default HomeScreen;
