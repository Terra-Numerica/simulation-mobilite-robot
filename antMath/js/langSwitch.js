// USe cookie / location to set the language

// Take the language from the navigator
var language = window.navigator.userLanguage || window.navigator.language;
// Remove the country code
language = language.split("-")[0];
console.log("Language : " + language);

function switchLang(lang){

    console.log("Switching to " + lang);

    let lst = document.querySelectorAll("[lang]");

    // lang accepted : en, fr, default : en
    if(lang != "en" && lang != "fr"){
        lang = "en";
    }

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
    "antSpeedLabel":{
        "en":"Ant Speed",
        "fr":"Vitesse des Fourmis"
    },
    "antSpacingLabel":{
        "en":"Ant Spacing",
        "fr":"Espacement des Fourmis"
    },
    "antPathLabel":{
        "en":"Ant path Selected",
        "fr":"Fourmi sélectionnée"
    },

    // TODO : traduire les labels
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
            "en":"Path length of each ant",
            "fr":"Longueur du chemin de chaque fourmi"
        },
        "axeX":{
            "en":"Ant",
            "fr":"Fourmis"
        },
        "axeY":{
            "en":"Path length",
            "fr" : "Longueur du Chemin (UA)"
        }
    },
    "tutorialTab":{
        "en":"Tutorial",
        "fr":"Tutoriel"
    },
    "informationTab":{
        "en":"Information",
        "fr":"Information"
    },
    "aboutTab":{
        "en" : "More",
        "fr" : "Plus"
    },
    "curveTab":{
        "en" : "Curve",
        "fr" : "Courbe"
    }
}
;
