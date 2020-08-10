import { findNeedElements, findNeedElement } from "../../../utils/workWithBrowser";

export const feedbackMouseLeave = () => {
  findNeedElements('.helperIcon').forEach((el) => {
    el.classList.remove('helperIcon_active');
    el.childNodes.forEach((el) => {
      el.classList.remove('fab_active');
    });
    setTimeout(() => el.classList.add('hiddenElem'), 500);
  });
};

export const feedbackMouseEnter = () => {
  findNeedElements('.helperIcon').forEach(async (el) => {
    el.classList.remove('hiddenElem');
    await new Promise((resolv) => setTimeout(() => el.classList.add('helperIcon_active'), 200));
    el.childNodes.forEach((el) => {
      el.classList.add('fab_active');
    });
  });
};

export const showFooterHidenElements = () => {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 298) {
      findNeedElement('footer .feedback').classList.remove('hiddenElem');
      findNeedElement('footer .upArrow').classList.remove('hiddenElem');
    }
    if (window.pageYOffset > 300) {
      findNeedElements('footer .fas').forEach((el) => {
        el.classList.add('fas_active');
      });
    } else {
      findNeedElements('footer .fas').forEach((el) => {
        el.classList.remove('fas_active');
      });
      findNeedElement('footer .feedback').classList.add('hiddenElem');
      findNeedElement('footer .upArrow').classList.add('hiddenElem');
    }
  });
};
