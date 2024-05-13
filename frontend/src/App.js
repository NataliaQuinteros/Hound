import './App.css';
import styled from "styled-components";
import BeginScan from './components/pages/begin_scan';
import SignalIntensity from './components/pages/signal_intensity';
import MacSelector from './components/mac_selector/mac_selector';
import React, { useEffect, useState, useReducer } from "react";
// import Accelerometer from './position/accelerometer';

const Title = styled.h1`
  font-family: Helvetica;
  text-align: center;
  color: white; 
  background-color: #7d4a96;
  margin-top: 0;
  padding: 15px;
`;

const App = () => {




  return (

    <div  className="App">
      <Title>Hound</Title>
      <MacSelector/>
    </div>

  );
}

export default App;
