import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Regis from './components/Regis';
import Login from './components/Login';
import Home from './components/Home';
import Edit from './components/Edit';
import CreateOrder from './components/createOrder';
import Orders from './components/Orders';
import Admin from './components/Admin'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {
  const token = Cookies.get('token');
  const RedirectToHome = () => <Navigate to="/home" />;
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/"
            element={token ? <RedirectToHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={token ? <RedirectToHome /> : <Login />}
          />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/regis"
            element={token ? <RedirectToHome /> : <Regis />}
          />
          <Route
            path="/edit"
            element={token ? <Edit /> : <Navigate to="/login" />}
          />
          <Route
            path="/createOrder"
            element={token ? <CreateOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={token ? <Orders /> : <Navigate to="/login" />}
          />
          <Route path='/admin' element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
