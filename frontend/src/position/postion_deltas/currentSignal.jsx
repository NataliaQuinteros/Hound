import React, { useState, useEffect } from 'react';
import styled from "styled-components";


// returns the power of the last scan, given a macAddrs
function CurrentSignal(macAddrs){
    const [currentSignal, setCurrentSignal] = useState(null);

    useEffect(() => {
        const fetchCurrentSignal= async () => {
          try{
            const response = await fetch('https://10.42.0.1/api/signals/get_current_signal/');
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const responseData = await response.json();
          setCurrentSignal(responseData);
          // console.log('response', response);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          
        };
    
        fetchCurrentSignal();
        
    }, []);
    
    function getSignalIntensity(element, jsonList){
        if(jsonList != ''){
            for (var i = 0 ; i< json.length ; i++){
                if (jsonList[i].station == element){
                    return jsonList[i].pwr;
                }
                else{
                    return null
                }
            }
        }
    }

    getSignalIntensity(macAddrs, currentSignal);


}

export default CurrentSignal