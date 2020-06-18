import m from 'moment';
import v from 'voca';

/**
 * Валидировать все данные!
 * переписать функцию, разнести в разные файлы
 */

const createAltForImg = (alt = null) => {
  if (alt && alt !== ' ') {
    return `${v.titleCase(alt, [' '])}`;
  }
  return `img${m().format('ss_SSS')}`;
};

const createAlt = (newAlt, oldAlt, type) => {
  if (!newAlt && !oldAlt) {
    return createAltForImg();
  }
  if (!newAlt) {
    return oldAlt[`${type}Alt`];
  }
  return createAltForImg(newAlt);
};

const updateImgData = (newData, oldData, type) => {
  return {
    [`${type}File`]: !newData[`${type}File`] ? oldData[`${type}File`] : newData[`${type}File`],
    [`${type}Src`]: !newData[`${type}Src`] ? oldData[`${type}Src`] : newData[`${type}Src`],
    [`${type}Alt`]: createAlt(newData[`${type}Alt`], oldData, type),
    [`${type}Id`]: !oldData ? `img${m().format('DDMMHHmmssSSS')}` : oldData[`${type}Id`],
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

const workWithCommodityData = (state, action) => {
  if (state === undefined) {
    return defaultCommodityDataState;
  }
  switch (action.type) {
    case 'FETCH_COMMODITY_REQUEST':
      return {
        ...state.commodityData,
        loading: true,
      };

    case 'FETCH_COMMODITY_SUCCUESS':
      return {
        ...action.payload,
        loading: false,
        error: null,
        updatedFields: {},
      };

    case 'FETCH_COMMODITY_FAILURE':
      return {
        ...defaultCommodityDataState,
        error: true,
      };

    case 'RESET_COMMODITY_DATA':
      return defaultCommodityDataState;

    case 'UPDATE_IMG':
      return updateField(state.commodityData, 'img', action.payload);

    case 'UPDATE_PREVIEWIMG':
      return updateField(state.commodityData, 'previewImg', action.payload);

    case 'UPDATE_TITLE':
      return updateField(state.commodityData, 'title', action.payload);

    case 'UPDATE_SHORTDESCR':
      return updateField(state.commodityData, 'shortDescr', action.payload);

    case 'UPDATE_DESCR':
      return updateField(state.commodityData, 'descr', action.payload);

    case 'UPDATE_PRICE':
      return updateField(state.commodityData, 'price', action.payload);

    default:
      return state.commodityData;
  }
};

export default workWithCommodityData;
