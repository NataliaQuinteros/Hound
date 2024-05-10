import React, { useState, useEffect } from 'react';
import Arrow from '../components/visual/arrow';
import Accelerometer from './acceleration/accelerometer';
import styled from "styled-components";

const Text = styled.h3`
  font-family: Helvetica;
  text-align: center;
  color: #8e59a8;
`;

const ShowLocation = () => {
  
    return (
      <div>
        <Arrow />
      </div>
    );
  };
  
  export default ShowLocation;