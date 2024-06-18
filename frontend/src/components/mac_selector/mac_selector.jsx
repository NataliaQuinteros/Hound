import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";

const Table = styled.table`
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

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
          setCurrentNetworkScanId(responseData);
    
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
            const response = await fetch(`https://10.42.0.1/api/stations/get_by_network_id/2`);
    
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


    //testing
    const MakeMACTable = ({jsonMacs}) => {
        console.log(jsonMacs);
        console.log(macInfo);
        if (jsonMacs != null){
          return(
            
            <tbody>
            {jsonMacs.map(row =>
            // if the row pwr is considered high, the mac is displayed.
            row.pwr > -60 ?
            (
            <TableRow onClick={() => handleSelect(row.station)} key={row.id}>
                <TableCell>{row.station}</TableCell>
                <TableCell>{row.pwr}</TableCell>
            </TableRow>
            ): null

          )}
          
            </tbody>
            
          );
        }
        
    }

    const handleSelect = (station) => {
        console.log(station)
    }


    const testingJSON = [
    { "station": "7C:F6:66:0E:4F:D9", "id": 2, "network_scan_id": 2, "pwr": -36 },
    { "station": "24:62:AB:34:B7:2A", "id": 3, "network_scan_id": 2, "pwr": -59 },
    { "station": "BE:D0:C6:AA:9B:1C", "id": 4, "network_scan_id": 2, "pwr": -64 },
    { "station": "D6:4E:A8:FA:3F:73", "id": 5, "network_scan_id": 2, "pwr": -27 }, 
    { "station": "E0:09:BF:3F:54:6F", "id": 6, "network_scan_id": 2, "pwr": -90 },
    { "station": "94:A4:08:47:4D:5E", "id": 7, "network_scan_id": 2, "pwr": -63 },
    { "station": "F8:4F:AD:92:CB:54", "id": 8, "network_scan_id": 2, "pwr": -90 },
    { "station": "CE:94:6E:DF:E4:A6", "id": 9, "network_scan_id": 2, "pwr": -54 }];
    
    return(
        <Table>
        <TableHeader>
            MacAdrss
        </TableHeader>
        <TableHeader>
            PWR
        </TableHeader>

        <>
        <MakeMACTable jsonMacs= {testingJSON}/>
        </>
        
    
        </Table>

    );

};

export default MacSelector