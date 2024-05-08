import React from 'react';
import './MainPage.css';
import NavBar from './components/NavBar';
import { ConfigurationDesc } from './components/ConfigurationDesc';

function MainPage() {
  return (
    <>
      <NavBar></NavBar>
      <ConfigurationDesc></ConfigurationDesc>
    </>
  );
}

export default MainPage;
