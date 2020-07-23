export const switchVisible = (e, mode) => {
  const parentNode = e.target.closest('.preview__content'),
    moreInfoBlock = parentNode.lastChild;

  if (mode === 'show') {
    moreInfoBlock.classList.add('preview__content-moreInfo_active');
  } else {
    moreInfoBlock.classList.remove('preview__content-moreInfo_active');
  }
};
