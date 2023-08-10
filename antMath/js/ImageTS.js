
let firstAnt = new Ant('./img/insect/ant.png', 30, 30);

/**
 * Array containing all the ants
 * @type {Array<DrawingAnt>}
 */
let futurAnts = new Array();

/**
 * Equal waiting for the user to draw a path
 * @type {boolean}
 */
let draw = true;

/**
 * d between two ants
 */
let spacingAnt = 30;

/**
 * Speed of the ants
 */
let speedAnt = 1;

/**
 * DrawingApp object
 * ????
 * @type {DrawingApp}
 */
let d;

/**
 * Chart object
 * Save me data for ther curv, ect...
 * @type {Chart}
 */
let chart;

/**
 * Nombre d'exécution de la fonction delayFirst avant de dessiner un nouveau path
 * Je crois ???
 * On augmente sa value expodentiellement pour pas avoir 1 millions de chemins quand les tracets sont quasi identiques
 * @type {number}
 */
let drawingGap = 4;

/**
 * Compteur du drawing spacingAnt
 * Je sais pas à quoi ça correspond exactement : le nombre de chemin dessiner ??
 * Pourquoi commence à 2 ??
 * @type {number}
 */
let compter = 2;

let canvasTab = new Array();
let isGameStopped = false;
let firstX;
let firstY;

// RGB : Color of the path draw by the ants
let pathColorRedValue = 255;
let pathColorBlueValue = 0;
let pathColorGreenValue = 0;

/**
 * Minimum size path to be draw
 */
const MIN_PATH_SIZE = 100;

// Allow use button instead of checkbox
let drawAllPathOn = true;

let saveFirstDrawApp = Object();

/**
 * Say if the path has be draw vertically or horizontally
 * @type {boolean}
 */
let orientationDrawVertical;

// Check if the path is too short
function isPathTooShort() {
    // Check if there is a distance > 100px between the first and another point
    for (let i = 1; i < d.clickX.length; i++) {
        let dist = Math.sqrt((d.clickX[0] - d.clickX[i]) ** 2 + (d.clickY[0] - d.clickY[i]) ** 2);
        // Si au moins 1 point est suffisament loin, pathTooshort = false
        if (dist > MIN_PATH_SIZE) {
            return false;
        }
    }
    return true;
}




function fadeOut(element, fadeOutDuration = 1, timeBeforeFadeOut = 1000) {
    element.style.display = "block";
    let opacity = 1;
    element.style.opacity = opacity;

    // Wait for 1 seconde (1000 ms) before starting the fadeOut
    setTimeout(function () {
        function decreaseOpacity() {
            opacity -= (0.02 / fadeOutDuration);
            element.style.opacity = opacity;
            if (opacity > 0) {
                requestAnimationFrame(decreaseOpacity);
            }
        }

        requestAnimationFrame(decreaseOpacity);
    }, timeBeforeFadeOut); // 1000 ms (1 second) delay before starting fadeOut

    setTimeout(function () {
        element.style.display = "none";
        console.log("none");
    }, timeBeforeFadeOut + 1000 * fadeOutDuration); // 1000 ms (1 second) delay before starting fadeOut
    // 1000 ms (1 second) delay before starting fadeOut

}

// Evite de faire plusieurs fadeOut en même temps
let doingFadeOut = false;

function showAlert(id, fadeOutDuration = 1, timeBeforeFadeOut = 1000) {
    if (!doingFadeOut) {
        doingFadeOut = true;
        let alertDiv = document.querySelector("div.alert");
        let alertText = document.getElementById(id);
        fadeOut(alertDiv, fadeOutDuration, timeBeforeFadeOut);
        fadeOut(alertText, fadeOutDuration, timeBeforeFadeOut);
        setTimeout(function () {
            doingFadeOut = false;
        }, timeBeforeFadeOut + 1000 * fadeOutDuration); // 1000 ms (1 second) delay before starting fadeOut
    }
}

/**
 * Handle the draw of the path made by the user on click / touch screen
 */
