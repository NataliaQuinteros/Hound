import React, { useState, useEffect } from 'react';
import Spinner from '../visual/spinner';
import Accelerometer from '../../position/acceleration/accelerometer';
import styled from "styled-components";

const Text = styled.h3`
  font-family: Helvetica;
  text-align: center;
  color: #8e59a8;
`;

const Load = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false); 
      }, 20000); 
    }, []);
  
    return (
      <div>
        {isLoading ? (
        <>
        <Text> Por favor espere... </Text>
        <Spinner/>
        </>
        

        ) : (
        <>
          <Text> Muevase por la habitación... </Text>
          <Accelerometer/>
        </>

        )}
      </div>
    );
  };
  
  export default Load;