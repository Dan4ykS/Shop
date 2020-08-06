import React from 'react';
import notFoundImg from './notFound.svg';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='notFoundPage'>
      <div className='notFoundPage__item'>
        <span>Упс...</span>
        <img src={notFoundImg} alt='notFound' />
        <span>Ошибка #404</span>
      </div>
      <div className='btnGroup_center'>
        <Link to='/' className='btn btn-dark'>
          Домой
        </Link>
        <Link to={{ pathname: '/Goods', state: 'fromNotFound' }} className='btn btn-dark'>
          Посмотреть книги
        </Link>
      </div>
    </div>
  );
};

export default Page404;
