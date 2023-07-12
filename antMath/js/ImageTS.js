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

let sizeScreenWidth;
let sizeScreenHeight;

// Allow use button instead of checkbox
let drawAllPathOn = true;

let saveFirstDrawApp = Object();

//Change the space between two ants with html
function changeAntSpacing(element) {
    gap = parseInt(element.value);
}
function changeAntSpacing2(element) {
    gap2 = Math.abs(parseInt(element.value) * 10);
}
//Change the execution speed with html
function changeAntSpeed() {

    speedAnt = Math.abs(parseInt(document.getElementById('antSpeed').value));
}
//Reset the simulation with html
function resetDraw(element) {
    location.reload();
}
function pauseDraw(element) {
    if (Pause) {
        Pause = false;
        document.getElementById('stopButton').innerText = TRAD.stopButton[language];
        
        setTimeout(startAnts, 10, firstAnt, d, firstX, firstY);
    }
    else {
        Pause = true;
        document.getElementById('stopButton').innerText = TRAD.startButton[language];
    }
}
function drawPath(element) {
    // document.getElementById('drawMain').checked = false;
    // document.getElementById('drawAll').checked = false;
    for (var i_1 = 0; i_1 < canvasTab.length; i_1++) {
        canvasTab[i_1].style.opacity = '0';
        
    }
    if (canvasTab.length > 0 && parseInt(element.value) >= 0) {
        canvasTab[parseInt(element.value)].style.opacity = '1';
    }
}
function drawMainPaths(element) {
    drawAllPathOn = !drawAllPathOn;
    for (var i_2 = 0; i_2 < canvasTab.length; i_2++) {
        canvasTab[i_2].style.opacity = '0';
    }
    if(drawAllPathOn){
    // if (element.checked) {
        // document.getElementById('drawAll').checked = false;
        for (var i_3 = 0; i_3 < canvasTab.length; i_3 = i_3 * 2 + 1) {
            canvasTab[i_3].style.opacity = '1';
        }
    }
}
function drawAllPaths(element) {
    // pour éviter de surcharger -> pas plus de 200 path
    // TODO : y a un problème , ça en affiche x, puis la limite est doublé si on reclick ???
    let limite = (canvasTab.length < 1000) ? canvasTab.length : 1000;

    for (var i_4 = 0; i_4 < limite; i_4++) {
        canvasTab[i_4].style.opacity = '0';
        
    }
    if (element.checked) {
        document.getElementById('drawMain').checked = false;
        for (var i_5 = 0; i_5 < limite; i_5++) {
            canvasTab[i_5].style.opacity = '1';
        }
    }
}

let orientationDrawVertical;

function myEventHandler(){

    let distPath = Math.sqrt((d.clickX[0] - d.clickX[d.clickX.length-1])**2 + (d.clickY[0] - d.clickY[d.clickY.length-1])**2);
    console.log("distPath : " + distPath)

    if(distPath < 100){
        alert(TRAD.alertPathTooShort[language]);
        d.clearCanvas();
        return;
    }

    else if (draw) {
        draw = false;

        console.log("draw ended");

        orientationDrawVertical = (window.innerHeight > window.innerWidth) ? true : false;


        //add the first ant at the begining and on the page
        firstAnt.move(d.clickX[0], d.clickY[0]);

        document.getElementById("playPanel").appendChild(firstAnt.img);
        // document.body.appendChild(firstAnt.img);
        //Save the first location
        firstX = d.clickX[0];
        firstY = d.clickY[0];
        //Print the anthill
        // var anthill = new Ant('./assets/anthill.png', 50, 50);
        var anthill = new Ant('./img/fourmiliere_cut.png', 50, 50);
        anthill.move(firstX, firstY);

        document.getElementById("playPanel").appendChild(anthill.img);
        // document.body.appendChild(anthill.img);
        //init array containing all the ants
        futurAnts = new Array();
        //start main prg, with the speed choosen by the user

        sizeScreenHeight = window.innerHeight;
        sizeScreenWidth = window.innerWidth;

        // Functipon unfound ???
        // saveFirstDrawApp = structuredClone(d); 
        // sert à sauvegarder le chemin d'origine

    //     let canvas = document.getElementById("playGround");


    //     let context = canvas.getContext("2d");
    // context.lineCap = 'round';
    // context.lineJoin = 'round';
    // context.strokeStyle = '#EE5A24';
    
    // context.lineWidth = 4;


        
        // saveFirstDrawApp.context = context;

        setTimeout(startAnts, 10, firstAnt, d, firstX, firstY);
    }
    else {
        //d.clearCanvas();
        //draw = true;
    }
}

