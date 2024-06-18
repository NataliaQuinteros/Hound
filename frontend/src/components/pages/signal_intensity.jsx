import React, { useEffect, useState } from "react";
import Intensity from "../visual/intensity";
import ColorBar from "../visual/colorscale";
import ReactSpeedometer from "react-d3-speedometer"
import StopSecondScan from "./stop_second_scan";
function SignalIntensity(){

    //MOCK DATAAAAAA
    const [pwr, setPwr] = useState(0);
    const [maxValue, setMaxValue] = useState(0);


    function getRandomNumber() {
      return Math.floor(Math.random() * -100) + 1;
    }
  
    useEffect(() => {
      const interval = setInterval(() => {
        // Update the value every 3 seconds
        setPwr(getRandomNumber());
      }, 5000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, []); // Run the effect only once when the component mounts

    // MOCK DATAAA


    return(
    <>
        <h2>Intensidad de señal: {pwr} </h2>
        <h3>Mac: 7C:F6:66:0E:4F:D9</h3>
        <h3>Vendor: Tuya Smart Inc.</h3>
        <ReactSpeedometer
        maxValue={0}
        minValue= {-110}
        value={pwr}
        needleColor="black"
        startColor="red"
        segments={10}
        endColor="green"
        />

        <StopSecondScan/>
    
    </>

    )
}   

export default SignalIntensity