var i = 2;
var firstAnt = new Ant('./assets/ant.png', 30, 30);
var futurAnts = new Array();
var draw = true;
var gap = 30;
var speedAnt = 1;
var d;
var firstAntDelay;
var chart;
var drawingGap = 4;
var canvasTab = new Array();
var Pause = false;
var firstX;
var firstY;
var red = 255;
var blue = 0;
var green = 0;
//Change the space between two ants with html
function changeGap(element) {
    gap = parseInt(element.value);
}
function changeGap2(element) {
    gap2 = Math.abs(parseInt(element.value) * 10);
}
//Change the execution speed with html
function changeSpeed(element) {
    speedAnt = Math.abs(parseInt(element.value));
}
//Reset the simulation with html
function resetDraw(element) {
    location.reload();
}
function pauseDraw(element) {
    if (Pause) {
        Pause = false;
        setTimeout(startAnts, 10, firstAnt, d, firstX, firstY);
    }
    else {
        Pause = true;
    }
}
function drawPath(element) {
    document.getElementById('drawMain').checked = false;
    document.getElementById('drawAll').checked = false;
    for (var i_1 = 0; i_1 < canvasTab.length; i_1++) {
        canvasTab[i_1].style.opacity = '0';
    }
    if (canvasTab.length > 0 && parseInt(element.value) >= 0) {
        canvasTab[parseInt(element.value)].style.opacity = '1';
    }
}
function drawMainPaths(element) {
    for (var i_2 = 0; i_2 < canvasTab.length; i_2++) {
        canvasTab[i_2].style.opacity = '0';
    }
    if (element.checked) {
        document.getElementById('drawAll').checked = false;
        for (var i_3 = 0; i_3 < canvasTab.length; i_3 = i_3 * 2 + 1) {
            canvasTab[i_3].style.opacity = '1';
        }
    }
}
function drawAllPaths(element) {
    for (var i_4 = 0; i_4 < canvasTab.length; i_4++) {
        canvasTab[i_4].style.opacity = '0';
    }
    if (element.checked) {
        document.getElementById('drawMain').checked = false;
        for (var i_5 = 0; i_5 < canvasTab.length; i_5++) {
            canvasTab[i_5].style.opacity = '1';
        }
    }
}
window.onload = function () {
    //create canvas and set background
    //document.body.style.margin = "0";
    //document.body.style.backgroundColor = "#008CBA"; 
    d = new DrawingApp();
    //creation of the chart
    var canvasCurve = document.getElementById('curve');
    chart = new Chart(canvasCurve.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                    backgroundColor: [
                        'rgba(0, 0, 0)'
                    ],
                    label: 'Path\'s lenght',
                    data: []
                }]
        },
        options: {
            responsive: true,
            tension: 0.4,
            pointRadius: 2,
            pointBackgroundColor: 'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(0,0,0,1)',
            borderColor: 'rgb(0,0,0,1)',
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0
                }
            },
            animation: {
                duration: 0
            }
        }
    });
    //detect click on canvas once
    document.getElementById('canvas').addEventListener('click', function (event) {
        if (draw) {
            draw = false;
            //add the first ant at the begining and on the page
            firstAnt.moove(d.clickX[0], d.clickY[0]);
            document.body.appendChild(firstAnt.img);
            //Save the first location
            firstX = d.clickX[0];
            firstY = d.clickY[0];
            //Print the anthill
            var anthill = new Ant('./assets/anthill.png', 50, 50);
            anthill.moove(firstX, firstY);
            document.body.appendChild(anthill.img);
            //init array containing all the ants
            futurAnts = new Array();
            //start main prg, with the speed choosen by the user
            setTimeout(startAnts, 10, firstAnt, d, firstX, firstY);
        }
        else {
            //d.clearCanvas();
            //draw = true;
        }
    });
};
function startAnts(First, Space, firstX, firstY) {
    //create an ant if none are left
    if (futurAnts.length == 0) {
        futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
        futurAnts[futurAnts.length - 1].moove(firstX, firstY);
        document.body.appendChild(futurAnts[futurAnts.length - 1].img);
    }
    //While the first ant is still mooving
    if (Space.clickX.length > 0) {
        if (Space.clickX.length == 1) {
            delayFirst(Space, First, firstX, firstY);
            //change the first ant in food at the end and add the lenght of its path
            if (!(Math.abs(First.x - Space.clickX[0]) > 1 && Math.abs(First.y - Space.clickY[0]) > 1)) {
                Space.removeFirstOne();
                First.img.src = './assets/strawberry.png';
                First.img.style.width = 70 + 'px';
                First.img.style.height = 55 + 'px';
                First.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (0) + 'deg) ';
                updateSample(First.distance);
            }
        }
        else {
            delayFirst(Space, firstAnt, firstX, firstY);
            if (!(Math.abs(First.x - Space.clickX[0]) > 1 && Math.abs(First.y - Space.clickY[0]) > 1)) {
                Space.removeFirstOne();
            }
        }
        //Once the first ant stopped, run forever
    }
    else {
        //new first follow the never changing First with special function with no slow
        futurAnts[0].followEnd(First);
        //add a new ant every time the last one is farther than 'gap'
        if (Math.sqrt((futurAnts[futurAnts.length - 1].x - firstX) * (futurAnts[futurAnts.length - 1].x - firstX) + (futurAnts[futurAnts.length - 1].y - firstY) * (futurAnts[futurAnts.length - 1].y - firstY)) > gap) {
            if (i == drawingGap) {
                if (red > 0) {
                    blue = Math.min(255, blue + 45);
                }
                else {
                    blue = Math.max(0, blue - 45);
                    green = Math.min(255, green + 45);
                }
                red = Math.max(0, red - 45);
                drawingGap = Math.round(drawingGap * 2 - drawingGap / 2);
                if (document.getElementById('drawMain').checked) {
                    futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
                }
                else {
                    futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, false));
                }
                futurAnts[futurAnts.length - 1].moove(firstX, firstY);
                document.body.appendChild(futurAnts[futurAnts.length - 1].img);
            }
            else {
                futurAnts.push(new DrawingAnt('./assets/ant.png', 30, 30, false));
                futurAnts[futurAnts.length - 1].moove(firstX, firstY);
                document.body.appendChild(futurAnts[futurAnts.length - 1].img);
            }
            i++;
        }
        //if the first reached the end, add its distance to the curve then delete it from the array and the html
        if (futurAnts[0].x == First.x && futurAnts[0].y == First.y) {
            updateSample(futurAnts[0].distance);
            document.body.removeChild(futurAnts.shift().img);
        }
        //moove all the other ants, from the closest to the farest
        for (var i_6 = 1; i_6 < futurAnts.length; i_6++) {
            futurAnts[i_6].follow(futurAnts[i_6 - 1]);
        }
    }
    //repeat the function
    if (!Pause) {
        setTimeout(startAnts, 10, firstAnt, Space, firstX, firstY);
    }
}
function delayFirst(Space, First, firstX, firstY) {
    //follow next point on the line
    First.followN(Space.clickX[0], Space.clickY[0]);
    //create a second ant to avoid bugs
    if (futurAnts.length == 0) {
        futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
        futurAnts[futurAnts.length - 1].moove(firstX, firstY);
        document.body.appendChild(futurAnts[futurAnts.length - 1].img);
        //create new ants
    }
    else if (Math.sqrt((futurAnts[futurAnts.length - 1].x - firstX) * (futurAnts[futurAnts.length - 1].x - firstX) + (futurAnts[futurAnts.length - 1].y - firstY) * (futurAnts[futurAnts.length - 1].y - firstY)) > gap) {
        if (i == drawingGap) {
            if (red > 0) {
                blue = Math.min(255, blue + 45);
            }
            else {
                blue = Math.max(0, blue - 45);
                green = Math.min(255, green + 45);
            }
            red = Math.max(0, red - 45);
            drawingGap = Math.round(drawingGap * 2 - drawingGap / 2);
            if (document.getElementById('drawMain').checked) {
                futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
            }
            else {
                futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, false));
            }
            futurAnts[futurAnts.length - 1].moove(firstX, firstY);
            document.body.appendChild(futurAnts[futurAnts.length - 1].img);
        }
        else {
            futurAnts.push(new DrawingAnt('./assets/ant.png', 30, 30, false));
            futurAnts[futurAnts.length - 1].moove(firstX, firstY);
            document.body.appendChild(futurAnts[futurAnts.length - 1].img);
        }
        i++;
    }
    //make other ants follow the first
    futurAnts[0].follow(First);
    for (var i_7 = 1; i_7 < futurAnts.length; i_7++) {
        futurAnts[i_7].follow(futurAnts[i_7 - 1]);
    }
}
function EndScreenOne(element) {
    Pause = true;
    for (var i_8 = 0; i_8 < canvasTab.length; i_8++) {
        canvasTab[i_8].style.opacity = '0';
    }
    var gif = new GIF({
        workerScript: './library/gif.js.optimized/dist/gif.worker.js',
        workers: navigator.hardwareConcurrency,
        quality: 100,
        transparent: "#0x00FF00"
    });
    var canvasFinal = document.createElement('canvas');
    canvasFinal.width = window.innerWidth * 0.75;
    canvasFinal.height = window.innerHeight * 0.9;
    canvasFinal.style.width = "auto";
    canvasFinal.style.height = "auto";
    canvasFinal.style.margin = '0';
    canvasFinal.style.position = 'absolute';
    canvasFinal.style.opacity = '0';
    canvasFinal.getContext('2d').drawImage(d.canvas, 0, 0);
    gif.addFrame(canvasFinal, { delay: 200 });
    for (var i_9 = 0; i_9 < (nbIteration - 1); i_9++) {
        canvasFinal.getContext('2d').drawImage(canvasTab[i_9], 0, 0);
        gif.addFrame(canvasFinal, {
            delay: Math.max(40, 200 - 10 * i_9),
            copy: true
        });
    }
    var load;
    var once = true;
    var loader;
    var text;
    gif.on('progress', function (p) {
        if (once) {
            loader = document.createElement('div');
            text = document.createElement('span');
            text.style.position = 'absolute';
            text.style.left = '50%';
            text.style.top = '50%';
            text.style.transform = 'translateX(-50%) translateY(-50%)';
            text.style.backgroundColor = 'rgb(255,255,255)';
            loader.style.textAlign = 'center';
            loader.style.position = 'absolute';
            loader.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%)';
            loader.style.top = '45%';
            loader.style.left = '37.5%';
            load = document.createElement('img');
            load.src = "./assets/loading.svg";
            load.style.width = 100 + 'px';
            load.style.height = 100 + 'px';
            load.style.display = 'block';
            loader.appendChild(text);
            loader.appendChild(load);
            document.body.appendChild(loader);
            once = false;
        }
        text.innerText = Math.round(p * 100) + '%';
    });
    gif.on('finished', function (blob) {
        document.body.removeChild(loader);
        window.open(URL.createObjectURL(blob));
    });
    gif.render();
}
function EndScreenTwo(element) {
    Pause = true;
    for (var i_10 = 0; i_10 < canvasTab.length; i_10++) {
        canvasTab[i_10].style.opacity = '0';
    }
    var gif = new GIF({
        workerScript: './library/gif.js.optimized/dist/gif.worker.js',
        workers: navigator.hardwareConcurrency,
        quality: 100,
        transparent: "#0x00FF00"
    });
    gif.addFrame(d.canvas.getContext('2d'), { delay: 200 });
    for (var i_11 = 0; i_11 < (nbIteration - 1); i_11++) {
        gif.addFrame(canvasTab[i_11], {
            delay: Math.max(40, 200 - 10 * i_11),
            copy: true
        });
    }
    var load;
    var once = true;
    var loader;
    var text;
    gif.on('progress', function (p) {
        if (once) {
            loader = document.createElement('div');
            text = document.createElement('span');
            text.style.position = 'absolute';
            text.style.left = '50%';
            text.style.top = '50%';
            text.style.transform = 'translateX(-50%) translateY(-50%)';
            text.style.backgroundColor = 'rgb(255,255,255)';
            loader.style.textAlign = 'center';
            loader.style.position = 'absolute';
            loader.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%)';
            loader.style.top = '45%';
            loader.style.left = '37.5%';
            load = document.createElement('img');
            load.src = "./assets/loading.svg";
            load.style.width = 100 + 'px';
            load.style.height = 100 + 'px';
            load.style.display = 'block';
            loader.appendChild(text);
            loader.appendChild(load);
            document.body.appendChild(loader);
            once = false;
        }
        text.innerText = Math.round(p * 100) + '%';
    });
    gif.on('finished', function (blob) {
        document.body.removeChild(loader);
        window.open(URL.createObjectURL(blob));
    });
    gif.render();
}
