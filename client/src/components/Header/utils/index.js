import { findNeedElement } from '../../../utils/workWithBrowser';

export const toggleSearchForMobile = (e) => {
  const parentNode = e.target.closest('svg'),
    content = findNeedElement('.content'),
    contentPaddingTop = window.getComputedStyle(content).paddingTop;

  parentNode.nextElementSibling.classList.toggle('hidenElem');
  if (contentPaddingTop === '100px') {
    content.style.paddingTop = '70px';
  } else {
    content.style.paddingTop = '100px';
  }
};

export const showMobileSideBar = () => {
  const mobileSideBar = findNeedElement('.mobileSideBar'),
    body = findNeedElement('body'),
    mobileClose = findNeedElement('.mobileSideBar_close');

  mobileSideBar.classList.add('mobileSideBar_active');
  mobileClose.style.display = 'block';
  body.style.overflow = 'hidden';
};

export const closeMobileSideBar = () => {
  const body = findNeedElement('body'),
    mobileSideBar = findNeedElement('.mobileSideBar'),
    mobileSideBarClose = findNeedElement('.mobileSideBar_close');

  mobileSideBar.classList.remove('mobileSideBar_active');
  mobileSideBarClose.style.display = 'none';
  body.style.overflow = 'auto';
};
