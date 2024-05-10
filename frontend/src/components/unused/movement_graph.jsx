import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import styled from "styled-components";


const Container = styled.div`
  margin: 0;
  display: grid;
  grid-template-rows: auto;
`;



function MovementPlot() {
    const [data, setData] = useState([]);



    useEffect(() => {
        fetch('https://10.42.0.1/api/locations/get/')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const xValues = data.map((element)=> element.x)
    const yValues = data.map((element)=> element.y)

    // var intensity = [];
    // for (var i = 0; i < xValues.length; i++) {
    //     var randomColor = (Math.random(1, 100))
    //     intensity.push(randomColor);
    // }
    intensity = []
    const plotData = [{
        x: xValues,
        y: yValues,
        // x: x,
        // y: y,
        type: 'scattergl',
        mode: 'markers',
        mode: 'markers',
        marker: {
          color: intensity, // Set colors based on intensity
          colorscale: 'Viridis', // Set the colorscale ('Viridis' is just an example, you can use other built-in colorscales or define your own)
          cmin: 0, // Set the minimum value for the colorscale
          colorbar: {
            title: 'Signal Intensity' // Add a colorbar title
          }
        },
        color: intensity, 
        colorscale: 'Greens'
    }];

    return (
      <Container>
        <div className="MovementPlot">
          <Plot
            data={plotData}
            layout={{ title: 'Positions' }}
          />
        </div>
      </Container>

      ); 
}

export default MovementPlot;

