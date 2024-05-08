import React, { useState } from 'react';
import './MainPage.css';
import NavBar from './components/NavBar';
import { ConfigurationDesc } from './components/ConfigurationDesc';
import { LoginModal } from './components/LoginModal';
import { ConfigurationPage } from './ConfigurationPage';

function MainPage() {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  return (
    <>
      <NavBar onLoginClick={() => setLoginModalVisible(true)}></NavBar>
      <LoginModal visible = {loginModalVisible} onCloseClick={() => setLoginModalVisible(false)}></LoginModal>
    </>
  );
}

export default MainPage;
