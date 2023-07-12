window.addEventListener("keydown", function (event) {
    console.log(event);
    if (event.defaultPrevented) {
      return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
    }
    
  
    switch (event.key) {
    //   case "ArrowDown":
    //     // Faire quelque chose pour la touche "flèche vers le bas" pressée.
    //     break;
    //   case "ArrowUp":
    //     // Faire quelque chose pour la touche "up arrow" pressée.
    //     break;
    //   case "ArrowLeft":
    //     // Faire quelque chose pour la touche "left arrow" pressée.
    //     break;
    //   case "ArrowRight":
    //     // Faire quelque chose pour la touche "right arrow" pressée.
    //     break;
    //   case "Enter":
    //     // Faire quelque chose pour les touches "enter" ou "return" pressées.
    //     break;
      case " ":
        console.log("space");
        pauseDraw();
        // Faire quelque chose pour la touche "esc" pressée.
        break;
      default:
        return; // Quitter lorsque cela ne gère pas l'événement touche.
    }
  
    // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
    event.preventDefault();
  }, true);