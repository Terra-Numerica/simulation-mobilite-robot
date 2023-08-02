//current label
let nbIteration = 1;
//add a data in the chart and refresh it
function updateSample(nb) {
    chart.data.datasets[0].data.push(nb);
    chart.data.labels.push(nbIteration + '');
    nbIteration++;
    chart.update();
}

function clearSample() {
    chart.data.datasets[0].data = [];
    chart.data.labels = [];
    nbIteration = 0;
    chart.update();
}