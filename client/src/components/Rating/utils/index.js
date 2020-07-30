export const updateCommodityRating = (e, changeLocalUserRating, editable) => {
  if (!editable) {
    return;
  }
  const item = e.target.closest('.rating__item'),
    ratingWrapper = item.closest('.rating');

  ratingWrapper.dataset.totalvalue = item.dataset.value;
  changeLocalUserRating(item.dataset.value);
};

export const clearTotalRating = (e, editable) => {
  if (!editable) {
    return;
  }
  const ratingWrapper = e.target.closest('.rating');
  ratingWrapper.dataset.totalvalue = 0;
};

export const checkTotalRating = (e, localUserRating, editable) => {
  if (!editable) {
    return;
  }
  const ratingWrapper = e.target.closest('.rating');
  if (!+ratingWrapper.dataset.totalvalue) {
    ratingWrapper.dataset.totalvalue = localUserRating;
  }
};
