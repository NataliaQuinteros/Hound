import React, { useState, useEffect } from 'react';
import Arrow from '../components/arrow';
import CurrentSignal from './currentSignal';
import styled from "styled-components";



var state = {
    INIT: 0,
    ADVANCE: 1,
    GO_BACK_NO_SIGNAL: 2,
    GO_BACK_SIGNAL: 3,
    TURN: 4
};

function Step(lastPwr){
    const [currentSignal, setCurrentSignal] = useState(null);
    const [currentState, setCurrentState] = useState(state.INIT);
    const [counterSumidero, setCounterSumidero] = useState(0);

    setCurrentSignal(CurrentSignal);

    // 1st step:
    // signal is found -> advance in the direction of the acceleration
    if (currentSignal != null && currentState == 0 ){
        setCurrentState(state.ADVANCE);
    }
    // 2nd step: signal dissapears -> go back 1 meter
    if (currentSignal == null && currentState == 1) {
        setCurrentState(state.GO_BACK_NO_SIGNAL);
    }
    //  2.1 signal is found -> advance 1 meter in the same direction
    if (currentSignal != null && currentState == 2){
        setCurrentState(state.ADVANCE);
    }
    //  2.2 signal is not found -> repeat 1.2 step. if this repeated more than 3 times -> go back to step zero
    if (currentSignal == null && currentState == 2){
        if (counterSumidero > 3){
            setCurrentState(state.INIT);
        }
        setCounterSumidero(counterSumidero + 1);
    }

    // 3rd step: signal diminishes -> go back 1 meter and turn to the right 1 meter. 
    if (currentSignal < lastPwr && currentState == 1){
        setCurrentState(state.TURN);
    }
    //  3.2 signal diminishes -> go back 1 meter
    if (currentSignal < lastPwr && currentSignal == 4){
        setCurrentState(state.GO_BACK_SIGNAL);
    }
    
    // 4th step: signal intensifies -> advance 1 meter
    if (currentSignal > lastPwr ){
        setCurrentState(state.ADVANCE);
    }
}
 
export default Step;