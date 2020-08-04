import StringHelper from '../utils/StringHelper';
import {
  FETCH_COMMODITY_REQUEST,
  FETCH_COMMODITY_SUCCUESS,
  FETCH_COMMODITY_FAILURE,
  RESET_COMMODITY_DATA,
  UPDATE_IMG,
  UPDATE_PREVIEWIMG,
  UPDATE_TITLE,
  UPDATE_SHORTDESCR,
  UPDATE_DESCR,
  UPDATE_PRICE,
  GET_SIMILAR_GOODS,
  UPDATE_USER_REVIEW,
  UPDATE_REVIEWS,
  REMOVE_REVIEW,
  CLEAR_USER_REVIEW,
  UPDATE_RATING,
} from '../actions/types';
import { addArrayElement, changeArrayElement, removeArrayElement } from '../utils/workWithRedux';

const createAlt = (newData, oldData, type) => {
  const newAlt = newData ? newData[`${type}Alt`] : null,
    oldAlt = oldData ? oldData[`${type}Alt`] : null;

  if (!newAlt && !oldAlt) {
    return `img${StringHelper.createId()}`;
  }
  if (newAlt === oldAlt) {
    return oldAlt;
  }
  return StringHelper.formatTitle(newAlt);
};

const updateImgData = (newData, oldData, type) => {
  return {
    [`${type}File`]: !newData[`${type}File`] ? oldData[`${type}File`] : newData[`${type}File`],
    [`${type}Src`]: !newData[`${type}Src`] ? oldData[`${type}Src`] : newData[`${type}Src`],
    [`${type}Alt`]: createAlt(newData, oldData, type),
    [`${type}Id`]: !oldData || !oldData[`${type}Id`] ? StringHelper.createId() : oldData[`${type}Id`],
  };
};

const updateUpdatedFieldsObj = (fieldName, updatedFields, newFieldData) => {
  if (Object.keys(updatedFields).length === 0) {
    return {
      [fieldName]: newFieldData,
    };
  }
  return {
    ...updatedFields,
    [fieldName]: newFieldData,
  };
};

const updateField = (commodityData, fieldName, newFieldData) => {
  if (fieldName === 'img' || fieldName === 'previewImg') {
    const newImgData = updateImgData(newFieldData, commodityData[fieldName], fieldName);
    return {
      ...commodityData,
      [fieldName]: newImgData,
      updatedFields: updateUpdatedFieldsObj(fieldName, commodityData.updatedFields, newImgData),
    };
  } else if (fieldName === 'title') {
    return {
      ...commodityData,
      title: newFieldData.trimStart() ? StringHelper.formatTitle(newFieldData.trimStart()) : newFieldData,
      updatedFields: updateUpdatedFieldsObj(fieldName, commodityData.updatedFields, newFieldData.trimStart()),
    };
  }
  return {
    ...commodityData,
    [fieldName]: newFieldData,
    updatedFields: updateUpdatedFieldsObj(fieldName, commodityData.updatedFields, newFieldData),
  };
};

const updateReviewsData = (commodityData, newReviewData, type = 'update') => {
  const { reviews, countReviews } = commodityData,
    reviewIndex = reviews.findIndex((review) => review.reviewId === newReviewData.reviewId),
    newData = {};

  if (reviewIndex === -1) {
    newData.reviews = addArrayElement(reviews, newReviewData);
    if (newReviewData?.review) {
      newData.countReviews = countReviews + 1;
    }
  } else if (type === 'remove') {
    newData.reviews = removeArrayElement(reviews, reviewIndex);
    newData.countReviews = countReviews - 1;
  } else {
    newData.reviews = changeArrayElement(reviews, reviewIndex, { ...reviews[reviewIndex], ...newReviewData });
    if (!reviews[reviewIndex]?.review) {
      newData.countReviews = countReviews + 1;
    } else {
      newData.countReviews = countReviews;
    }
  }
  console.log(newData);
  return {
    ...commodityData,
    ...newData,
  };
};

