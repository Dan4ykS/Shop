import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import '../styles/scss/Login.scss';
import { workWithUserApi, changePasswordType, redirectToPage } from '../utils/helpFuncsForBrouser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const LoginPage = ({ userData: { token }, actions: { authorization }, history }) => {
  if (token) {
   redirectToPage(history, '/')
  }
  return (
    <>
      <h2>Страница авторизации</h2>
      <div className='row'>
        <div className='authorization col-lg-6'>
          <form className='authorizationForm' onSubmit={(e) => workWithUserApi(e, authorization, '.authorization')}>
            <div className='form-group row'>
              <label className='col-sm-2 col-form-label'>Логин:</label>
              <div className='col-sm-10'>
                <input name='userName' type='text' className='form-control' placeholder='Введите ваш логин' required />
                <div className='invalid-feedback'>Неверный логин</div>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-sm-2 col-form-label'>Пароль:</label>
              <div className='col-sm-10 password'>
                <span className='showPasswordIcon showPasswordIcon_crosOut'>
                  <FontAwesomeIcon onClick={() => changePasswordType('.showPasswordIcon', '.form-control_password')} icon={faEye} />
                </span>
                <input name='password' type='password' className='form-control form-control_password' placeholder='Введите ваш пароль' required />
                <div className='invalid-feedback'>Неверный пароль</div>
              </div>
            </div>
            <div className='btn-group col-8 offset-4' role='group'>
              <button type='submit' className='btn btn-primary'>
                Войти
              </button>
              <Link to='/Registration/' className='btn btn-primary'>
                Зарегистрироваться
              </Link>
              <Link to='/helpLogin/' className='btn btn-primary'>
                Забыли пароль?
              </Link>
            </div>
          </form>
        </div>
        <div className='col-lg-6'></div>
      </div>
    </>
  );
};

export default withStore(LoginPage);
