import React from 'react';
import withStore from '../utils/workWithRedux';

/**
 * Необходимые комопненты:
 * 1) Компонент для рендеринга деталей о книге
 * 2) Компонент для просмотра видео с youtube
 * 3) Компонент для комментариев 
 * 4) Компонент с рейтингом товара
 * 5) Компонент с рекомендацией товара
 */

const CommodityPage = ({ history }) => {
  return <h2>Страница товара с id {history.location.pathname.split('/')[2]}</h2>;
};

export default withStore(CommodityPage);
