window.addEventListener("keydown", function (event) {
    console.log(event);
    // if (event.defaultPrevented) {
    //   return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
    // }

    let speedInput = document.getElementById('antSpeed');
    let spaceInput = document.getElementById('antSpacing');
  
    switch (event.key) {
      // case "ArrowDown":
      //   speedInput.value--;
      //   changeAntSpeed(speedInput);
      //   break;

      // case "ArrowUp":
      //   speedInput.value++;
      //   changeAntSpeed(speedInput); 
        
      //   break;
      // case "ArrowLeft":
      //   spaceInput.value-=30;
      //   changeAntSpacing(spaceInput);
      //   break;
      // case "ArrowRight":
      //   spaceInput.value+=30;
      //   changeAntSpacing(spaceInput);
      //   break;
      case "Enter":
        // Faire quelque chose pour les touches "enter" ou "return" pressées.
        break;
      case " ":
        console.log("space");
        pauseDraw();
        // Faire quelque chose pour la touche "esc" pressée.
        break;
      default:
        return; // Quitter lorsque cela ne gère pas l'événement touche.
    }
  
    // // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
    // event.preventDefault();
  }, true);