import React from 'react'

import './App.css'

import Layout from './Components/Layout'
import HomeScreen from './Screens/HomeScreen'
import SecondScreen from './Screens/SecondScreen'
// import NotFoundScreen from './Screens/404Screen'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={'/'} element={ <HomeScreen /> } />
          <Route path={'/news'} element={ <SecondScreen /> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
  
}

export default App
