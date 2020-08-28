import { findNeedElement } from '../../../utils/workWithBrowser';

export const toggleDropDown = (e) => {
  const dataSet = e.target.dataset,
    wrapper = findNeedElement(`.inputWithPrompt`),
    input = wrapper.firstChild,
    dropDown = input.nextElementSibling;

  if (dataSet.openDropdown) {
    input.classList.add('dropDownIsOpen');
    dropDown.classList.remove('hiddenElem');
  } else {
    input.classList.remove('dropDownIsOpen');
    dropDown.classList.add('hiddenElem');
  }
};

export const removeInvalid = (e) => {
  const dropDown = e.target.closest('.dropDown'),
    input = dropDown.previousElementSibling;

  input.classList.remove('isInvalid');
};
