import React from 'react'

import './App.css'

import Layout from './Components/Layout'
import HomeScreen from './Screens/HomeScreen'
import SecondScreen from './Screens/SecondScreen'
// import NotFoundScreen from './Screens/404Screen'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TransactionForm from './Components/Transactions/TransactionsForm'
import CategoryForm from './Components/CategoryForm/CategoryForm'


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path={'/'} element={ <HomeScreen /> } />
          <Route path={'/news'} element={ <SecondScreen /> } />
          <Route exact path={'/transactions'} element={ <TransactionForm /> } />
          <Route exact path={'/category'} element={ <CategoryForm /> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
  
}

export default App
