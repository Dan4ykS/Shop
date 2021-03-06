import React from 'react';
import './RegistrationPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType, STORE_NAME } from '../../utils/workWithBrowser';
import { authRequests } from '../../utils/workWithApiRequests';
import { registration } from '../../actions/userData';
import { ReactTitle } from 'react-meta-tags';

const RegistrationPage = ({ actions: { registration }, history }) => {
  return (
    <div className='authPage authPage_registration row justify-content-center'>
      <ReactTitle title={`${STORE_NAME} | Регистрация`} />
      <div className='authPage__content col-lg-8 col-12'>
        <h2>Регистрация</h2>
        <form className='registration' onSubmit={(e) => authRequests(e, registration, '.registration', history)}>
          <div className='formGroup'>
            <div className='col-12'>
              <input name='fullName' type='text' className='formControl' placeholder='Как вас зовут?' required />
            </div>
          </div>
          <div className='formGroup'>
            <div className='col-12'>
              <input
                name='userName'
                type='text'
                className='formControl'
                placeholder='Придумайте уникальное имя пользователя'
                required
              />
              <div className='invalidFeedback'>Извините, но пользователь с таким ником уже есть</div>
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
                placeholder='Придумайте пароль'
                required
              />
            </div>
          </div>
          <div className='formGroup'>
            <div className='col-12'>
              <input name='email' type='text' className='formControl' placeholder='Введите действующий Email' required />
              <div className='invalidFeedback'>Изините, но такая почта уже используется</div>
            </div>
          </div>
          <div className='btnGroup_center'>
            <button type='submit' className='btn'>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default connectToStore(null, { registration })(RegistrationPage);
