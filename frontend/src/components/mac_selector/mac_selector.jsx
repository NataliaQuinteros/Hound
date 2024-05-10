import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";


function MacSelector(){
    const [macInfo, setMacInfo] = useState(null);
    const [currentNetworkScanId, setCurrentNetworkScanId] = useState(0);

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
        const fetchLastSignals = async () => {
          try{
            // const response = await fetch('http://localhost:8000/networks/get_last_id/');
            const response = await fetch(`https://10.42.0.1/api/stations/get_by_network_id/${currentNetworkScanId}`);
    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const responseData = await response.json();
          // console.log('response', response);
          setMacInfo(responseData);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    
        };
    
        fetchLastSignals();
        
    }, []);

    const MakeMACTable = ({jsonMacs}) => {
        
        return(
            <tbody>
            {jsonMacs.map(row => (
            <tr onClick={() => handleSelect(row.STATION)} key={row.id}>
                <td>{row.STATION}</td>
                <td>{row.PWR}</td>
            </tr>
            ))}
            </tbody>
            
        );
    }

    const handleSelect = (station) => {
        console.log(station)
    }


    const testingJSON = [
        {id:1, STATION: 'aa:aa:aa:aa:aa', 
        PWR: -20}, 
        {id:2, STATION: 'aa:bb:ab:aa:aa', 
        'PWR': -30},
    ];
    
    return(
        <table>
        <th>
            MacAdrss
        </th>
        <th>
            PWR
        </th>

        <>
        <MakeMACTable jsonMacs= {testingJSON}/>
        </>
        
    
        </table>

    );

};

export default MacSelector