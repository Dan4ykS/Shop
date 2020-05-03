import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import {  useEffect } from 'react';

const LoadingDataLogic = ({ children, configData: { loading, error, loadingData, token = null } }) => {
  useEffect(() => {
    loadingData();
  }, [loadingData]);
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorIndicator />;
  }
  return <>{children}</>;
};

export default LoadingDataLogic;