function drawHandler() {

    // Si path trop court, on alerte et on ne dessine pas
    if (isPathTooShort()) {

        showAlert("alertPathTooShort", 1, 500);
        d.clearCanvas();
        return;
    }

    // Si path assez long, on dessine
    else if (draw) {
        draw = false;
        shouldReset = false;

        orientationDrawVertical = (window.innerHeight > window.innerWidth) ? true : false;

        //add the first ant at the begining and on the page
        firstAnt.move(d.clickX[0], d.clickY[0]);
        document.getElementById("playPanel").appendChild(firstAnt.img);
        //Save the first location
        firstX = d.clickX[0];
        firstY = d.clickY[0];
        //Print the anthill
        let anthill = new Ant('./img/fourmiliere_cut.png', 50, 50);
        anthill.move(firstX, firstY);

        document.getElementById("playPanel").appendChild(anthill.img);
        //init array containing all the ants
        futurAnts = new Array();
        //start main prg, with the speed choosen by the user
        // saveFirstDrawApp.context = context;

        startAnts();
    }
}

function initGame() {
    previousOrientation = getOrientation();

    //create canvas and set background
    d = new DrawingApp();
    //creation of the chart
    let canvasCurve = document.getElementById('curve');
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
            maintainAspectRatio: false,
            aspectRatio: 1 | 2,
            tension: 0.4,
            pointRadius: 2,
            pointBackgroundColor: 'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(0,0,0,1)',
            borderColor: 'rgb(0,0,0,1)',

            scales: {
                x: {
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
        drawHandler();
    });
    // For smartphone : detect release of finger on canvas once
    document.getElementById("playGround").addEventListener('touchend', function (event) {
        drawHandler();
    });
}

function initPage() {

    initGame();

    // //Re Set la valeur de speed/spacingAnt value par défaut au chargement pour être égale à celle du curseur

    let speedInput = document.getElementById('antSpeed');
    speedInput.value = defaultValueRange(speedInput);
    changeAntSpeed(speedInput);

    let gapInput = document.getElementById("antSpacing");
    gapInput.value = defaultValueRange(gapInput);
    changeAntSpacing(gapInput);

    // Pas touche au path selection 

    // showHideDataViewer();
    switchLang();
    includeAllHTML();

    // Set as checked the input radio of the language associaate
    console.log("lang-choice-" + language);
    document.getElementById("lang-choice-" + language).checked = true;


    // Je sais pas si cette linge est encore utile
    // document.querySelector("[value=" + language + "]").selected = true;
    handleSize();

}

function firstVisitCheck() {
    if (document.cookie.includes("firstVisit=true") || localStorage.getItem("visitedBefore")) {
        // L'utilisateur a déjà visité le site
        console.log("L'utilisateur a déjà visité le site.");
        // On ne fait rien
    } else {
        console.log("L'utilisateur n'a jamais visité le site. --> show tuto");
        // on affiche le tuto
        displayHideID(document.getElementById("tutorial-icon"), 'tutorial')
    }

    // Créer le cookie avec une date d'expiration d'une année
    document.cookie = "firstVisit=true; expires=" + new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    // Enregistrer l'information de la première visite dans le stockage local
    localStorage.setItem("visitedBefore", "true");
}

window.onload = function () {
    initPage();
    firstVisitCheck();

    dropDownListener();

};

function defaultValueRange(element) {
    return Math.round((element.max < element.min) ? element.min : Number(element.min) + ((element.max - element.min) / 2))
}

/**
 * Function to make appear / desapppear the data viewer div
 */
function showHideDataViewer() {
    let curve = document.getElementById("curve");

    // hasChildren ne marche pas -> renvoie toujours true
    if (window.innerWidth < 900 && document.querySelector(".tab__content:last-child").children.length == 0) {

        curve.remove();
        document.querySelector(".tab__content:last-child").appendChild(curve);

    }
    if (window.innerWidth >= 900 && document.querySelector(".tab__content:last-child").children.length != 0) {
        // graph.remove();
        // document.getElementById("controlPanel").appendChild(graph);
        curve.remove();
        document.getElementById("dataViewer").appendChild(curve);
        document.getElementById("tab1").checked = true;
    }

}
let previousOrientation;

