
////////////General use functions/////////////

// calculate mean
function locationMean(arr){
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return mean;
}


//multiplication of arrays with constants
function mult(arr, constant){
    const multiplication = arr.map((x) => constant * x);
    return multiplication;
}

//addition of 3 dimensional arrays
// usage example: sum3d(...[1,2,3], ...[1,2,3]) -> [2,4,6]
function sum3d(...args){
    let s = [0,0,0];
    for (let i = 0; i<args.length; i++) {
        s[i%3] += args[i];
    }
    return s;
}


//Integrating the solution for displacement offered in the paper 'Deriving Displacement from a 3 axis Accelerometer'
// https://cris.brighton.ac.uk/ws/portalfiles/portal/219655/Displacement+from+Accelerometer+(1).pdf

//the function receives the acceleration at that point on x, y and z, provided by the accelerometer and the last calculated position both as an array
// acc_sum: the sum of all the accelerations minus the last one
function toPosition(current_acc, last_acc, acc_sum, last_pos, time_elapsed) {
    const current_pos = sum3d(...mult(sum3d(...mult(current_acc, 1/2), ...mult(last_acc, 3/2), ...mult(acc_sum, 2)), (time_elapsed^2)/2), ...last_pos);
    return(current_pos);
}

export {mult, sum3d, toPosition, locationMean};