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
    showPassword: false,
  });
  const submitForm = (e) => {
    e.preventDefault();
    const sendDate = { userName: values.userName, password: values.password, email: values.email };
    registration(sendDate)
    // axios.post('http://127.0.0.1:8000/api/createUser', sendDate);
    setValues({
      userName: '',
      password: '',
      email: '',
      showPassword: false,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid>
      <form noValidate autoComplete='off' onSubmit={(e) => submitForm(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth={true} label='Введите имя' value={values.userName} onChange={(event) => setValues({ ...values, userName: event.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='standard-adornment-password'>Придумайте пароль</InputLabel>
              <Input
                id='standard-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth={true} label='Введите email' value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
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