const updateRating = ({ rating }, { newRating, oldRating }) => {
  const newRatingData = {
    ...rating,
  };
  if (oldRating) {
    switch (oldRating) {
      case 5:
        newRatingData.fiveStars -= 1;
        break;
      case 4:
        newRatingData.fourStars -= 1;
        break;
      case 3:
        newRatingData.threeStars -= 1;
        break;
      case 2:
        newRatingData.twoStars -= 1;
        break;
      case 1:
        newRatingData.oneStar -= 1;
        break;
      default:
        break;
    }
  }
  switch (newRating) {
    case 5:
      newRatingData.fiveStars += 1;
      break;
    case 4:
      newRatingData.fourStars += 1;
      break;
    case 3:
      newRatingData.threeStars += 1;
      break;
    case 2:
      newRatingData.twoStars += 1;
      break;
    case 1:
      newRatingData.oneStar += 1;
      break;
    default:
      break;
  }
  const { fiveStars, fourStars, threeStars, twoStars, oneStar } = newRatingData,
    numberOfRatings = fiveStars + fourStars + threeStars + twoStars + oneStar,
    sumOfRatings = fiveStars * 5 + fourStars * 4 + threeStars * 3 + twoStars * 2 + oneStar * 1;

  newRatingData.general = sumOfRatings && numberOfRatings ? (sumOfRatings / numberOfRatings).toFixed(1) : 0;
  return newRatingData;
};

const defaultCommodityDataState = {
  id: null,
  title: '',
  author: '',
  rating: {},
  shortDescr: '',
  descr: '',
  previewImg: null,
  img: null,
  price: '',
  loading: true,
  error: null,
  genres: [],
  countReviews: null,
  reviews: [],
  similarGoods: [],
  userReview: null,
  updatedFields: {},
};

const updateCommodityData = (state, action) => {
  if (state === undefined) {
    return defaultCommodityDataState;
  }
  switch (action.type) {
    case FETCH_COMMODITY_REQUEST:
      return {
        ...state.commodityData,
        loading: true,
      };

    case FETCH_COMMODITY_SUCCUESS:
      return {
        ...state.commodityData,
        ...action.payload,
        loading: false,
        error: null,
      };

    case GET_SIMILAR_GOODS:
      return {
        ...state.commodityData,
        similarGoods: action.payload,
      };

    case FETCH_COMMODITY_FAILURE:
      return {
        ...defaultCommodityDataState,
        error: true,
      };

    case RESET_COMMODITY_DATA:
      return defaultCommodityDataState;

    case UPDATE_USER_REVIEW:
      return {
        ...state.commodityData,
        userReview: { ...state.commodityData.userReview, ...action.payload, reviewWasRemoved: false },
      };

    case CLEAR_USER_REVIEW:
      return {
        ...state.commodityData,
        userReview: { reviewWasRemoved: true },
      };

    case UPDATE_REVIEWS:
      return updateReviewsData(state.commodityData, action.payload);

    case REMOVE_REVIEW:
      return updateReviewsData(state.commodityData, action.payload, 'remove');

    case UPDATE_RATING:
      return {
        ...state.commodityData,
        rating: updateRating(state.commodityData, action.payload),
      };

    case UPDATE_IMG:
      return updateField(state.commodityData, 'img', action.payload);

    case UPDATE_PREVIEWIMG:
      return updateField(state.commodityData, 'previewImg', action.payload);

    case UPDATE_TITLE:
      return updateField(state.commodityData, 'title', action.payload);

    case UPDATE_SHORTDESCR:
      return updateField(state.commodityData, 'shortDescr', action.payload);

    case UPDATE_DESCR:
      return updateField(state.commodityData, 'descr', action.payload);

    case UPDATE_PRICE:
      return updateField(state.commodityData, 'price', action.payload);

    default:
      return state.commodityData;
  }
};

export default updateCommodityData;
