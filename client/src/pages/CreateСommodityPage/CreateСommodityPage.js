import React from 'react';
import LoadingData from '../../components/LoadingData';
import ChangeCommodityDetail from '../../components/ChangeCommodityDetail';
import { connectToStore } from '../../utils/workWithRedux';
import {
  reloadCommodityData,
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
} from '../../actions/commodityData';

const CreateСommodityPage = ({ userData: { loading, error, token }, commodityData, actions, history }) => {
  const { title, shortDescr, descr, previewImg, img, price } = commodityData;
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: actions.reloadCommodityData,
      }}
    >
      <ChangeCommodityDetail
        data={{
          ...commodityData,
          updatedFields: { title, shortDescr, descr, previewImg, img, price },
          history,
          token,
        }}
        type='create'
        actions={actions}
      />
    </LoadingData>
  );
};

export default connectToStore(
  ['userData', 'commodityData'],
  { reloadCommodityData, updateDescr, updateImg, updatePreviewImg, updatePrice, updateShortDescr, updateTitle }
)(CreateСommodityPage);
