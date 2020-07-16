import React from 'react';
import { connectToStore } from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { findPathParams } from '../utils/workWithBrowser';
import { fetchCommodity } from '../actions/commodityData';

/**
 * Необходимые комопненты:
 * 1) Компонент для рендеринга деталей о книге
 * 2) Компонент для просмотра видео с youtube
 * 3) Компонент для комментариев
 * 4) Компонент с рейтингом товара
 * 5) Компонент с рекомендацией товара
 */

const CommodityPage = ({ commodityData: { loading, error }, actions: { fetchCommodity }, history }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        funcForRender: () => fetchCommodity(findPathParams(history)),
        routeForRedirect: '/',
      }}
    >
      <h2>Страница товара с id {history.location.pathname.split('/')[2]}</h2>
    </LoadingDataLogic>
  );
};

export default connectToStore(['commodityData'], [fetchCommodity])(CommodityPage, true);
