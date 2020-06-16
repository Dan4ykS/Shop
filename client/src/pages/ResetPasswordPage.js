import React from 'react';
import withStore from '../utils/workWithRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { Link } from 'react-router-dom';
import { resetPassword } from '../utils/workWithApiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType } from '../utils/workWithBrowser';

const ResetPasswordPage = ({ userData: { error, token, loading } }) => {
  return (
    <LoadingDataLogic
      configData={{
        loading,
        error,
        routeForRedirect: '/',
      }}
    >
      <div className='row reset justify-content-center'>
        <form className='col-6 reset__form' onSubmit={(e) => resetPassword(e, 'create', token)}>
          <h2>Восстановление пароля</h2>
          <div className='formGroup password'>
            <span className='showPasswordIcon showPasswordIcon_crosOut'>
              <FontAwesomeIcon onClick={() => changePasswordType('.showPasswordIcon', '.formControl_password')} icon={faEye} />
            </span>
            <input type='password' name='password' className='formControl formControl_password' placeholder='Введите новый пароль' required />
          </div>
          <button type='submit' className='btn-primary'>
            Изменить пароль
          </button>
        </form>
        <div className='col-6 reset__successMsg hidenElem'>
          <p>Ваш пароль был успешно изменен!</p>
          <div className='text-center'>
            <Link to='/' className='btn btn-primary text-center'>
              На главную
            </Link>
          </div>
        </div>
      </div>
    </LoadingDataLogic>
  );
};

export default withStore(ResetPasswordPage);
