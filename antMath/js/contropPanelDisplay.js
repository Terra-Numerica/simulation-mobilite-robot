

function displayHideID(id){
    const lst = ["tutorial", "information", "more"];
    if(lst.includes(id)){
        // caché tous les autres
        lst.forEach(eltID =>{
            if(eltID != id){
                let elt = document.getElementById(eltID);
                elt.style.display = 'none';
            }
            }
        );
    }

    console.log("displayHideID", id);
    let elt = document.getElementById(id);
    elt.style.display = (elt.style.display == 'flex') ? 'none' : 'flex';

}





// Fonction pour activer ou désactiver le mode plein écran
function toggleFullscreen() {
    if (!document.fullscreenElement) {
      // Activer le mode plein écran
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // Désactiver le mode plein écran
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }