import React from 'react';
import './RegistrationPage.scss';
import { connectToStore } from '../../utils/workWithRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType } from '../../utils/workWithBrowser';
import { authRequests } from '../../utils/workWithApiRequests';
import { registration } from '../../actions/userData';

const RegistrationPage = ({ actions: { registration }, history }) => {
  return (
    <div className='authPage authPage_registration row justify-content-center'>
      <div className='authPage__content col-lg-8 col-12'>
        <h2>Регистрация</h2>
        <form className='registration' onSubmit={(e) => authRequests(e, registration, '.registration', history)}>
          <div className='formGroup row'>
            <label className='col-sm-2 formControlLable'>Имя:</label>
            <div className='col-sm-10'>
              <input name='fullName' type='text' className='formControl' placeholder='Как вас зовут?' required />
            </div>
          </div>
          <div className='formGroup row'>
            <label className='col-sm-2 formControlLable'>Логин:</label>
            <div className='col-sm-10'>
              <input
                name='userName'
                type='text'
                className='formControl'
                placeholder='Придумайте уникальное имя'
                required
              />
              <div className='invalidFeedback'>Извините, но пользователь с таким ником уже есть</div>
            </div>
          </div>
          <div className='formGroup row'>
            <label className='col-sm-2 formControlLable'>Пароль:</label>
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
                placeholder='Придумайте пароль'
                required
              />
            </div>
          </div>
          <div className='formGroup row'>
            <label className='col-sm-2 formControlLable'>Email:</label>
            <div className='col-sm-10'>
              <input
                name='email'
                type='text'
                className='formControl'
                placeholder='Введите действующий Email'
                required
              />
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
export default connectToStore(null, { registration })(RegistrationPage, true);
