import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { startEmailPasswordRegister } from '../../store/auth';


const formData = {
  displayName: '',
  email: '',
  password: ''
}


const formValidations = {
  displayName: [(value) => value.length >= 1, 'El nombre es requerido'],
  email: [(value) => value.includes('@'), 'El correo debe ser un correo válido'],
  password: [(value) => value.length >= 6, 'La contraseña debe ser mayor a 6 caracteres'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setformSubmitted] = useState(false);

  const { status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);


  const onSubmit = (e) => {
    e.preventDefault();
    setformSubmitted(true);

    if(!isFormValid) return;

    dispatch(startEmailPasswordRegister({email, password, displayName}));

  }

  return (
    <AuthLayout title="Crear cuenta">
        <h1>FormValid { isFormValid ? 'Valido': 'No valido'}</h1>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted}
                helperText={ displayNameValid }
              
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted}
                helperText={ passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid 
              item xs={ 12 }
              display={ !!errorMessage ? 'block' : 'none'}
              >
                <Alert
                  severity='error'
                  sx={{ display: status === 'not-authenticated' ? 'block' : 'none' }}
                >
                  { errorMessage }
                </Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button 
                disabled={ isCheckingAuth }
                type='submit'
                variant='contained' 
                fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
