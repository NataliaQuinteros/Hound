import React, { useState } from "react";
import styled from "styled-components";

const Circle = styled.div`
    height: 100px;
    width: 100px;
    background-color: ${props => props.color};
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
`;


  // Calculate color based on data
  const getColor = (data) => {
    // Interpolate color between green and red based on data
    const r = Math.floor(255 * (1 - data / 100));
    const g = Math.floor(255 * (data / 100));
    return `rgb(${r},${g},0)`;
  };



const Intensity =  (props) => {

    return(
    <>
        <Circle color={getColor(props.pwr)}/>
    </>)
}

export default Intensity;