import React, { useEffect, useState, useReducer } from "react";
import moment from 'moment';
import { toPosition, sum3d, locationMean } from './posCalculation';
import { sendLocationData, setTimeLocations } from '../endpoints';
import styled from "styled-components";


function SignalDetector(){
    const [currentPwr, setCurrentPwr] = useState(null);
    const [formerPwr, setFormerPwr] = useState(null);

    return(
        <>
            
        </>
    )

}

export default SignalDetector;