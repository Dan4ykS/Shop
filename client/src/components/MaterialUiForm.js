import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Icon, Grid } from '@material-ui/core';

const MaterialUiRegistrationForm = ({ registration }) => {
  const [values, setValues] = useState({
    userName: '',
    password: '',
    email: '',
    changePasswordType: false,
    error: false,
  });
  const submitForm = async (e) => {
    e.persist();
    e.preventDefault();
    if (values.email === '' || values.password === '' || values.userName === '') {
      setValues({
        ...values,
        error: true,
      });
    } else {
      const sendDate = { userName: values.userName, password: values.password, email: values.email };
      await registration(sendDate);
      setValues({
        userName: '',
        password: '',
        email: '',
        changePasswordType: false,
      });
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickchangePasswordType = () => {
    setValues({ ...values, changePasswordType: !values.changePasswordType });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid>
      <form noValidate autoComplete='off' onSubmit={(e) => submitForm(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField error={values.error} fullWidth={true} label='Введите имя' value={values.userName} onChange={(event) => setValues({ ...values, userName: event.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true}>
              <InputLabel error={values.error} htmlFor='standard-adornment-password'>Придумайте пароль</InputLabel>
              <Input 
                error={values.error}
                id='standard-adornment-password'
                type={values.changePasswordType ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={handleClickchangePasswordType} onMouseDown={handleMouseDownPassword}>
                      {values.changePasswordType ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField error={values.error} fullWidth={true} label='Введите email' value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
          </Grid>
          <Grid container item justify='flex-end' spacing={2}>
            <Grid item>
              <Button type='submit' variant='contained' color='primary' endIcon={<Icon>send</Icon>}>
                Регистрация
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default MaterialUiRegistrationForm;
