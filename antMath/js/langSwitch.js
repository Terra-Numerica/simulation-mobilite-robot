
// Take the language from the navigator
let lang_support = ["en", "fr","zh","hi","es","ar","bn","ru"];

// Use the language of the navigator
var language = window.navigator.userLanguage || window.navigator.language;
// Remove the country code
language = language.split("-")[0];

if (!lang_support.includes(language)) {
    language = "en";
}


/**
 * Switch the language of the page to the one given in parameter
 * @param {HTMLElement} elt 
 */
function updateLanguage(elt){
    language = elt.value;
    switchLang2();



    // moveInputToFirstPosition(elt);



    // console.log("Après le choix, reset le style");
    // Rappel : le style est défini dans le fichier css
    // height:var(--iconHeight); 
    // min-width:var(--minIconHeight);
    // min-height: var(--minIconHeight);

    // On reset le style de la division
    // let div = document.getElementById("lang-picker");
    // console.log("height : " + div.style.height);
    // div.style.height = "var(--iconHeight)";
    // console.log("height : " + div.style.height);
    // div.style.minWidth = "var(--minIconHeight)";
    // div.style.minHeight = "var(--minIconHeight)";




}

console.log("Language : " + language);


/**
 * Include all html file in div with the attribute includeHTML
 */
function includeAllHTML(){
    console.log("includeAllHTML");
    let lst = document.querySelectorAll("[includeHTML]");
    lst.forEach(elt => {
        includeHTML(elt);
    })

}

/**
 * Include the html file in the div given in parameter
 * @param {HTMLElement} elmnt 
 */
function includeHTML(elmnt) {

    // suppr each child
    elmnt.childNodes.forEach(child => {
        elmnt.removeChild(child);
    });

    let doc_lang = (language == "en" || language == "fr") ? language : "en";

    file = "html/" + doc_lang + "_" +  elmnt.getAttribute( "includeHTML");
    if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
    }
}







function switchLang2() {
    if (!lang_support.includes(language)) {
        language = "en";
    }

    console.log("Switching to " + language);
    document.querySelector("html").lang = language;

    let lstTitle = document.querySelectorAll("[title]");
    let lstAlt = document.querySelectorAll("[alt]");
    let lstInnerText = document.querySelectorAll("[translate]");

    // Translate the title
    lstTitle.forEach(elt => {
        // if label : same translation of the input associate to the input
        // if id start with choiceLang, do not translate --> keep leasible for peapole
        if (elt.tagName == "LABEL") {
            let tagID = elt.htmlFor;
            if (!tagID.startsWith("lang-choice-")){
                elt.title = TRANSLATE[elt.htmlFor].title[language];
            }
        }
        else if(elt.id == "download-gif"){
            elt.title = (allowDownload) ? TRANSLATE[elt.id].title[language] : TRANSLATE.alertGenerateGIF.innerText[language];
        }
        else {
            elt.title = TRANSLATE[elt.id].title[language];
        }
        
    });
    // Translate the alt
    lstAlt.forEach(elt => {
        if(elt.id == "download-gif"){
            elt.title = (allowDownload) ? TRANSLATE[elt.id].title[language] : TRANSLATE.alertGenerateGIF.innerText[language];
        }
        else{
            elt.alt = TRANSLATE[elt.id].alt[language];
        }
        
    });
    // Translate the innerText
    lstInnerText.forEach(elt => {
        elt.innerText = TRANSLATE[elt.id].innerText[language];
    });

    // Translate the chart
    chart.data.datasets[0].label = TRANSLATE.curve.title[language];
    chart.options.scales.x.title.text = TRANSLATE.curve.axeX[language];
    chart.options.scales.y.title.text = TRANSLATE.curve.axeY[language];
    chart.update();

    includeAllHTML();
    
}

