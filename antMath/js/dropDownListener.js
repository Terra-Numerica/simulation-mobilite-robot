function dropDownListener1() {
  const backgroundPickerDiv = document.getElementById('background-picker-div');
  const langPicker = document.getElementById('lang-picker');

  document.getElementById('icon-background-picker').addEventListener('touchend', () => {
    console.log('icon-background-picker touchend: Opening backgroundPickerDiv');
    toggleDropdown(backgroundPickerDiv);
  });

  document.getElementById('icon-lang-picker').addEventListener('touchend', () => {
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

  // whent touchend on icon-background-picker, toggle backgroundPickerDiv and close langPicker
  document.getElementById('icon-background-picker').addEventListener('touchend', () => {
    console.log('toggle backgroundPickerDiv and close langPicker');
    toggleDropdown(backgroundPickerDiv);
    langPicker.classList.remove('open');
  });

  // whent touchend on icon-lang-picker, toggle langPicker and close backgroundPickerDiv
  document.getElementById('icon-lang-picker').addEventListener('touchend', () => {
    console.log('toggle langPicker and close backgroundPickerDiv');
    toggleDropdown(langPicker);
    backgroundPickerDiv.classList.remove('open');
  });

  // when mouseenter on background-picker-div, open backgroundPickerDiv and close langPicker
  document.getElementById('background-picker-div').addEventListener('mouseenter', () => {
    console.log('open backgroundPickerDiv and close langPicker');
    toggleDropdown(backgroundPickerDiv);
    langPicker.classList.remove('open');
  } );

  // when mouseenter on lang-picker, open langPicker and close backgroundPickerDiv
  document.getElementById('lang-picker').addEventListener('mouseenter', () => {
    console.log('open langPicker and close backgroundPickerDiv');
    toggleDropdown(langPicker);
    backgroundPickerDiv.classList.remove('open');
  }
  );

  // when mouseleave on background-picker-div, close backgroundPickerDiv
  document.getElementById('background-picker-div').addEventListener('mouseleave', (event) => {
    console.log('close backgroundPickerDiv');
    // event.stopPropagation();
    backgroundPickerDiv.classList.remove('open');
  }
  );

  // when mouseleave on lang-picker, close langPicker
  document.getElementById('lang-picker').addEventListener('mouseleave', (event) => {
    console.log('lang-picker mouseleave: Closing langPicker');
    // event.stopPropagation();
    langPicker.classList.remove('open');
  }
  );

  // when click on lang-picker input, close langPicker
  const langInputs = document.querySelectorAll('input[name="line-lang-picker"]');
  langInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      console.log('line-lang-picker input click: Closing langPicker');
      // event.stopPropagation();
      langPicker.classList.remove('open');
    });
  }

  );

  // when click on background-picker-div input, close backgroundPickerDiv
  const backgroundInputs = document.querySelectorAll('input[name="line-background-picker"]');
  backgroundInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
      console.log('line-background-picker input click: Closing backgroundPickerDiv');
      // event.stopPropagation();
      backgroundPickerDiv.classList.remove('open');
    });
  } );

  // when click on window, close dropdowns
  // useless because mouseleave is enough
  // window.addEventListener('click', (event) => {
  //   console.log('window click: Closing dropdowns');
  //   if (!backgroundPickerDiv.contains(event.target)) {
  //     backgroundPickerDiv.classList.remove('open');
  //   }
  //   if (!langPicker.contains(event.target)) {
  //     langPicker.classList.remove('open');
  //   }
  // } );

  // when touchend on window, close dropdowns
  // remove to avoid double event
  // window.addEventListener('touchend', (event) => {
  //   console.log('window touchend: Closing dropdowns');
  //   if (!backgroundPickerDiv.contains(event.target)) {
  //     backgroundPickerDiv.classList.remove('open');
  //   }
  //   if (!langPicker.contains(event.target)) {
  //     langPicker.classList.remove('open');
  //   }
  // }
  // );

}


function toggleDropdown(dropdown) {
  dropdown.classList.toggle('open');
}