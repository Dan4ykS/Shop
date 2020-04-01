import React from 'react';
import Error from '../img/error.jpg';
import '../styles/scss/ErrorIndicator.scss';

const ErrorIndicator = () => {
  return (
    <div className='error'>
      <img src={Error} alt='error' />
    </div>
  );
};

export default ErrorIndicator;
