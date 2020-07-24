import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchCommodity } from '../../actions/commodityData';

/**
 * Необходимые комопненты:
 * 1) Компонент для рендеринга деталей о книге
 * 2) Компонент для просмотра видео с youtube
 * 3) Компонент для комментариев
 * 4) Компонент с рейтингом товара
 * 5) Компонент с рекомендацией товара
 */

const CommodityPage = ({ commodityData: { loading, error }, actions: { fetchCommodity }, history, match }) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender: () => fetchCommodity(match.params.id),
        routeForRedirect: '/',
      }}
    >
      <h2>Страница товара с id {history.location.pathname.split('/')[2]}</h2>
    </LoadingData>
  );
};

export default connectToStore(['commodityData'], { fetchCommodity })(CommodityPage, true);
