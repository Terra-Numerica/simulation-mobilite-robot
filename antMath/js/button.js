

// Affiche le texte d'information quand boutton cliqué
function displayTexte(button, id) {
    let element = document.getElementById(id);



    if (element.style.display == "block") {
        // Cache le texte
        element.style.display = "none";
    }
    else {
        // Cache les autres textes
        let textButtons = document.getElementsByClassName("displayTexteDiv");

        for (let i = 0; i < textButtons.length; i++) {
            textButtons[i].style.display = "none";
        }
        // Affiche texte
        element.style.display = "block";
    }
}

/**
 * Hide / Show the display control panel
 */
function displayControlPanel() {
    let controlPanel = document.getElementById("controlPanel");

    controlPanel.style.display = (controlPanel.style.display == "block") ? "none" : "block";
}

window.addEventListener("resize", () => {
    // this listener has been made to replaced the CSS that does'not work
    console.log("resize")
    if (window.innerWidth >= 900) {
        let controlPanel = document.getElementById("controlPanel");
        if (controlPanel.style.display != "block") {
            controlPanel.style.display = "block";
        }
    }

    let playGround = document.getElementById("playGround");
    let playPanel = document.getElementById("playPanel");

    // console.log("playPanel.offsetWidth", playPanel.offsetWidth);

    // console.log("Before");
    // console.log("playGround.width", playGround.width)

    playGround.width = playPanel.offsetWidth;
    playGround.height = playPanel.offsetHeight;

    // console.log("After")
    // console.log("playGround.width", playGround.width)

});