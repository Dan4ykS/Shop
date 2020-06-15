import React from 'react';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType } from '../utils/workWithBrowser';
import { workWithUserApi } from '../utils/workWithApiRequest';
import { configForUthPages } from '../utils/workWithCreateReactElem';

const RegistrationPage = ({ userData: { token, loading }, actions: { registration }, history }) => {
  return (
    <LoadingDataLogic configData={configForUthPages(token, loading)}>
      <h2>Регистрация</h2>
      <div className='row justify-content-center'>
        <form className='registration col-lg-6' onSubmit={(e) => workWithUserApi(e, registration, '.registration', history)}>
          <div className='formGroup row'>
            <label className='col-sm-2 colFormLable'>Логин:</label>
            <div className='col-sm-10'>
              <input name='userName' type='text' className='formControl' placeholder='Придумайте уникальное имя' required />
              <div className='invalidFeedback'>Извините, но пользователь с таким ником уже есть</div>
            </div>
          </div>
          <div className='formGroup row'>
            <label className='col-sm-2 colFormLable'>Пароль:</label>
            <div className='col-sm-10 password'>
              <span className='showPasswordIcon showPasswordIcon_crosOut'>
                <FontAwesomeIcon onClick={() => changePasswordType('.showPasswordIcon', '.formControl_password')} icon={faEye} />
              </span>
              <input name='password' type='password' className='formControl formControl_password' placeholder='Придумайте пароль' required />
            </div>
          </div>
          <div className='formGroup row'>
            <label className='col-sm-2 colFormLable'>Email:</label>
            <div className='col-sm-10'>
              <input name='email' type='text' className='formControl' placeholder='Введите действующий Email' required />
              <div className='invalidFeedback'>Изините, но такая почта уже используется</div>
            </div>
          </div>
          <div className='col-12 text-center' role='group'>
            <button type='submit' style={{ width: '100%' }} className='btn btn-primary'>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </LoadingDataLogic>
  );
};
export default withStore(RegistrationPage);
