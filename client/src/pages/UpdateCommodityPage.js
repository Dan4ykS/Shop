import React, { useMemo } from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import ChangeCommodityDetail from '../components/ChangeCommodityDetail';
import { findPathParams } from '../utils/workWithBrowser';

const UpdateCommodityPage = ({
  commodityData: { loading, error: commodityError, title, shortDescr, descr, previewImg, img, id },
  actions: { updateImg, updatePreviewImg ,fetchCommodity },
  userData: { token, error: userError, userName },
  history,
}) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error: userError ? userError : commodityError,
        funcForRender: token ? () => fetchCommodity(findPathParams(history), token, history) : null,
      }}
    >
      <ChangeCommodityDetail
        data={useMemo(
          () => ({
            title,
            shortDescr,
            descr,
            previewImg,
            img,
            id,
          }),
          [title, descr, shortDescr, previewImg, img, id]
        )}
        actions={{
          updateImg,
          updatePreviewImg,
        }}
      />
    </LoadingDataLogic>
  );
};

export default withStore(UpdateCommodityPage);
