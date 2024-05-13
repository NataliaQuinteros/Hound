import {Colorscale} from 'react-colorscales';
import ColorscalePicker from 'react-colorscales';

const viridisColorscale = ['#fafa6e', '#9cdf7c', '#4abd8c', '#00968e', '#106e7c', '#2a4858'];

// Show a single colorscale

const ColorBar= () => {
    <>
    <Colorscale
        colorscale={viridisColorscale}
        onClick={() => {}}
        width={150}
    />

    </>
}

export default ColorBar