function getOrientation() {
    return window.matchMedia("(orientation: landscape)").matches ? 'landscape' : 'portrait';
}

function handleSize() {
    const currentOrientation = getOrientation();

    // showHideDataViewer();

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

    if (!draw) { // si le chemin est tracé
        if (previousOrientation != currentOrientation && window.innerWidth < 900) { // et sur smartphone

            // l'orienté en fonction de la rotation
            playPanel.style.transformOrigin = playGround.height / 2 + "px " + playGround.height / 2 + "px";
            if (window.innerWidth < window.innerHeight) {

                playPanel.style.rotate = orientationDrawVertical ? "0deg" : "90deg";
            }
            else {
                playPanel.style.rotate = orientationDrawVertical ? "90deg" : "0deg";
            }
        }
    }
    else {
        // Resize le canvas pour qu'il prenne toute la place
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

    previousOrientation = currentOrientation;
}

window.addEventListener("resize", () => {

    handleSize();

});

// évite d'afficher 1 millipns de path qaund différence minime
let previousPathLength = Infinity;
let deltaPathLength = Infinity;
const DELTA_MIN = 0.002;

/**
 * 
 * @param {Ant} firstAnt firstAnt ant of the queue
 * @param {DrawingApp} d The curb 
 * @param {number} firstX coord of thestart of  path 
 * @param {number} firstY coord of thestart of  path
 */
function startAnts() {

    if (shouldReset) {
        resetGame();
    }
    else {
        //create an ant if none are left
        if (futurAnts.length == 0) {

            futurAnts.push(new DrawingAnt('./img/insect/RedAnt.png', 30, 30, true));
            futurAnts[futurAnts.length - 1].move(firstX, firstY);
            document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);

        }
        //While the first ant is still mooving
        if (d.clickX.length > 0) {
            if (d.clickX.length == 1) {
                delayFirst();
                //change the first ant in food at the end and add the lenght of its path
                if (!(Math.abs(firstAnt.x - d.clickX[0]) > 1 && Math.abs(firstAnt.y - d.clickY[0]) > 1)) {
                    d.removeFirstOne();
                    // firstAnt.img.src = './assets/strawberry.png';
                    firstAnt.img.src = './img/fraise_trans.png';
                    firstAnt.img.style.width = 80 + 'px';
                    firstAnt.img.style.height = 80 + 'px';
                    firstAnt.img.style.transform = 'translateX(' + -50 + '%) translateY(' + -50 + '%) rotate(' + (0) + 'deg) ';
                    updateSample(firstAnt.distance);

                    // évite d'afficher 1 millipns de path qaund différence minime
                    deltaPathLength = previousPathLength - firstAnt.distance;

                }
            }
            else {
                delayFirst();
                if (!(Math.abs(firstAnt.x - d.clickX[0]) > 1 && Math.abs(firstAnt.y - d.clickY[0]) > 1)) {
                    d.removeFirstOne();
                }
            }
            //Once the first ant stopped, run forever
        }
        else {
            //new first follow the never changing firstAnt with special function with no slow
            futurAnts[0].followEnd(firstAnt);
            //add a new ant every time the last one is farther than 'spacingAnt'
            if (Math.sqrt((futurAnts[futurAnts.length - 1].x - firstX) * (futurAnts[futurAnts.length - 1].x - firstX) + (futurAnts[futurAnts.length - 1].y - firstY) * (futurAnts[futurAnts.length - 1].y - firstY)) > spacingAnt) {
                if (compter == drawingGap) {
                    if (pathColorRedValue > 0) {
                        pathColorBlueValue = Math.min(255, pathColorBlueValue + 45);
                    }
                    else {
                        pathColorBlueValue = Math.max(0, pathColorBlueValue - 45);
                        pathColorGreenValue = Math.min(255, pathColorGreenValue + 45);
                    }
                    pathColorRedValue = Math.max(0, pathColorRedValue - 45);

                    // compter = 2;
                    drawingGap = Math.round(drawingGap * 2 - drawingGap / 2);


                    // if(drawAllPathOn){
                    if (drawAllPathOn) {
                        // if (document.getElementById('drawMain').checked) {
                        futurAnts.push(new DrawingAnt('./img/insect/RedAnt.png', 30, 30, true));
                    }
                    else {
                        futurAnts.push(new DrawingAnt('./img/insect/RedAnt.png', 30, 30, false));
                    }
                    futurAnts[futurAnts.length - 1].move(firstX, firstY);
                    document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
                }
                else {
                    futurAnts.push(new DrawingAnt('./img/insect/ant.png', 30, 30, false));
                    futurAnts[futurAnts.length - 1].move(firstX, firstY);
                    document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
                }
                compter++;
            }
            //if the first reached the end, add its distance to the curve then delete it from the array and the html
            if (futurAnts[0].x == firstAnt.x && futurAnts[0].y == firstAnt.y) {
                updateSample(futurAnts[0].distance);
                document.getElementById("playPanel").removeChild(futurAnts.shift().img);

                // évite d'afficher 1 millipns de path qaund différence minime
                // le undef est au cas où l'utilisteur créé un chmin si court que pas de futur ant


                deltaPathLength = previousPathLength - ((futurAnts[0] == undefined) ? 0 : futurAnts[0].distance);

            }
            //move all the other ants, from the closest to the farest
            for (let i_6 = 1; i_6 < futurAnts.length; i_6++) {
                futurAnts[i_6].follow(futurAnts[i_6 - 1]);
            }
        }
        //repeat the function
        if (!isGameStopped) {
            // setTimeout 0s permet de placer la fonction à la fin de la pile d'appel du navigateur. ou un truc comme ça
            setTimeout(startAnts, 0);
        }
    }


}

