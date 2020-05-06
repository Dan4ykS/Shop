import React, { useCallback } from 'react';
import withStore from '../utils/helpFuncsForRedux';
import LoadingDataLogic from '../logicComponents/LoadingData';
import { Link } from 'react-router-dom';
import { chekToken, resetPassword, changePasswordType } from '../utils/helpFuncsForBrouser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const ResetPasswordPage = ({ history, actions: { isLogin, loadCart, fetchGoods }, userData: { error, token } }) => {
  const userToken = { token: history.location.pathname.split('=')[1] };
  return (
    <LoadingDataLogic
      configData={{
        loading: false,
        error,
        // eslint-disable-next-line
        funcForReq: useCallback(() => chekToken(userToken, isLogin, loadCart, fetchGoods), []),
      }}
    >
      <div className='row reset justify-content-center'>
        <form className='col-6 reset__form' onSubmit={(e) => resetPassword(e, 'create', token)}>
          <h2>Восстановление пароля</h2>
          <div className='form-group password'>
            <span className='showPasswordIcon showPasswordIcon_crosOut'>
              <FontAwesomeIcon onClick={() => changePasswordType('.showPasswordIcon', '.form-control_password')} icon={faEye} />
            </span>
            <input type='password' name='password' className='form-control form-control_password' placeholder='Введите новый пароль' required/>
          </div>
          <button type='submit' className='btn btn-primary'>
            Изменить пароль
          </button>
        </form>
        <div className='col-6 reset__successMsg'>
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
