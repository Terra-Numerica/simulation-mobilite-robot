function dropDownListener1() {
  const backgroundPickerDiv = document.getElementById('background-picker-div');
  const langPicker = document.getElementById('lang-picker');

  document.getElementById('icon-background-picker').addEventListener('touchend', () => {
    console.log('icon-background-picker touchend: Opening backgroundPickerDiv');
    toggleDropdown(backgroundPickerDiv);
  });

  document.querySelector('#lang-picker>label').addEventListener('touchend', () => {
    console.log('icon-lang-picker touchend: Opening langPicker');
    toggleDropdown(langPicker);
  });

  document.getElementById('background-picker-div').addEventListener('mouseenter', () => {
    console.log('background-picker-div mouseenter: Opening backgroundPickerDiv');
    toggleDropdown(backgroundPickerDiv);
  });

  document.getElementById('lang-picker').addEventListener('mouseenter', () => {
    console.log('lang-picker mouseenter: Opening langPicker');
    toggleDropdown(langPicker);
  });

  document.getElementById('background-picker-div').addEventListener('mouseleave', (event) => {
    console.log('background-picker-div mouseleave: Closing backgroundPickerDiv');
    // event.stopPropagation();
    backgroundPickerDiv.classList.remove('open');
  });

  document.getElementById('lang-picker').addEventListener('mouseleave', (event) => {
    console.log('lang-picker mouseleave: Closing langPicker');
    // event.stopPropagation();
    langPicker.classList.remove('open');
  });

  const langInputs = document.querySelectorAll('input[name="line-lang-picker"]');
  const backgroundInputs = document.querySelectorAll('input[name="line-background-picker"]');

  langInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      console.log('line-lang-picker input click: Closing langPicker');
      // event.stopPropagation();
      langPicker.classList.remove('open');
    });
  });

  backgroundInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      console.log('line-background-picker input click: Closing backgroundPickerDiv');
      // event.stopPropagation();
      backgroundPickerDiv.classList.remove('open');
    });
  });

  // window.addEventListener('click', (event) => {
  //   console.log('window click: Closing dropdowns');
  //   if (!backgroundPickerDiv.contains(event.target)) {
  //     backgroundPickerDiv.classList.remove('open');
  //   }
  //   if (!langPicker.contains(event.target)) {
  //     langPicker.classList.remove('open');
  //   }
  // });

  // window.addEventListener('touchend', (event) => {
  //   console.log('window touchend: Closing dropdowns');
  //   if (!backgroundPickerDiv.contains(event.target)) {
  //     backgroundPickerDiv.classList.remove('open');
  //   }
  //   if (!langPicker.contains(event.target)) {
  //     langPicker.classList.remove('open');
  //   }
  // });

  
}


function dropDownListener(){
  const backgroundPickerDiv = document.getElementById('background-picker-div');
  const langPicker = document.getElementById('lang-picker');

  // whent touchend on icon-background-picker, open backgroundPickerDiv and close langPicker
  document.getElementById('icon-background-picker').addEventListener('touchend', (event) => {
    event.stopPropagation();
    console.log('toggle backgroundPickerDiv and close langPicker');
    toggleDropdown(backgroundPickerDiv);
    closeDropdown(langPicker);
  });

  // whent touchend on icon-lang-picker, open langPicker and close backgroundPickerDiv
  document.querySelector('#lang-picker>label').addEventListener('touchend', (event) => {
    event.stopPropagation();
    console.log('toggle langPicker and close backgroundPickerDiv');
    toggleDropdown(langPicker);
    closeDropdown(backgroundPickerDiv);
  });

  // when mouseenter on icon-background-picker, open backgroundPickerDiv and close langPicker
  backgroundPickerDiv.addEventListener('mouseenter', () => {
    console.log('open backgroundPickerDiv and close langPicker');
    openDropdown(backgroundPickerDiv);
    closeDropdown(langPicker);
  } );

  // when mouseenter on lang-picker, open langPicker and close backgroundPickerDiv
  langPicker.addEventListener('mouseenter', () => {
    console.log('open langPicker and close backgroundPickerDiv');
    openDropdown(langPicker);
    closeDropdown(backgroundPickerDiv);
  }
  );

  // when mouseleave on icon-background-picker, close backgroundPickerDiv
  backgroundPickerDiv.addEventListener('mouseleave', (event) => {
    console.log('close backgroundPickerDiv');
    // event.stopPropagation();
    closeDropdown(backgroundPickerDiv);
  }
  );

  // when mouseleave on lang-picker, close langPicker
  langPicker.addEventListener('mouseleave', (event) => {
    console.log('lang-picker mouseleave: Closing langPicker');
    // event.stopPropagation();
    closeDropdown(langPicker);
  }
  );

  // when click on lang-picker input, close langPicker (sauf 'icon-lang-picker (gérer au-dessus) )
  const langInputs = document.querySelectorAll('input[name="line-lang-picker"]:not(#icon-lang-picker)');
  langInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      console.log('line-lang-picker input click: Closing langPicker');
      // event.stopPropagation();
      closeDropdown(langPicker);
    });
  }

  );

  // when click on icon-background-picker input, close backgroundPickerDiv (sauf 'icon-background-picker' (gérer au-dessus) )
  const backgroundInputs = document.querySelectorAll('input[name="line-background-picker"]:not(#icon-background-picker)');
  backgroundInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      console.log('line-background-picker input click: Closing backgroundPickerDiv');
      // event.stopPropagation();
      closeDropdown(backgroundPickerDiv);
    });
  } );

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