function delayFirst() {
    //follow next point on the line
    firstAnt.followN(d.clickX[0], d.clickY[0]);
    //create a second ant to avoid bugs
    if (futurAnts.length == 0) {
        futurAnts.push(new DrawingAnt('./img/insect/RedAnt.png', 30, 30, true));
        futurAnts[futurAnts.length - 1].move(firstX, firstY);
        document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
        //create new ants
    }
    else if (Math.sqrt((futurAnts[futurAnts.length - 1].x - firstX) * (futurAnts[futurAnts.length - 1].x - firstX) + (futurAnts[futurAnts.length - 1].y - firstY) * (futurAnts[futurAnts.length - 1].y - firstY)) > spacingAnt) {
        if (compter == drawingGap) {
            if (pathColorRedValue > 0) {
                pathColorBlueValue = Math.min(255, pathColorBlueValue + 45);
            }
            else {
                pathColorBlueValue = Math.max(0, pathColorBlueValue - 45);
                pathColorGreenValue = Math.min(255, pathColorGreenValue + 45);
            }
            pathColorRedValue = Math.max(0, pathColorRedValue - 45);

            // compter = 0;
            // On augmente le drawing spacingAnt expodentiellement pour pas avoir 1 millions de chemins quand les tracets sont quasi identiques
            drawingGap = Math.round(drawingGap * 2 - drawingGap / 2);

            // if(drawAllPathOn){
            // if (drawAllPathOn && (deltaPathLength > DELTA_MIN || deltaPathLength < 0)) {
            if (drawAllPathOn) {
                // if (document.getElementById('drawMain').checked) {
                futurAnts.push(new DrawingAnt('./img/insect/RedAnt.png', 30, 30, true));
            }
            else {
                futurAnts.push(new DrawingAnt('./img/insect/RedAnt.png', 30, 30, false));
            }
            futurAnts[futurAnts.length - 1].move(firstX, firstY);
            document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
        }
        else {
            futurAnts.push(new DrawingAnt('./img/insect/ant.png', 30, 30, false));
            futurAnts[futurAnts.length - 1].move(firstX, firstY);
            document.getElementById("playPanel").appendChild(futurAnts[futurAnts.length - 1].img);
        }
        compter++;
    }
    //make other ants follow the first
    futurAnts[0].follow(firstAnt);
    for (let i_7 = 1; i_7 < futurAnts.length; i_7++) {
        futurAnts[i_7].follow(futurAnts[i_7 - 1]);
    }
}

