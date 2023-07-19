window.addEventListener("keydown", function (event) {
    console.log(event);

    let speedInput = document.getElementById('antSpeed');
    let spaceInput = document.getElementById('antSpacing');
  
    switch (event.key) {

      case " ":
        console.log("space");
        pauseDraw();
        // Faire quelque chose pour la touche "esc" pressée.
        break;
      default:
        return; // Quitter lorsque cela ne gère pas l'événement touche.
    }
  
  }, true);