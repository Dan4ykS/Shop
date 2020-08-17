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
  return (
    <div className='authPage row justify-content-center'>
      <div className='authPage__content col-lg-8 col-12'>
        <h2>Авторизации</h2>
        <form
          className='authorization'
          onSubmit={(e) => authRequests(e, authorization, '.authorization', history)}
        >
          <div className='formGroup'>
            <div className='col-12'>
              <input name='userName' type='text' className='formControl' placeholder='Введите ваш логин' required />
              <div className='invalidFeedback'>Неверный логин</div>
            </div>
          </div>
          <div className='formGroup'>
            <div className='col-12 password'>
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
          <div className='btnGroup_center'>
            <button type='submit' className='btn'>
              Войти
            </button>
            <Link to='/Registration/' type='button' className='btn'>
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connectToStore(null, { authorization })(LoginPage);
