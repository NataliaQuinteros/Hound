import React, { useState } from "react";
import styled from "styled-components";

const Circle = styled.div`
    height: 50px;
    width: 50px;
    background-color: ${props => props.color};
    border-radius: 50%;
`;

const Intensity =  (bgcolor) => {

    return(
    <>
        <Circle color={bgcolor}/>
    </>)
}

export default Intensity;