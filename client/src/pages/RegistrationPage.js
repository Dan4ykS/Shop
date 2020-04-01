import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import { Redirect } from 'react-router-dom';
import { workWithUserApi } from '../utils/helpFuncsForBrouser';
import MaterialUiRegistrationForm from '../components/MaterialUiForm';
import { Grid } from '@material-ui/core';

const RegistrationPage = ({ userData: { isAuth }, actions: { registration } }) => {
  if (isAuth) {
    return <Redirect to='/' />;
  }
  return (
    <>
      <h2>Регистрация</h2>
      <Grid container justify='center'>
        <MaterialUiRegistrationForm registration={registration} />
      </Grid>
      ;
    </>
  );
};
export default withStore(RegistrationPage);
// onSubmit={(e) => checkUser(e, authorization)}

//  <div className='row justify-content-center'>
//    <div className='registration col-lg-6'>
//      <form
//        className='registrationForm'
//        onSubmit={(e) => {
//          workWithUserApi(e, registration, '.registration');
//        }}
//      >
//        <div className='form-group row'>
//          <label className='col-sm-2 col-form-label'>Логин:</label>
//          <div className='col-sm-10'>
//            <input name='userName' type='text' className='form-control' placeholder='Придумайте логин' required />
//            <div className='invalid-feedback'>Пользователь с таким ником уже существует, придумайте другой</div>
//          </div>
//        </div>
//        <div className='form-group row'>
//          <label className='col-sm-2 col-form-label'>Email:</label>
//          <div className='col-sm-10'>
//            <input name='email' type='text' className='form-control' placeholder='Введите ваш Email' />
//          </div>
//        </div>
//        <div className='form-group row'>
//          <label className='col-sm-2 col-form-label'>Пароль:</label>
//          <div className='col-sm-10'>
//            <input name='password' type='password' className='form-control' placeholder='Придумайте пароль' />
//          </div>
//        </div>
//        <div className='row justify-content-center'>
//          <button type='submit' className='btn btn-primary col-6'>
//            Войти
//          </button>
//        </div>
//      </form>
//    </div>
//  </div>;
