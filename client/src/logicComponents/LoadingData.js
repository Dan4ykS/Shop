import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import { useCallback, useEffect } from 'react';

const LoadingDataLogic = ({ children, configData: { loading, error, loadingData, token = null } }) => {
  // eslint-disable-next-line
  const request = useCallback(() => loadingData(), []);
  useEffect(() => {
    request();
  }, [request, token]);
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorIndicator />;
  }
  return <>{children}</>;
};

export default LoadingDataLogic;
