import React from "react";

import "./App.css";

import TransactionLayout from "./Components/Layout/TransactionLayout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth";
import Persist from "./Components/Persist";
import Layout from "./Components/Layout/Layout";
import { TransactionScreen } from "./Screens/TransactionScreen";
import Admin from './Components/Admin/Admin'
import UserRegister from "./Components/FormUser/UserRegister";
import UserEdit from "./Components/FormUser/UserEdit";
import ProfileUser from "./Components/ProfileUser/ProfileUser";
import TransactionForm from "./Components/Transactions/TransactionsForm";
import { BalanceScreen } from "./Screens/BalanceScreen";
import { LoginScreen } from "./Screens/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/login"} element={<LoginScreen />} />
          <Route path={"/register"} element={<UserRegister />} />
          <Route element={<Persist />}>
            <Route element={<RequireAuth />}>
                <Route path="/admin" element={<Admin/>}/>
              <Route element={<TransactionLayout />}>
                <Route path="/" element={<TransactionScreen />} />
                <Route path="/edit-:id" element={<TransactionForm />} />
                <Route path="/deposit" element={<TransactionForm />} />
                <Route path="/pay" element={<TransactionForm />} />
                <Route path="/balance" element={<BalanceScreen />} />
<<<<<<< HEAD
                <Route path={"/profile"} element={<ProfileUser />} />
=======
                <Route path="/" element={<TransactionForm />} />
                <Route path="/profile" element={<ProfileUser />} />
                <Route path="/edituser" element={<UserEdit />} />
                <Route path="/deposit" element={<HomeScreen />} />
                <Route path="/pay" element={<HomeScreen />} />
>>>>>>> dev
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
