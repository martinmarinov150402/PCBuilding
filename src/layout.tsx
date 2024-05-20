import React, { useState } from 'react';
import './MainPage.css';
import NavBar from './components/NavBar';
import { LoginModal } from './components/LoginModal';
import { ConfigurationsPage } from './ConfigurationsPage';
import { Outlet, Route, RouterProvider, Routes, useNavigate } from 'react-router';
import { ConfigurationPage } from './ConfigurationPage';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './MainPage';
import { getConfigurations } from './services/httpService';

function Layout() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const navigate = useNavigate();

  
  return (
    <>
      <main>
      <NavBar onLoginClick={() => setLoginModalVisible(true)}></NavBar>
      <Outlet/>
      <LoginModal visible = {loginModalVisible} onCloseClick={() => setLoginModalVisible(false)}></LoginModal>
      </main>
    </>
  );
}

export default Layout;
