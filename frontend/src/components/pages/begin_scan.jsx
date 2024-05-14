import React from "react";
import styled from "styled-components";
import Load from "./load";
import { startScan } from '../../position/endpoints';
import StopScan from './stop_scan'

const Button = styled.button`
padding: 20px;
margin: auto;
color: #ad77e0;
display: ${props => props.visibility? 'inline': 'none'}
`;



class BeginScan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
            stophidden: false
        };

        this.toggleStopButton = this.toggleStopButton.bind(this);
    }

    toggleStopButton = () =>{
        this.setState(state => ({
            stophidden: !state.stophidden,
            hidden: (state.hidden && state.stophidden) 
        }));
    }

    handleClick = () => {
        this.toggleStopButton()
        startScan(0);
      };

    render(){
        return(
            <>
                <Button className="btn" onClick={() => {this.handleClick()}} visibility = {this.state.hidden}>
                Begin Scan
                </Button>
                {(this.state.stophidden) ? <Load/> : <></>}
                < StopScan hidden = {this.state.stophidden} toggleStopButton = {this.toggleStopButton}/>
                
            </>
        );
    }
}


export default BeginScan