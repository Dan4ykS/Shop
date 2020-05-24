import React from 'react';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import '../styles/scss/LoginPage.scss';
import { workWithUserApi } from '../utils/workWithApiRequest';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType } from '../utils/workWithBrowser';
import { configForUthPages } from '../utils/workWithCreateReactElem';

const LoginPage = ({ userData: { token, loading, error }, actions: { authorization }, history }) => {
  // console.log('Я на странице логина')
  return (
    <LoadingDataLogic configData={configForUthPages(token, loading, error)}>
      <h2>Страница авторизации</h2>
      <div className='row'>
        <div className='authorization col-lg-6'>
          <form className='authorizationForm' onSubmit={(e) => workWithUserApi(e, authorization, '.authorization', history)}>
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
              <Link to='/helpLogin/' className='authorization__forgotPassword'>
                Забыли пароль?
              </Link>
            </div>
            <div className='btnGroup col-lg-8 offset-lg-4 col-xl-7 offset-xl-5 flexWrap'>
              <button type='submit' className='btn btn-primary'>
                Войти
              </button>
              <Link to='/Registration/' type='button' className='btn btn-primary'>
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
        <div className='col-lg-6'></div>
      </div>
    </LoadingDataLogic>
  );
};

export default withStore(LoginPage);
// getDateFromLocalStorage('userData') !== null || token !== null ? loading : false,
