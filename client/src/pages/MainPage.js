import React from 'react';
import withSore from '../utils/workWithRedux';

const MainPage = ({ commodityData: { imgSrc, img }, actions: { updateImg }, userData: { token } }) => {
  return (
    <>
      <h2>Главная страница! </h2>
    </>
  );
};
export default withSore(MainPage);
