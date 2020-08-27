export const toggleDropDown = (e, type = 'open') => {
  const wrapper = e.target.closest('.inputWithPrompt'),
    input = wrapper.firstChild,
    dropDown = input.nextElementSibling,
    backdrop = dropDown.nextElementSibling,
    types = ['open', 'close'];

  if (!types.includes(type)) {
    throw new Error('Тип передан не верно');
  }

  if (type === 'open') {
    input.classList.add('dropDownIsOpen');
    dropDown.classList.remove('hiddenElem');
    backdrop.classList.remove('hiddenElem');
  } else {
    input.classList.remove('dropDownIsOpen');
    dropDown.classList.add('hiddenElem');
    backdrop.classList.add('hiddenElem');
  }
};

export const removeInvalid = (e) => {
  const dropDown = e.target.closest('.dropDown'),
    input = dropDown.previousElementSibling;
  
  input.classList.remove('isInvalid');
};


