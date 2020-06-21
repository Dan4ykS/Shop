import React from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';

const CreateСommodityPage = ({
  userData: { loading, error, token },
  commodityData: { title, shortDescr, descr, previewImg, img, id, price },
  actions: {
    updateCommodityImg,
    updateCommodityPreviewImg,
    reloadCommodityData,
    updateCommodityTitle,
    updateCommodityPrice,
    updateCommodityDescr,
    updateCommodityShortDescr,
  },
  history,
}) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        funcForRender: reloadCommodityData,
      }}
    >
      <ChangeCommodityDetail
        data={{
          title,
          shortDescr,
          descr,
          previewImg,
          img,
          id,
          price,
          token,
          updatedFields: { title, shortDescr, descr, previewImg, img, price },
          type: 'create',
        }}
        actions={{
          updateCommodityImg,
          updateCommodityPreviewImg,
          updateCommodityTitle,
          updateCommodityDescr,
          updateCommodityShortDescr,
          updateCommodityPrice,
        }}
        history={history}
      />
    </LoadingDataLogic>
  );
};

export default withStore(CreateСommodityPage);
