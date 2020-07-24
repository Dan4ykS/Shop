import React from 'react';
import './LoginPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { authRequests } from '../../utils/workWithApiRequests';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType } from '../../utils/workWithBrowser';
import { authorization } from '../../actions/userData';

const LoginPage = ({ actions: { authorization }, history }) => {
  // console.log('Я на странице логина')
  return (
    <>
      <h2>Страница авторизации</h2>
      <div className='row'>
        <div className='authorization col-lg-6'>
          <form
            className='authorizationForm'
            onSubmit={(e) => authRequests(e, authorization, '.authorization', history)}
          >
            <div className='formGroup row'>
              <label className='col-sm-2 colFormLable'>Логин:</label>
              <div className='col-sm-10'>
                <input name='userName' type='text' className='formControl' placeholder='Введите ваш логин' required />
                <div className='invalidFeedback'>Неверный логин</div>
              </div>
            </div>
            <div className='formGroup row'>
              <label className='col-sm-2 colFormLable'>Пароль:</label>
              <div className='col-sm-10 password'>
                <span className='showPasswordIcon showPasswordIcon_crosOut'>
                  <FontAwesomeIcon
                    onClick={() => changePasswordType('.showPasswordIcon', '.formControl_password')}
                    icon={faEye}
                  />
                </span>
                <input
                  name='password'
                  type='password'
                  className='formControl formControl_password'
                  placeholder='Введите ваш пароль'
                  required
                />
                <div className='invalidFeedback'>Неверный пароль</div>
              </div>
              <Link to='/helpLogin/' className='authorization__forgotPassword'>
                Забыли пароль?
              </Link>
            </div>
            <div className='btnGroup col-lg-8 offset-lg-4 col-xl-7 offset-xl-5 flexWrap'>
              <button type='submit' className='btn-primary'>
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
    </>
  );
};

export default connectToStore(null, { authorization })(LoginPage, true);