const TRANSLATE = {

    "alertPathTooShort": {
        "innerText": {
            "en": "Please draw a longer path",
            "fr": "Veuillez dessiner un chemin plus long",
            "zh": "请绘制更长的路径",
            "hi": "कृपया एक लंबा पथ बनाएं",
            "es": "Por favor, dibuja un camino más largo",
            "ar": "يرجى رسم مسار أطول",
            "bn": "একটি লম্বা পথ আঁকুন দয়া করে",
            "ru": "Пожалуйста, нарисуйте более длинный путь"
        }
    },

    "alertGenerateGIF": {
        "innerText": {
            "en": "Please draw a path before generate a GIF",
            "fr": "Veuillez dessiner un chemin avant de générer un GIF",
            "zh": "在生成GIF之前，请绘制路径",
            "hi": "GIF उत्पन्न करने से पहले कृपया एक पथ बनाएं",
            "es": "Por favor, dibuja un camino antes de generar un GIF",
            "ar": "يرجى رسم مسار قبل إنشاء ملف GIF",
            "bn": "GIF তৈরি করার আগে দয়া করে একটি পথ আঁকুন",
            "ru": "Пожалуйста, нарисуйте путь перед созданием GIF"
        }
    },

    "icon-lang-picker": {
        "title": {
          "en": "Language Picker",
          "fr": "Sélection de la langue",
          "zh": "语言选择器",
          "hi": "भाषा चुनें",
          "es": "Selector de idioma",
          "ar": "اختيار اللغة",
          "bn": "ভাষা পিকার",
          "ru": "Выбор языка"
        }
      },


    "background-picker": {
        "title": {
            "en": "Background picker",
            "fr": "Sélection de l'arrière-plan",
            "zh": "背景选择器",
            "hi": "पृष्ठभूमि चुनें",
            "es": "Selector de fondo",
            "ar": "اختيار الخلفية",
            "bn": "ব্যাকগ্রাউন্ড পিকার",
            "ru": "Выбор фона"
        }
    },
    "choiceBackgroundPersonalized": {
        "title": {
            "en": "Personalized",
            "fr": "Personnalisé",
            "zh": "个性化",
            "hi": "व्यक्तिगत",
            "es": "Personalizado",
            "ar": "شخصي",
            "bn": "ব্যক্তিগত",
            "ru": "Персонализированный"
        }
    },
    "choiceBackgroundGrass": {
        "title": {
            "en": "Grass",
            "fr": "Herbe",
            "zh": "草地",
            "hi": "घास",
            "es": "Hierba",
            "ar": "عشب",
            "bn": "ঘাস",
            "ru": "Трава"
        }
    },
    "choiceBackgroundSand": {
        "title": {
            "en": "Sand",
            "fr": "Sable",
            "zh": "沙滩",
            "hi": "रेत",
            "es": "Arena",
            "ar": "رمل",
            "bn": "বালু",
            "ru": "Песок"
        }
    },
    "choiceBackgroundDirt": {
        "title": {
            "en": "Dirt",
            "fr": "Terre",
            "zh": "泥土",
            "hi": "मिट्टी",
            "es": "Tierra",
            "ar": "أتربة",
            "bn": "মাটি",
            "ru": "Грязь"
        }
    },
    "backgroundPickerPersonalized": {
        "title": {
            "en": "Personalized Background Picker",
            "fr": "Sélectionneur d'arrière-plan personnalisé",
            "zh": "个性化背景选择器",
            "hi": "व्यक्तिगत पृष्ठभूमि चयनकर्ता",
            "es": "Selector de fondo personalizado",
            "ar": "اختيار الخلفية الشخصي",
            "bn": "ব্যক্তিগত ব্যাকগ্রাউন্ড পিকার",
            "ru": "Персонализированный выбор фона"
        }
    },

    "download-gif": {
        "title": {
            "en": "Download GIF",
            "fr": "Télécharger le GIF",
            "zh": "下载GIF",
            "hi": "GIF डाउनलोड करें",
            "es": "Descargar GIF",
            "ar": "تحميل GIF",
            "bn": "GIF ডাউনলোড করুন",
            "ru": "Скачать GIF"
        },
        "alt": {
            "en": "Download GIF",
            "fr": "Télécharger le GIF",
            "zh": "下载GIF",
            "hi": "GIF डाउनलोड करें",
            "es": "Descargar GIF",
            "ar": "تحميل GIF",
            "bn": "GIF ডাউনলোড করুন",
            "ru": "Скачать GIF"
        }
    },
    "tutorial-icon": {
        "title": {
            "en": "Tutorial",
            "fr": "Tutoriel",
            "zh": "教程",
            "hi": "ट्यूटोरियल",
            "es": "Tutorial",
            "ar": "برنامج تعليمي",
            "bn": "টিউটোরিয়াল",
            "ru": "Учебник"
        },
        "alt": {
            "en": "Tutorial",
            "fr": "Tutoriel",
            "zh": "教程",
            "hi": "ट्यूटोरियल",
            "es": "Tutorial",
            "ar": "برنامج تعليمي",
            "bn": "টিউটোরিয়াল",
            "ru": "Учебник"
        }
    },
    "control-icon": {
        "title": {
            "en": "Control",
            "fr": "Contrôle",
            "zh": "控制",
            "hi": "नियंत्रण",
            "es": "Control",
            "ar": "مراقبة",
            "bn": "কন্ট্রোল",
            "ru": "Управление"
        },
        "alt": {
            "en": "Control",
            "fr": "Contrôle",
            "zh": "控制",
            "hi": "नियंत्रण",
            "es": "Control",
            "ar": "مراقبة",
            "bn": "কন্ট্রোল",
            "ru": "Управление"
        }
    },
    "curve-icon": {
        "title": {
            "en": "Curve",
            "fr": "Courbe",
            "zh": "曲线",
            "hi": "कर्व",
            "es": "Curva",
            "ar": "منحنى",
            "bn": "বৃত্তাকার",
            "ru": "Кривая"
        },
        "alt": {
            "en": "Curve",
            "fr": "Courbe",
            "zh": "曲线",
            "hi": "कर्व",
            "es": "Curva",
            "ar": "منحنى",
            "bn": "বৃত্তাকার",
            "ru": "Кривая"
        }
    },
    "documentation-icon": {
        "title": {
            "en": "Documentation",
            "fr": "Documentation",
            "zh": "文档",
            "hi": "दस्तावेज़ीकरण",
            "es": "Documentación",
            "ar": "توثيق",
            "bn": "ডকুমেন্টেশন",
            "ru": "Документация"
        },
        "alt": {
            "en": "Documentation",
            "fr": "Documentation",
            "zh": "文档",
            "hi": "दस्तावेज़ीकरण",
            "es": "Documentación",
            "ar": "توثيق",
            "bn": "ডকুমেন্টেশন",
            "ru": "Документация"
        }
    },

    "antSpeedLabel": {
        "innerText": {
            "en": "Ant Speed",
            "fr": "Vitesse des fourmis",
            "zh": "蚂蚁速度",
            "hi": "मच्छर की गति",
            "es": "Velocidad de la hormiga",
            "ar": "سرعة النملة",
            "bn": "পিপড়ির গতি",
            "ru": "Скорость муравья"
        }
    },
    "antSpacingLabel": {
        "innerText": {
            "en": "Ant Spacing",
            "fr": "Espacement des fourmis",
            "zh": "蚂蚁间距",
            "hi": "मच्छर के अंतराल",
            "es": "Espaciado de la hormiga",
            "ar": "تباعد النملة",
            "bn": "পিপড়ির স্পেসিং",
            "ru": "Интервал между муравьями"
        }
    },
    "antPathLabel": {
        "innerText": {
            "en": "Number of hidden paths",
            "fr": "Nombre de chemins cachés",
            "zh": "隐藏路径数",
            "hi": "छिपे हुए मार्गों की संख्या",
            "es": "Número de caminos ocultos",
            "ar": "عدد المسارات المخفية",
            "bn": "লুকানো পথের সংখ্যা",
            "ru": "Количество скрытых путей"
        }
    },
    
    "stopButton": {
        "innerText": {
            "en": "Stop",
            "fr": "Arrêter",
            "zh": "停止",
            "hi": "रोकें",
            "es": "Detener",
            "ar": "توقف",
            "bn": "থামো",
            "ru": "Стоп"
        }
    },

    "startButton":{
        "innerText": {
            "en":"Start",
            "fr":"Départ",
            "zh":"开始",
            "hi":"प्रारंभ",
            "es":"Comenzar",
            "ar":"بداية",
            "bn":"শুরু",
            "ru":"Начать"
        }
    },
    "resetButton": {
        "innerText": {
            "en": "Reset",
            "fr": "Réinitialiser",
            "zh": "重置",
            "hi": "रीसेट",
            "es": "Restablecer",
            "ar": "إعادة تعيين",
            "bn": "রিসেট",
            "ru": "Сброс"
        }
    },
    "allPathButton": {
        "innerText": {
            "en": "Show all path",
            "fr": "Afficher tous les chemins",
            "zh": "显示所有路径",
            "hi": "सभी पथ दिखाएं",
            "es": "Mostrar todos los caminos",
            "ar": "إظهار جميع المسارات",
            "bn": "সমস্ত পথ দেখাও",
            "ru": "Показать все пути"
        }
    },
    "curve": {
        "title": {
            "en": "Curve",
            "fr": "Courbe",
            "zh": "曲线",
            "hi": "कर्व",
            "es": "Curva",
            "ar": "منحنى",
            "bn": "বৃত্তাকার",
            "ru": "Кривая"
        },
        "axeX": {
            "en": "Iteration",
            "fr": "Itération",
            "zh": "迭代",
            "hi": "पद",
            "es": "Iteración",
            "ar": "تكرار",
            "bn": "পদ",
            "ru": "Итерация"
        },
        "axeY": {
            "en": "Path length",
            "fr": "Longueur du chemin",
            "zh": "路径长度",
            "hi": "पथ लंबाई",
            "es": "Longitud del camino",
            "ar": "طول المسار",
            "bn": "পথের দৈর্ঘ্য",
            "ru": "Длина пути"
        }
    }
};



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
        "en":"Show all path",
        "fr":"Affiché tous les chemins"
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
    },
    "alertPathTooShort":{
        "en" : "Path too short",
        "fr" : "Chemin trop court"
    }
}
;
