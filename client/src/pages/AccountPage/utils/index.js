import GoodsService from '../../../services/GoodsService';

export const toggleUploadAvatarMenu = (e, mode) => {
  const parentNode = e.target.closest('.userAvatar'),
    uploadsMenu = parentNode.lastChild;

  if (mode === 'show') {
    uploadsMenu.classList.add('userAvatar__menu_active');
  } else {
    uploadsMenu.classList.remove('userAvatar__menu_active');
  }
};

export const updateReviews = async (e, dataForUpdate, funcsForUpdate) => {
  try {
    e.persist();
    e.preventDefault();
    const form = e.target,
      toRemove = form.dataset.remove,
      reviewBtns = form.querySelectorAll('.btn');

    reviewBtns.forEach((btn) => (btn.disabled = true));
    if (toRemove === 'false') {
      await GoodsService.updateReview(dataForUpdate.reviewId, { review: dataForUpdate.review }, dataForUpdate.token);
      funcsForUpdate.updateUserReviews({
        reviewId: dataForUpdate.reviewId,
        review: dataForUpdate.review,
      });
    } else {
      await GoodsService.removeReview(dataForUpdate.reviewId, dataForUpdate.token);
      funcsForUpdate.updateUserReviews({
        reviewId: dataForUpdate.reviewId,
        wasDeleted: true,
      });
    }
    if (toRemove) {
      form.dataset.remove = false;
    }
    reviewBtns.forEach((btn) => (btn.disabled = false));
  } catch (error) {
    console.log(error);
  }
};
