import styled, { keyframes } from "styled-components";
import { FaArrowAltCircleUp } from "react-icons/fa";

var WhereTo = {
    UP: 0,
    RIGHT: 1,
    LEFT: 2,
    DOWN: 3
};

const FormatArrow = styled.div `
    font-size: 128px;
    color: Orchid;
    
`



const rotate45Left = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-45deg);
  }
`;

const MoveTo = (direction) => {
    switch (this.direction){
        case WhereTo.UP:{
            
        }
    }

  
}

const Animation = styled.div`
    animation: ${rotate45Left} 1s linear ;
    transform: translateZ(0);
`


const Arrow = () => {

    return (
      <div>
        <FormatArrow>
            <Animation>
                < FaArrowAltCircleUp />
            </Animation>
        </FormatArrow>

        
      </div>
  
    );
  }

export default Arrow;