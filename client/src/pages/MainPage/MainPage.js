import React, { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => { 
    console.log('Главная страница создалась');
  }, [])
  return (
    <>
      <h2>Главная страница! </h2>
    </>
  );
};

export default MainPage;
