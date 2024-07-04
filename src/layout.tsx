import React, { useEffect, useState } from 'react';
import './MainPage.css';
import NavBar from './components/NavBar';
import { LoginModal } from './components/LoginModal';
import { ConfigurationsPage } from './ConfigurationsPage';
import { Outlet, Route, RouterProvider, Routes, useNavigate } from 'react-router';
import { ConfigurationPage } from './ConfigurationPage';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './MainPage';
import { getConfigurations } from './services/httpService';
import { useAsync } from './hooks/use-async';

function Layout() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useAsync(async () => {
    const result = await fetch("http://localhost:3000/api/profile", {
      headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`}
    })
    if(result.status <= 400) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, []) 
  
  return (
    <>
      <main>
      <NavBar isLoggedIn = {isLoggedIn} onLoginClick={() => setLoginModalVisible(true)}></NavBar>
      <Outlet/>
      <LoginModal visible = {loginModalVisible} onCloseClick={() => setLoginModalVisible(false)}></LoginModal>
      </main>
    </>
  );
}

export default Layout;
