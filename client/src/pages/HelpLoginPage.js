import React from 'react';
import '../styles/scss/HelpLoginPage.scss';
import { Link } from 'react-router-dom';
import { reqForResetPassword } from '../utils/helpFuncsForBrouser';


const HelpLoginPage = () => {
  return (
    <div className='row reset justify-content-center'>
      <form className='col-6 reset__form' onSubmit={(e) => reqForResetPassword(e)}>
        <h2>Восстановление пароля</h2>
        <div className='form-group'>
          <input type='email' name='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Введите ваш email' />
          <div className='invalid-feedback'>Неверный логин</div>
        </div>
        <button type='submit' className='btn btn-primary'>
          Восстановить пароль
        </button>
      </form>
      <div className='col-6 reset__successMsg'>
        <p>Письмо для восстановления пароля отправлено на ваш email</p>
        <div className='text-center'>
          <Link to='/' className='btn btn-primary text-center'>
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpLoginPage;
