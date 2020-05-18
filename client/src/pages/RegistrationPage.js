import React from 'react';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType } from '../utils/workWithBrowser';
import { workWithUserApi } from '../utils/workWithApiRequest';
import { configForUthPages } from '../utils/workWithCreateReactElem';

const RegistrationPage = ({ userData: { token, loading, error, userName }, actions: { registration, invalidRoute }, history }) => {
  return (
    <LoadingDataLogic configData={configForUthPages(userName, token, loading, error, invalidRoute)}>
      <h2>Регистрация</h2>
      <div className='row justify-content-center'>
        <form className='registration col-lg-6' onSubmit={(e) => workWithUserApi(e, registration, '.registration', history)}>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Логин:</label>
            <div className='col-sm-10'>
              <input name='userName' type='text' className='form-control' placeholder='Придумайте уникальное имя' required />
              <div className='invalid-feedback'>Извините, но пользователь с таким ником уже есть</div>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Пароль:</label>
            <div className='col-sm-10 password'>
              <span className='showPasswordIcon showPasswordIcon_crosOut'>
                <FontAwesomeIcon onClick={() => changePasswordType('.showPasswordIcon', '.form-control_password')} icon={faEye} />
              </span>
              <input name='password' type='password' className='form-control form-control_password' placeholder='Придумайте пароль' required />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Email:</label>
            <div className='col-sm-10'>
              <input name='email' type='text' className='form-control' placeholder='Введите действующий Email' required />
              <div className='invalid-feedback'>Изините, но такая почта уже используется</div>
            </div>
          </div>
          <div className='col-8 offset-4 text-right' role='group'>
            <button type='submit' className='btn btn-primary'>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </LoadingDataLogic>
  );
};
export default withStore(RegistrationPage);
