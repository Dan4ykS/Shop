import React from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../utils/workWithApiRequests';
import { ReactTitle } from 'react-meta-tags';
import { STORE_NAME } from '../../utils/workWithBrowser';

const HelpLoginPage = () => {
  return (
    <div className='row reset justify-content-center'>
      <ReactTitle title={`${STORE_NAME} | Восстановление пароля`} />
      <form className='col-6 reset__form' onSubmit={(e) => resetPassword(e, 'req')}>
        <h2>Восстановление пароля</h2>
        <div className='formGroup'>
          <input
            type='email'
            name='email'
            className='formControl'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Введите ваш email'
          />
          <div className='invalidFeedback'>Неверный email</div>
        </div>
        <button type='submit' className='btn'>
          Восстановить пароль
        </button>
      </form>
      <div className='col-6 reset__successMsg hiddenElem'>
        <p>Письмо для восстановления пароля отправлено на ваш email</p>
        <div className='btnGroup_center'>
          <Link to='/' className='btn btn-primary text-center'>
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpLoginPage;