window.onload = function () {

    //create canvas and set background
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
                    label: 'Path length of each ant',
                    data: []
                }]
        },
        options: {
            responsive: true,
            maintainAspectRatio : false,
            aspectRatio : 1|2,
            tension: 0.4,
            pointRadius: 2,
            pointBackgroundColor: 'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(0,0,0,1)',
            borderColor: 'rgb(0,0,0,1)',

            scales: {
                x:{
                    title: {
                        display: true,
                        text: "Ant"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Path length (AU)' // Arbitrary Unit
                      },
                    min: 0
                },
            },
            animation: {
                duration: 0
            }
        }
    });

    // saveFirstDrawApp = new DrawingApp();
    Object.assign(saveFirstDrawApp, d);
    saveFirstDrawApp.redraw = d.redraw;

    // TWO handlers : one for PC, one for smartphone

    //detect click on canvas once
    document.getElementById("playGround").addEventListener('click', function (event) {
        myEventHandler();
    });
    // For smartphone : detect release of finger on canvas once
    document.getElementById("playGround").addEventListener('touchend', function (event) {
        myEventHandler();
    });


    // //Re Set la valeur de speed/gap value par défaut au chargement pour être égale à celle du curseur
    
    let speedInput = document.getElementById('antSpeed');
    speedInput.value = defaultValueRange(speedInput);
    changeAntSpeed(speedInput); 

    let gapInput = document.getElementById("antSpacing");
    gapInput.value = defaultValueRange(gapInput);
    changeAntSpacing(gapInput);
    
    // Pas touche au path selection 


    showHideDataViewer();
    switchLang();
    includeAllHTML();
    document.querySelector("[value=" + language + "]").selected = true;
};

function defaultValueRange(element){
    return Math.round((element.max < element.min) ? element.min : Number(element.min) + ((element.max - element.min)/2))
}

// Function to make appear / desapppear the data viewer
function showHideDataViewer(){
    let graph = document.getElementById("dataViewer");
    let curve = document.getElementById("curve");

    // hasChildren ne marche pas -> renvoie toujours true
    if(window.innerWidth < 900 && document.querySelector(".tab__content:last-child").children.length == 0){
        // graph.remove();
        // document.querySelector(".tab__content:last-child").appendChild(graph);
        curve.remove();
        document.querySelector(".tab__content:last-child").appendChild(curve);

        // console.log("document.getElementById('dataViewer').style", document.getElementById("dataViewer").style.width);
        // console.log("document.getElementById('dataViewer').style", document.getElementById("dataViewer").width);

        // setTimeout(() => {
        //     // Hide the data viewer
        //     document.getElementById("dataViewer").style.display = "none";
        // },5000);
    }
    if(window.innerWidth >= 900 && document.querySelector(".tab__content:last-child").children.length != 0){
        // graph.remove();
        // document.getElementById("controlPanel").appendChild(graph);
        curve.remove();
        document.getElementById("dataViewer").appendChild(curve);
        document.getElementById("tab1").checked = true;
    }

    
}

let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;

window.addEventListener("resize", () => {

    showHideDataViewer();
    
    // this listener has been made to replaced the CSS that does'not work
    // le canvas doit être entièremenet reconstuit pour évider de graphiquement disparaitre
    if (window.innerWidth >= 900) {
        let controlPanel = document.getElementById("controlPanel");
        if (controlPanel.style.display != "block") {
            controlPanel.style.display = "block";
        }
    }

    let playPanel = document.getElementById("playPanel");
    let playGround = document.getElementById("playGround");

    if(!draw){ // si le chemin est tracé
        if(previousWidth == window.innerHeight && previousHeight == window.innerWidth){
            alert("Rotation")
            // l'orienté en fonction de la rotation
            playPanel.style.transformOrigin =playGround.height / 2 + "px " + playGround.height / 2 + "px";
            if(window.innerWidth < window.innerHeight){
                
                playPanel.style.rotate = orientationDrawVertical ? "0deg" : "90deg";
            }
            else{
                playPanel.style.rotate = orientationDrawVertical ? "90deg" : "0deg";
            }
            
        }
    }
    else{
        // Resize le canvas pour qu'il prenne toute la place
            console.log("playGround.width", playGround.width);
            console.log("playGround.height", playGround.height);

            playGround.width = window.innerWidth;
            playGround.height = window.innerHeight;
    }
    


    
    
    // // redessine le chemin dans le canvas resized
    // // on doit redonné le contexte je sais pas pourquoi
    saveFirstDrawApp.context.strokeStyle = '#EE5A24';
    saveFirstDrawApp.context.lineCap = 'round';
    saveFirstDrawApp.context.lineJoin = 'round';
    saveFirstDrawApp.context.strokeStyle = '#EE5A24';
        
    saveFirstDrawApp.context.lineWidth = 4;
    saveFirstDrawApp.redraw();

    previousWidth = window.innerWidth;
    previousHeight = window.innerHeight;

});

// évite d'afficher 1 millipns de path qaund différence minime
let previousPathLength = Infinity;
let deltaPathLength = Infinity  ;
const DELTA_MIN = 0.002;

