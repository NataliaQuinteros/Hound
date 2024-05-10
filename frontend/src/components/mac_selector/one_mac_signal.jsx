import React, { useEffect, useState } from 'react';
import Intensity from '../visual/intensity';
// get only the macs and their MAX PWR 
function GetWsData(){
    const [socket, setSocket] = useState(null);
    const [receivedData, setReceivedData] = useState('');
    const [receivedDataBuffer, setReceivedDataBuffer] = useState('');
    
    useEffect(() => {

        const ws = new WebSocket('ws://https://10.42.0.1/api/ws/'); 

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            console.log('Received message:', event.data);
            // Update state 
            setReceivedData(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);

        // Cleanup 
        return () => {
            ws.close();
        };
    }, []);

    function pwrHandler(){
        
    }




    return(
    <>
        
    </>
    );
}

export default GetWsData;