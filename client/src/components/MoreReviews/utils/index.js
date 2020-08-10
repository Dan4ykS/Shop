export const calcRemainingReviewsCount = (countShow, allCount) => (countShow + 5 < allCount ? 5 : allCount - countShow);

