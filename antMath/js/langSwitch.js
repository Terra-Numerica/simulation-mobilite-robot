
function switchLang(lang){

    let lst = document.querySelectorAll("[lang]");

    lst.forEach(elt => {
        if(elt.id =="curve"){
            chart.data.datasets[0].label = TRAD.curve.title[lang];
            chart.options.scales.x.title.text = TRAD.curve.axeX[lang];
            chart.options.scales.y.title.text = TRAD.curve.axeY[lang];
            chart.update();
        }
        else{
            elt.innerText =  TRAD[elt.id][lang];
            elt.lang = lang;
        }
    });
}

const TRAD =  {
    "controlPanelTitle": {
        "en":"Control Panel",
        "fr":"Panneau de Contrôle"
    },
    "antSpeedLabel":{
        "en":"Ant's Speed",
        "fr":"Vitesse des Fourmis"
    },
    "antSpacingLabel":{
        "en":"Ant's Spacing",
        "fr":"Espacement des Fourmis"
    },
    "antPathLabel":{
        "en":"Ant's path Selected",
        "fr":"Fourmi sélectionnée"
    },
    "stopButton":{
        "en":"Stop",
        "fr":"Arrêt"
    },
    "startButton":{
        "en":"Start",
        "fr":"Départ"
    },
    "resetButton":{
        "en":"Reset",
        "fr":"Réinitialisation"
    },
    "allPathButton":{
        "en":"All Path",
        "fr":"Tous"
    },
    "curve":{
        "title":{
            "en":"Path's length of each ant",
            "fr":"Longueur du chemin de chaque fourmi"
        },
        "axeX":{
            "en":"Ant",
            "fr":"Fourmis"
        },
        "axeY":{
            "en":"Path's length",
            "fr" : "Longueur du Chemin (UA)"
        }
    },
    "tutorialButton":{
        "en":"Tutorial",
        "fr":"Tutoriel"
    },
    "informationButton":{
        "en":"Information",
        "fr":"Information"
    },
    "moreButton":{
        "en" : "More",
        "fr" : "Plus"
    }
}
;
