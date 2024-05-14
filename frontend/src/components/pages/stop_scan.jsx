import React from "react";
import styled from "styled-components";
import { stopScan, sendNetworkData } from '../../position/endpoints';
import MacSelector from "../mac_selector/mac_selector";

const Button = styled.button`
padding: 20px;
color: #ad77e0;
display: ${props => props.visibility? 'inline': 'none'}
`;

class StopScan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finished: false
        };
        
    }

    showMacs = () => {
        this.setState(state => ({
            finished: !state.finished
        }));
    }

    handleClick = () => {
        this.props.toggleStopButton();
        sendNetworkData();
        stopScan();
        this.showMacs();
    };

    render(){
        return(
            <>
                {/* Mandar data de scan y mandar instruccion para extraer la primera fecha de signal scan, luego llamar al create nw scan*/}
                {(this.state.finished) ? <MacSelector/> : <></>}

                <Button className="btn" hidden = {!this.props.hidden} onClick= {() => {this.handleClick()}} visibility = {this.props.hidden}>
                Stop Scan
                </Button>
                {/* TODO: hacer que se muestre solo despues de haber apretado stop */}
            
            </>
        );
    }

}

export default StopScan