/**
 * 
 * @param {Ant} First First ant of the queue
 * @param {DrawingApp} Space The curb 
 * @param {number} firstX coord of thestart of  path 
 * @param {number} firstY coord of thestart of  path
 */
function startAnts(First, Space, firstX, firstY) {

    

    //create an ant if none are left
    if (futurAnts.length == 0) {

        
            futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
            futurAnts[futurAnts.length - 1].move(firstX, firstY);
            document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
        
    }
    //While the first ant is still mooving
    if (Space.clickX.length > 0) {
        if (Space.clickX.length == 1) {
            delayFirst(Space, First, firstX, firstY);
            //change the first ant in food at the end and add the lenght of its path
            if (!(Math.abs(First.x - Space.clickX[0]) > 1 && Math.abs(First.y - Space.clickY[0]) > 1)) {
                Space.removeFirstOne();
                // First.img.src = './assets/strawberry.png';
                First.img.src = './img/fraise_trans.png';
                // First.img.style.width = 70 + 'px';
                // First.img.style.height = 55 + 'px';
                First.img.style.width = 80 + 'px';
                First.img.style.height = 80 + 'px';
                First.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (0) + 'deg) ';
                updateSample(First.distance);

                // évite d'afficher 1 millipns de path qaund différence minime
                deltaPathLength = previousPathLength - First.distance;

                

                if(deltaPathLength < DELTA_MIN && deltaPathLength > 0){
                    console.log("Delta too low to show path");
                }
                else{
                    previousPathLength = First.distance;
                }
                
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
                // if(drawAllPathOn){
                if(drawAllPathOn && (deltaPathLength > DELTA_MIN || deltaPathLength < 0) ){
                // if (document.getElementById('drawMain').checked) {
                    futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
                }
                else {
                    futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, false));
                }
                futurAnts[futurAnts.length - 1].move(firstX, firstY);
                document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
            }
            else {
                futurAnts.push(new DrawingAnt('./assets/ant.png', 30, 30, false));
                futurAnts[futurAnts.length - 1].move(firstX, firstY);
                document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
            }
            i++;
        }
        //if the first reached the end, add its distance to the curve then delete it from the array and the html
        if (futurAnts[0].x == First.x && futurAnts[0].y == First.y) {
            updateSample(futurAnts[0].distance);
            document.getElementById("playPanel").removeChild(futurAnts.shift().img);

            // évite d'afficher 1 millipns de path qaund différence minime
            // le undef est au cas où l'utilisteur créé un chmin si court que pas de futur ant

            
            deltaPathLength = previousPathLength - ((futurAnts[0] == undefined) ? 0 : futurAnts[0].distance );
            

            if(deltaPathLength < DELTA_MIN && deltaPathLength > 0){
                
                console.log("Delta too low to show path");
            }
            else{
                previousPathLength = ((futurAnts[0] == undefined) ? 0 : futurAnts[0].distance );
            }
            
        }
        //move all the other ants, from the closest to the farest
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
        futurAnts[futurAnts.length - 1].move(firstX, firstY);
        document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
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
            // if(drawAllPathOn){
            if(drawAllPathOn && (deltaPathLength > DELTA_MIN || deltaPathLength < 0) ){
            // if (document.getElementById('drawMain').checked) {
                futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, true));
            }
            else {
                futurAnts.push(new DrawingAnt('./assets/RedAnt.png', 30, 30, false));
            }
            futurAnts[futurAnts.length - 1].move(firstX, firstY);
            document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
        }
        else {
            futurAnts.push(new DrawingAnt('./assets/ant.png', 30, 30, false));
            futurAnts[futurAnts.length - 1].move(firstX, firstY);
            document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
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

    let originalCanvas = document.getElementById("playGround");
    canvasFinal.width = window.innerWidth * 0.75
    canvasFinal.height = window.innerHeight * 0.9;


    canvasFinal.style.opacity = '0';



    canvasFinal.getContext('2d').drawImage(d.canvas, 0, 0);
    gif.addFrame(canvasFinal, { delay: 200 });
    // for (var i_9 = 0; i_9 < (nbIteration - 1); i_9++) {
    for (var i_9 = 0; i_9 < canvasTab.length; i_9++) {    
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
            document.getElementById("playPanel").appendChild(loader);
            once = false;
        }
        text.innerText = Math.round(p * 100) + '%';
    });
    gif.on('finished', function (blob) {
        document.getElementById("playPanel").removeChild(loader);
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
            document.getElementById("playPanel").appendChild(loader);
            once = false;
        }
        text.innerText = Math.round(p * 100) + '%';
    });
    gif.on('finished', function (blob) {
        document.getElementById("playPanel").removeChild(loader);
        window.open(URL.createObjectURL(blob));
    });
    gif.render();
}
