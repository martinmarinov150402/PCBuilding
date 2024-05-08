import React from 'react';
import './MainPage.css';
import NavBar from './components/NavBar';
import { ConfigurationDesc } from './components/ConfigurationDesc';
import { LoginModal } from './components/LoginModal';

function MainPage() {
  return (
    <>
      <NavBar></NavBar>
      <ConfigurationDesc></ConfigurationDesc>
      <LoginModal></LoginModal>
    </>
  );
}

export default MainPage;
