import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../utils/workWithApiRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { changePasswordType, STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';

const ResetPasswordPage = ({ userData: { error, token, loading } }) => {
  return (
    <LoadingData
      configData={{
        loading,
        error,
        routeForRedirect: '/',
      }}
    >
      <div className='row reset justify-content-center'>
        <ReactTitle title={`${STORE_NAME} | Восстановление проля`} />
        <form className='col-lg-6 reset__form' onSubmit={(e) => resetPassword(e, 'create', token)}>
          <h2>Восстановление пароля</h2>
          <div className='formGroup password'>
            <span className='showPasswordIcon showPasswordIcon_crosOut'>
              <FontAwesomeIcon
                onClick={() => changePasswordType('.showPasswordIcon', '.formControl_password')}
                icon={faEye}
              />
            </span>
            <input
              type='password'
              name='password'
              className='formControl formControl_password'
              placeholder='Введите новый пароль'
              required
            />
          </div>
          <button type='submit' className='btn'>
            Изменить пароль
          </button>
        </form>
        <div className='col-lg-6 reset__successMsg hiddenElem'>
          <p>Ваш пароль был успешно изменен!</p>
          <div className='text-center'>
            <Link to='/' className='btn btn-primary text-center'>
              На главную
            </Link>
          </div>
        </div>
      </div>
    </LoadingData>
  );
};

export default connectToStore(['userData'], null)(ResetPasswordPage);
