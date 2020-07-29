export const updateCommodityRating = (e) => {
  const item = e.target.closest('.rating__item'),
    ratingWrapper = item.closest('.rating');

  ratingWrapper.dataset.totalvalue = item.dataset.value;
};
