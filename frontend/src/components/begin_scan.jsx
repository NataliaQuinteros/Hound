import React from "react";
import styled from "styled-components";
import Load from "./load";
import Accelerometer from '../position/accelerometer';
import { startScan } from '../position/endpoints';
// import MovementPlot from '../components/movement_graph';
import StopScan from './stop_scan'

const Button = styled.button`
padding: 15px;
margin: auto;
color: #ffffff
background-color: #008CBA;
display: ${props => props.visibility? 'inline': 'none'}
`;



class BeginScan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: false
        };

        this.toggleStopButton = this.toggleStopButton.bind(this);
    }

    toggleStopButton = () =>{
        this.setState(state => ({
            hidden: !state.hidden
        }));
    }

    handleClick = () => {
        this.toggleStopButton()
        startScan();
      };

    render(){
        return(
            <>
                <Button className="btn" onClick={() => {this.handleClick()}} visibility = {!this.state.hidden}>
                Begin Scan
                </Button>
                {(this.state.hidden)? <Load/> : <></>}
                < StopScan hidden = {this.state.hidden} toggleStopButton = {this.toggleStopButton}/>
                
            </>
        );
    }
}


export default BeginScan