import React from 'react';
import withStore from '../utils/helpFuncsForRedux';
import MaterialUiRegistrationForm from '../components/MaterialUiForm';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const RegistrationPage = ({ userData: { token }, actions: { registration } }) => {
  if (token) { 
    return <Redirect to='/'/>
  }
  return (
    <>
      <h2>Регистрация</h2>
      <Grid container justify='center'>
        <MaterialUiRegistrationForm registration={registration} />
      </Grid>
    </>
  );
};
export default withStore(RegistrationPage);