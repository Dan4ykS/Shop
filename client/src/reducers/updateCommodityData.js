import StringHelper from '../utils/StringHelper';
import { FETCH_COMMODITY_REQUEST, FETCH_COMMODITY_SUCCUESS, FETCH_COMMODITY_FAILURE, RESET_COMMODITY_DATA, UPDATE_IMG, UPDATE_PREVIEWIMG, UPDATE_TITLE, UPDATE_SHORTDESCR, UPDATE_DESCR, UPDATE_PRICE } from '../actions/types';

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

const defaultCommodityDataState = {
  id: null,
  title: null,
  shortDescr: null,
  descr: null,
  previewImg: null,
  img: null,
  price: null,
  loading: true,
  error: null,
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
        ...action.payload,
        loading: false,
        error: null,
        updatedFields: {},
      };

    case FETCH_COMMODITY_FAILURE:
      return {
        ...defaultCommodityDataState,
        error: true,
      };

    case RESET_COMMODITY_DATA:
      return defaultCommodityDataState;

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
