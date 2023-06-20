//current label
let nbIteration:number = 1;

//add a data in the chart and refresh it
function updateSample (nb:number) {
    chart.data.datasets[0].data.push(nb);
    chart.data.labels.push(nbIteration+'');
    nbIteration ++;
    chart.update();
}