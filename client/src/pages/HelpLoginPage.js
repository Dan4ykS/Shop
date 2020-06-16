import React from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../utils/workWithApiRequest';

const HelpLoginPage = () => {
  return (
    <div className='row reset justify-content-center'>
      <form className='col-6 reset__form' onSubmit={(e) => resetPassword(e, 'req')}>
        <h2>Восстановление пароля</h2>
        <div className='formGroup'>
          <input type='email' name='email' className='formControl' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Введите ваш email' />
          <div className='invalidFeedback'>Неверный email</div>
        </div>
        <button type='submit' className='btn-primary'>
          Восстановить пароль
        </button>
      </form>
      <div className='col-6 reset__successMsg hidenElem'>
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
