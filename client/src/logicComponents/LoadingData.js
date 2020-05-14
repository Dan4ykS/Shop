import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';

const LoadingDataLogic = ({ children, configData: { loading, error, funcForRender, roteForRedirect = '/Login/' } }) => {
  useEffect(() => {
    // console.log(`Вызвался эффект из компонента логики!`)
    funcForRender();
  }, [funcForRender]);
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <Redirect to={roteForRedirect} />;
  }
  return <>{children}</>;
};

export default LoadingDataLogic;
