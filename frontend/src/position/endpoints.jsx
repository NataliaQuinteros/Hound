import { useState } from "react";

// Global var
let firstTimeLocations = ""


// usable functions

function setTimeLocations(datetime){
    firstTimeLocations = datetime;
}


////////// Endpoints POST connections ///////////

    

// Sends the location data to the fastapi endpoints
const sendLocationData = async (locationData) => {
    try {
        // fetch uses the RPI's Caddy URL, to avoid problems with the lack of HTTPS
        const response = await fetch('https://10.42.0.1/api/locations/create/', {
        // const response = await fetch('http://localhost:8000/locations/create/', {
        method: "POST",  
        body: JSON.stringify({ 'locations': locationData }),
        headers: {
        "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
        throw new Error('Failed to send data');
        }

        const responseData = await response.json();
        console.log('Response from FastAPI:', responseData);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};


// Sends the instruction to start the scan to the fastapi endpoints
const startScan = async (id) => {
    try {
        // fetch uses the RPI's Caddy URL, to avoid problems with the lack of HTTPS
        
        const response = await fetch('https://10.42.0.1/api/start_signal_scan/0', {
        method: "POST",  
        });
        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const responseData = await response.json();
        console.log('Response from FastAPI:', responseData);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};




// Sends the instruction to stop the scan of fastapi endpoints
const stopScan = async () => {
    try {
        // fetch uses the RPI's Caddy URL, to avoid problems with the lack of HTTPS
        const response = await fetch('https://10.42.0.1/api/stop_signal_scan', {
        method: "POST",  
        });
        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const responseData = await response.json();
        console.log('Response from FastAPI:', responseData);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};


// Sends the nw data to the fastapi endpoints
const sendNetworkData = async () => {
    console.log("time locs", firstTimeLocations)
    try {
        // fetch uses the RPI's Caddy URL, to avoid problems with the lack of HTTPS
        const response = await fetch('https://10.42.0.1/api/networks/create/', {
        // const response = await fetch('http://localhost:8000/locations/create/', {
        method: "POST",  
        body: JSON.stringify({ 'locations': firstTimeLocations }),
        headers: {
        "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
        throw new Error('Failed to send data');
        }

        const responseData = await response.json();
        console.log('Response from FastAPI:', responseData);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

export { sendLocationData, startScan, stopScan, sendNetworkData, setTimeLocations};