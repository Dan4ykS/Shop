export const switchVisible = (e, mode) => {
  const parentNode = e.target.closest('.preview__content'),
    moreInfoBlock = parentNode.lastChild;

  if (mode === 'show') {
    moreInfoBlock.classList.remove('hiddenElem');
    setTimeout(() => moreInfoBlock.classList.add('preview__content-moreInfo_active'), 10);
  } else {
    moreInfoBlock.classList.remove('preview__content-moreInfo_active');
    setTimeout(() => moreInfoBlock.classList.add('hiddenElem'), 50);
  }
};
