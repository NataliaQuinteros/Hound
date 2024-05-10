// credits to adrianmcli
//https://gist.github.com/adrianmcli/9fac3ff3c144c2805be90381eaa8d3d4

import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 2s linear infinite;
  transform: translateZ(0);
  margin: auto;
  border-top: 15px solid #d7cade;
  border-right: 15px solid #d7cade;
  border-bottom: 15px solid #d7cade;
  border-left: 15px solid #7D4A96;
  background: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top:50px;
  margin-bottom:50px;
`;

export default Spinner;