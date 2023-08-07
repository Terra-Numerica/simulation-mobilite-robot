
function dropDownListener(){

// Get the dropdown elements
const backgroundPickerDiv = document.getElementById('background-picker-div');
const langPicker = document.getElementById('lang-picker');

// Add touch event listeners to the icon elements
document.getElementById('icon-background-picker').addEventListener('touchend', () => toggleDropdown(backgroundPickerDiv));
document.getElementById('icon-lang-picker').addEventListener('touchend', () => toggleDropdown(langPicker));


// Add mouseover event listeners to the icon elements
document.getElementById('background-picker-div').addEventListener('mouseenter', () => toggleDropdown(backgroundPickerDiv));
document.getElementById('lang-picker').addEventListener('mouseenter', () => toggleDropdown(langPicker));

// Add mouseover event listeners to the icon elements
document.getElementById('background-picker-div').addEventListener('mouseleave', () => backgroundPickerDiv.classList.remove('open'));
document.getElementById('lang-picker').addEventListener('mouseleave', () =>langPicker.classList.remove('open'));



// Add change event listeners to the language and background inputs
const langInputs = document.querySelectorAll('input[name="line-lang-picker"]');
const backgroundInputs = document.querySelectorAll('input[name="line-background-picker"]');

langInputs.forEach((input) => {
  input.addEventListener('click', () => {
    langPicker.classList.remove('open');
  });
});

backgroundInputs.forEach((input) => {
  input.addEventListener('click', () => {
    backgroundPickerDiv.classList.remove('open');
  });
});

// Close dropdowns when clicking outside them
window.addEventListener('click', (event) => {
  if (!backgroundPickerDiv.contains(event.target)) {
    backgroundPickerDiv.classList.remove('open');
  }
  if (!langPicker.contains(event.target)) {
    langPicker.classList.remove('open');
  }
});

function toggleDropdown(dropdown) {
  dropdown.classList.toggle('open');
}



}





// // On définit une fonction pour ajouter la classe "hovered" lorsqu'un élément est survolé
// function addHoverClass(event) {
//     const target = event.target;
//     target.classList.add("hovered");
// }

// // On définit une fonction pour retirer la classe "hovered" lorsque le pointeur quitte un élément
// function removeHoverClass(event) {
//     const target = event.target;
//     target.classList.remove("hovered");
// }

// // On ajoute les événements "mouseenter" et "mouseleave" à tous les éléments ayant la classe "dropdown-square"
// const dropdownSquares = document.querySelectorAll(".dropdown-square");
// dropdownSquares.forEach((dropdownSquare) => {
//     dropdownSquare.addEventListener("mouseenter", addHoverClass);
//     dropdownSquare.addEventListener("mouseleave", removeHoverClass);
// });

// // On ajoute les événements "mouseenter" et "mouseleave" à l'élément ayant l'id "background-picker-div"
// const backgroundPicker = document.getElementById("background-picker-div");
// backgroundPicker.addEventListener("mouseenter", function () {
//     this.style.height = `calc(var(--nbBGChoice) * var(--iconHeight))`;
//     this.style.minHeight = `calc(var(--nbBGChoice) * var(--minIconHeight))`;
// });
// backgroundPicker.addEventListener("mouseleave", function () {
//     this.style.height = `var(--iconHeight)`;
//     this.style.minHeight = `var(--minIconHeight)`;
// });

// // On ajoute les événements "mouseenter" et "mouseleave" à l'élément ayant l'id "lang-picker"
// const langPicker = document.getElementById("lang-picker");
// langPicker.addEventListener("mouseenter", function () {
//     this.style.height = `calc(var(--nbLangChoice) * var(--iconHeight))`;
//     this.style.minHeight = `calc(var(--nbLangChoice) * var(--minIconHeight))`;
// });
// langPicker.addEventListener("mouseleave", function () {
//     this.style.height = `var(--iconHeight)`;
//     this.style.minHeight = `var(--minIconHeight)`;
// });

// // On récupère tous les éléments input ayant la classe "dropdown-square"
// const dropdownSquareInputs = document.querySelectorAll(".dropdown-square input");

// // On ajoute un événement "click" à chaque élément input
// dropdownSquareInputs.forEach((input) => {
//     input.addEventListener("click", function () {
//         // On récupère le label associé à l'input cliqué
//         const label = document.querySelector(`label[for="${this.id}"]`);
//         if (this.checked) {
//             // Si l'input est coché, on ajoute la classe "hovered" pour que le label soit visible
//             label.classList.add("hovered");
//         } else {
//             // Sinon, on retire la classe "hovered" pour que le label soit caché
//             label.classList.remove("hovered");
//         }
//     });
// });
