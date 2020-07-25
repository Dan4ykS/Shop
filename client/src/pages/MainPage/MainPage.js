import React, { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    console.log('Я перерендерился');
  });
  return (
    <>
      <h2>Главная страница</h2>
    </>
  );
};

export default MainPage;