// TODO : found a file to place this function
/**
 * 
 * @param {HTMLElement} icon icon qui a été cliquée
 * @param {string} id id de l'élément à afficher / cacher
 * Bricolage pour éviter du css et par flemme de transformer les images en checkboxs
 */
function displayHideID(icon, id) {
    console.log("displayHideID", id);
    let elt = document.getElementById(id);
    if (elt.style.display == 'block') {
        elt.style.display = 'none';
        icon.style.backgroundColor = 'transparent';
    }
    else {
        elt.style.display = 'block';
        icon.style.backgroundColor = 'rgb(221, 221, 221)';
    }
}


// attention stratégie déguelasse mais flemme de reprendre son code de zéro
let shouldReset = false;

function resetGame() {


    shouldReset = false;

    let downloadGif = document.getElementById("download-gif");
    downloadGif.style.cursor = "not-allowed";
    downloadGif.style.filter = "blur(2px)";
    downloadGif.alt = TRANSLATE.alertGenerateGIF.innerText[language];
    downloadGif.title = TRANSLATE.alertGenerateGIF.innerText[language];

    let dataViewer = document.getElementById("dataViewer");
    let curve = document.getElementById("curve");
    // suppr la curve
    dataViewer.removeChild(curve);
    // recréer la curve
    curve = document.createElement("canvas");
    curve.id = "curve";
    dataViewer.appendChild(curve);


    // je sais pas pourquoi l'ancien canvas concerve les anciens traits --> donc on le suppr
    // TODO : code déguelasse à refaire



    let oldPlayPanel = document.getElementById("playPanel");
    oldPlayPanel.style = null;

        // je sais pas pourquoi mais parfois, l'ancien canvas concerve les anciens traits --> donc on le suppr
    let oldPlayGround = document.getElementById("playGround");
    oldPlayGround.remove();
    // recréer le canvas
    let playGround = document.createElement("canvas");
    playGround.id = "playGround";
    playGround.width = window.innerWidth;
    playGround.height = window.innerHeight;
    oldPlayPanel.appendChild(playGround);




    // Set to null to make sure the old object is deleted
    firstAnt = null;
    firstAnt = new Ant('./img/insect/ant.png', 30, 30);

    // suppr all old ants
    for (let i = 0; i < futurAnts.length; i++) {
        futurAnts[i].img.remove();
    }
    draw = true;
    d.clearCanvas();
    d = null;
    // suppr all old data
    clearSample();
    drawingGap = 4;
    compter = 2;
    // suppr all old canvas
    for (let i = 0; i < canvasTab.length; i++) {
        canvasTab[i].remove();
    }
    canvasTab = new Array();
    
    isGameStopped = false;
    firstX = null;
    firstY = null;

    pathColorRedValue = 255;
    pathColorBlueValue = 0;
    pathColorGreenValue = 0;

    // Set to null to make sure the old object is deleted
    saveFirstDrawApp = null;
    saveFirstDrawApp = Object();

    orientationDrawVertical = null;

    previousOrientation = getOrientation();
    previousPathLength = Infinity;
    deltaPathLength = Infinity;

    // remove all picture of the playPanel
    let imgTab = document.querySelectorAll("#playPanel img");
    imgTab.forEach(img => {
        img.remove();
    });


    isGameStopped = false;
    document.getElementById('stopButton').innerText = TRANSLATE.stopButton.innerText[language];

    var pathSelect = document.getElementById('pathDrawing');
    pathSelect.value = 0;
    pathSelect.max = 0;

    initGame();

    // BEAUCOUP PLUS SIMPLE ET SÛR D'EVITER LES BUGs : resetDraw();
    

}