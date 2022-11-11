import React from "react";

import "./App.css";

import TransactionLayout from "./Components/Layout/TransactionLayout";
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth";
import Persist from "./Components/Persist";
import Layout from "./Components/Layout/Layout";
import { TransactionScreen } from "./Screens/TransactionScreen";
import UserRegister from "./Components/FormUser/UserRegister";
import ProfileUser from "./Components/ProfileUser/ProfileUser";
import TransactionForm from "./Components/Transactions/TransactionsForm";

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
                <Route path="/" element={<TransactionScreen />} />

                <Route path="/deposit" element={<TransactionForm />} />
                <Route path="/pay" element={<TransactionForm />} />

                <Route path="/" element={<TransactionForm />} />
                <Route path={"/profile"} element={<ProfileUser />} />
                <Route path="/deposit" element={<HomeScreen />} />
                <Route path="/pay" element={<HomeScreen />} />
                <Route path="/balance" element={<HomeScreen />} />
                <Route path="/send" element={<TransactionForm />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
