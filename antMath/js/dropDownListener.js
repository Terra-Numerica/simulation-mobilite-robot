
function dropDownListener() {
  // BACKGROUND PICKER

  const backgroundPickerIcon = document.getElementById('icon-background-picker');
  const backgroundPickerInputs = document.querySelectorAll('input[name="line-background-picker"]:not(#icon-background-picker)');
  const backgroundPickerDiv = document.getElementById('background-picker-div');

  backgroundPickerIcon.addEventListener('touchend', (event) => {
    event.stopPropagation();
    console.log('Background Picker Icon touchend: toggling backgroundPickerDiv');
    toggleDropdown(backgroundPickerDiv);
  });

  backgroundPickerIcon.addEventListener('mouseenter', (event) => {
    event.stopPropagation();
    console.log('Background Picker Icon mouseenter: opening backgroundPickerDiv');
    openDropdown(backgroundPickerDiv);
    console.log('Background Picker Icon mouseenter: closing langPicker');
    closeDropdown(langPicker);
  });

  backgroundPickerDiv.addEventListener('mouseleave', (event) => {
    event.stopPropagation();
    console.log('Background Picker Div mouseleave: closing backgroundPickerDiv');
    closeDropdown(backgroundPickerDiv);
  });

  backgroundPickerInputs.forEach((input) => {
    
    input.addEventListener('click', (event) => {
      event.stopPropagation();
      event.stopPropagation();
      console.log('Background Picker Input click: closing backgroundPickerDiv');
      closeDropdown(backgroundPickerDiv);
    });
  });

  // LANG PICKER

  const langPicker = document.getElementById('lang-picker');
  const langPickerInputs = document.querySelectorAll('input[name="line-lang-picker"]');

  langPickerInputs.forEach((input) => {
    input.addEventListener('touchend', (event) => {
      event.stopPropagation();
      console.log('Lang Picker Input touchend: toggling langPicker');
      toggleDropdown(langPicker);
    });
  });

  langPicker.addEventListener('mouseenter', (event) => {
    event.stopPropagation();
    console.log('Lang Picker mouseenter: opening langPicker');
    openDropdown(langPicker);
  });

  langPicker.addEventListener('mouseleave', (event) => {
    event.stopPropagation();
    console.log('Lang Picker mouseleave: closing langPicker');
    closeDropdown(langPicker);
  });

  langPickerInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('Lang Picker Input click: input = ', input);

      const parentDiv = input.closest('#lang-picker');
      const firstInputInParent = parentDiv.querySelector('input[name="line-lang-picker"]');

      if (input === firstInputInParent) {
        console.log('Lang Picker Input click: toggling langPicker');
        toggleDropdown(langPicker);
        console.log('Lang Picker Input click: langPicker class after toggle = ', langPicker.classList);
      } else {
        console.log('Lang Picker Input click: closing langPicker');
        closeDropdown(langPicker);
      }
    });
  });
}

  



function openDropdown(dropdown) {
  dropdown.classList.add('open');
}

function closeDropdown(dropdown) {
  dropdown.classList.remove('open');
}

function toggleDropdown(dropdown) {
  dropdown.classList.toggle('open');
}