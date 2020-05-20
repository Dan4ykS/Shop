import React, { useMemo } from 'react';
import LoadingDataLogic from '../logicComponents/LoadingData';
import withStore from '../utils/workWithRedux';
import DetailForWorkWithCommodity from '../components/DetailForWorkWithCommodity';

const UpdateCommodityPage = ({ commodityData: { loading, error } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading: false,
        error,
      }}
    >
      <DetailForWorkWithCommodity
        data={useMemo(
          () => ({
            title: 'Ведьмак',
            shortDescr: 'Описание 3',
            descr: '«Сага о ведьмаке» — цикл книг польского писателя Анджея Сапковского в жанре фэнтези. Первый рассказ цикла увидел свет в 1986 году, а последняя книга — в 2013.',
          }),
          []
        )}
      />
    </LoadingDataLogic>
  );
};

export default withStore(UpdateCommodityPage);
// /admin/updateCommodity/5e84c883e2286534184940de/
