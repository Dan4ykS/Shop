import React from 'react';
import LoadingData from '../../components/LoadingData';
import ChangeCommodityDetail from '../../components/ChangeCommodityDetail';
import { connectToStore } from '../../utils/workWithRedux';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';
import { reloadCommodityData } from '../../actions/commodityData';

const CreateCommodityPage = ({ userData: { loading, error }, actions: { reloadCommodityData } }) => {
  return (
    <div className='createCommodityPage'>
      <ReactTitle title={`${STORE_NAME} | Создание книги`} />
      <LoadingData
        configData={{
          loading,
          error,
          funcForRender: reloadCommodityData,
        }}
      >
        <ChangeCommodityDetail type='create' />
      </LoadingData>
    </div>
  );
};

export default connectToStore(['userData'], { reloadCommodityData })(CreateCommodityPage);
