import React from 'react';
import LoadingData from '../../components/LoadingData';
import ChangeCommodityDetail from '../../components/ChangeCommodityDetail';
import { connectToStore } from '../../utils/workWithRedux';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';
import {
  reloadCommodityData,
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
} from '../../actions/commodityData';

const CreateCommodityPage = ({ userData: { loading, error, token }, commodityData, actions, history }) => {
  const { title, shortDescr, descr, previewImg, img, price } = commodityData;
  return (
    <div className='createCommodityPage'>
      <ReactTitle title={`${STORE_NAME} | Создание книги`} />
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
    </div>
  );
};

export default connectToStore(['userData', 'commodityData'], {
  reloadCommodityData,
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
})(CreateCommodityPage);
