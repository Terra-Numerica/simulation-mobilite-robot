
// Affiche le texte d'information quand boutton cliqué
function displayTexte(button, id){
    let element = document.getElementById(id);



    if(element.style.display == "block"){
        // Cache le texte
        element.style.display = "none";
        // Fais réapparaitre les autres bouttons
        // let textButtons = document.getElementsByClassName("textButton");
        // for (let i = 0; i < textButtons.length; i++) {
        //     textButtons[i].style.display = "block";
        // }
    }
    else {
        // Cache les autres textes
        let textButtons = document.getElementsByClassName("displayTexteDiv");
        
        for (let i = 0; i < textButtons.length; i++) {
            textButtons[i].style.display = "none";
        }
        // Affiche texte
        element.style.display = "block";
        
        


        // Cache les autres boutons
        // let textButtons = document.getElementsByClassName("textButton");
        // for (let i = 0; i < textButtons.length; i++) {
        //     if (textButtons[i] != button) {
        //         textButtons[i].style.display = "none";
        //     }
        // }
    }

} 