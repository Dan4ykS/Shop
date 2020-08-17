export const hideFeedbackStatus = (e) => {
  e.preventDefault();

  const feedbacStatus = e.target.closest('.commodityPage__feedback-status'),
    feedbacWrapper = feedbacStatus.previousElementSibling;

  feedbacStatus.classList.add('hiddenElem');
  feedbacWrapper.classList.remove('commodityPage__feedback-contentWrapper_hiden');
};

