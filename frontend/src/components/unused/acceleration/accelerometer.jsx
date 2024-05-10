import React, { useEffect, useState, useReducer } from "react";
import moment from 'moment';
import { toPosition, sum3d, locationMean } from './posCalculation';
import { sendLocationData, setTimeLocations } from '../endpoints';
import styled from "styled-components";

const Text = styled.p`
  font-family: Helvetica;
  text-align: center;
  color: #8e59a8;
`;

const MiniTitle = styled.h3`
  font-family: Helvetica;
  text-align: center;
  color: #603973;
`;



function Accelerometer() {

  // max data load after sending the data 
  const payload = 100;

  const location_data_per_second = 10; //eliminar 90 datos del acelerometro para reducir el payload

  const [isFinished, setIsFinished] = useState(false)
  // scan state: 0 -> finished ; 1 -> on progress
  const [scanState, setScanState] = useState([0]);

  // accelerometer consts
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  // data made to calculate positions, all of them are trouples
  const [currentAcceleration, setCurrentAcceleration] = useState([0,0,0]);
  const [lastAcceleration, setLastAcceleration] = useState([0,0,0]);
  const [accelerationSum, setAccelerationSum] = useState([0,0,0]);
  const [lastPosition, setLastPosition] = useState([0,0,0]);
  const [timeElapsed, setTimeElapsed] = useState(null);

  const [currentPosition, setCurrentPosition] = useState([0,0,0]);

  // regulates the first data of the localization scan
  const [firstTime, setFirstTime] = useState(null);

  const [firstInterval, setFirstInterval] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now()); 
  const [currentNetworkScanId, setCurrentNetworkScanId] = useState(0);
  const [locationData, setLocationData] = useState({
    network_scan_id: '',
    x: '',
    y: '',
    z: ''
  });
  const [locationArray, setLocationArray] = useState([])
  const [counter, setCounter] = useState(0);

  //timedelta


  // gets the network scan id to assign the new location instance to a new network scan. 
  // Gets the data of the last Network scan id and sets the current nw scan
  useEffect(() => {
    const fetchLastNetworkScanId = async () => {
      try{
        // const response = await fetch('http://localhost:8000/networks/get_last_id/');
        const response = await fetch('https://10.42.0.1/api/networks/get_last_id/');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const responseData = await response.json();
      // console.log('response', response);
      setCurrentNetworkScanId(responseData+1);

      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchLastNetworkScanId();
    
  }, []);

  useEffect(() => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setPermissionGranted(true);
            window.addEventListener("devicemotion", handleMotionEvent);
          }
        })
        .catch(console.error);
    } else {
      setPermissionGranted(true);
      window.addEventListener("devicemotion", handleMotionEvent);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  function roundAcc(acc){
    if ((acc !== undefined) ||(acc !== null)){
      return(parseFloat(acc.toFixed(1)));
    }
    else{
      return(0);
    }
  }

  function handleMotionEvent(event) {
    setX(roundAcc(event.acceleration.x));
    setY(roundAcc(event.acceleration.y));
    setZ(roundAcc(event.acceleration.z));
    
    // setFirstInterval(currentTime);
    setCurrentTime(currentTime.now());
    // setTimeElapsed((currentTime - firstInterval)/1000);
  }

  function setPositions(){
    setLastPosition(currentPosition);
    setLastAcceleration(currentAcceleration);
    setCurrentAcceleration([x, y, z]);
    setCurrentPosition(toPosition(currentAcceleration,lastAcceleration,accelerationSum,lastPosition, 0.01));
    setAccelerationSum(sum3d(...accelerationSum, ...lastAcceleration));
    console.log("position", currentPosition);
    setLocationData({
      network_scan_id: currentNetworkScanId,
      x: currentPosition[0],
      y: currentPosition[1],
      z: currentPosition[2], 
      location_started_at: moment(currentTime).format('YYYY-MM-DDTHH:mm:ss')
    });
  }



  function handleLocationChanges(){
    //CAMBIAR MOCK DATA!! (mockX, mockY, mockZ por x,y,z. Borrar generateRandomNumber y todos los set para el calculo de posicion
    // generateRandomNumber();
    setPositions();
    console.log('location_data', locationData);
    const newArr = [...locationArray, locationData];
    setLocationArray(newArr);
    if (counter >= payload || isFinished){
      console.log('loc array', locationArray);
      sendLocationData(locationArray);
      setLocationArray([]);
      setCounter(0);
    }
  }

  useEffect(()=>{
    setTimeLocations(moment(currentTime).format('YYYY-MM-DDTHH:mm:ss'));
  }, [])
  

  useEffect(() => {
    setCounter(counter + 1);
    handleLocationChanges();
    console.log('counter', counter);
  }, [x, y, z]);

  


  function handlePermissionGranted() {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          setPermissionGranted(true);
          window.addEventListener("devicemotion", handleMotionEvent);
        }
      })
      .catch(console.error);
  }
  
  return (
    <>
      {permissionGranted ? (
        <>
          <MiniTitle>Desplazamiento horizontal: </MiniTitle>
          <Text>{currentPosition[0]} [m]</Text>
          <MiniTitle>Desplazamiento Vertical: </MiniTitle>
          <Text>{currentPosition[1]} [m] </Text>

          <MiniTitle>Número de escaneo: </MiniTitle>
          <Text >{currentNetworkScanId}</Text>

        </>
      
      ) : (
        <div className="modal" id="modal">
          <div className="modal-content">
            <h2>Allow access to device motion and orientation</h2>
            <p>
              This app requires access to device motion and orientation to
              function properly.
            </p>
            <button className="btn" onClick={handlePermissionGranted}>
              Grant Permission
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Accelerometer;