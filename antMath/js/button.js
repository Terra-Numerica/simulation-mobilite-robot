

// // Affiche le texte d'information quand boutton cliqué
// function displayTexte(button, id) {
//     let element = document.getElementById(id);



//     if (element.style.display == "block") {
//         // Cache le texte
//         element.style.display = "none";
//     }
//     else {
//         // Cache les autres textes
//         let textButtons = document.getElementsByClassName("displayTexteDiv");

//         for (let i = 0; i < textButtons.length; i++) {
//             textButtons[i].style.display = "none";
//         }
//         // Affiche texte
//         element.style.display = "block";
//     }
// }

/**
 * Hide / Show the display control panel
 */
function displayControlPanel() {
    let controlPanel = document.getElementById("controlPanel");

    controlPanel.style.display = (controlPanel.style.display == "flex") ? "none" : "flex";
}



