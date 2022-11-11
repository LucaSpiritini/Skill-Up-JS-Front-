import React from "react";

import "./App.css";

import TransactionLayout from "./Components/Layout/TransactionLayout";
import HomeScreen from "./Screens/HomeScreen";
import SecondScreen from "./Screens/SecondScreen";
// import NotFoundScreen from './Screens/404Screen'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionForm from "./Components/Transactions/TransactionsForm";
import RequireAuth from "./Components/RequireAuth";
import Persist from "./Components/Persist";
import Layout from "./Components/Layout/Layout";
// import FormikContainer from "./Components/FormUser/FormikContainer";
import UserRegister from "./Components/FormUser/UserRegister";
import ProfileUser from "./Components/ProfileUser/ProfileUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/login"} element={<HomeScreen />} />
          <Route path={"/register"} element={<UserRegister />} />
          <Route element={<Persist />}>
            <Route element={<RequireAuth />}>
              <Route element={<TransactionLayout />}>
                <Route path="/" element={<TransactionForm />} />
                <Route path={"/profile"} element={<ProfileUser />} />
                <Route path="/deposit" element={<HomeScreen />} />
                <Route path="/pay" element={<HomeScreen />} />
                <Route path="/balance" element={<HomeScreen />} />
                <Route path="/send" element={<HomeScreen />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
