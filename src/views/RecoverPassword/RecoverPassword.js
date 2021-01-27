import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Container,
  CssBaseline,
  Link
} from '@material-ui/core';
import Swal from 'sweetalert2'
import LockOpen from '@material-ui/icons/LockOpen';

import clicalPicture from 'assets/branding/Clicalmedic/svgClical2.svg'

import api from 'middleware/api'

console.log("clicalPicture",clicalPicture)

const schema = {
  Username: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  Password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const urlParams = new URLSearchParams(window.location.search);

//console.log("urlParams",urlParams)

const tokenParam = urlParams.get('tokenizer');

console.log("tokenParam",tokenParam)

const RecoverPassword = props => {

  //console.log("props",props);

  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
  });


  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = event => {
    
    event.preventDefault()
    console.log(formState.values)

    

    if(/[a-z]+/.test(formState.values.password) && /[A-Z]+/.test(formState.values.password) && /\d+/.test(formState.values.password) && formState.values.password.length >= 8)
    {
      if(formState.values.password != formState.values.confirmPassword){
        return Swal.fire({
          icon: 'warning',
          title: 'Espera',
          text: 'las contraseñas no coinciden',          
        })
      }else{
        api.postData("resetPassword?token="+tokenParam,{ password: formState.values.password , token:tokenParam  })
        .then( data => {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Contraseña registrada, ahora ingresa al sistema',          
          })
          history.push('sign-in');
        })
        .catch( error => {
          return Swal.fire({
            icon: 'error',
            title: 'Ooops',
            text: 'Sucedio un error en el servidor',          
          })
        })
      }
    }else{
      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: 'la contraseña deben incluir una mayuscula, una minuscula y un número por lo menos',          
      })
    }

  
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: "4%", marginBottom: "4%"}} >
      <CssBaseline />
      <img src={clicalPicture} alt="Clickal Icon"></img>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modifica tu contraseña
        </Typography>
        <form className={classes.form}   onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          { /*
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          />*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}           
          >
            Cambiar contraseña e Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              { /*<Link href="#" variant="body2">
                ¿ Olvidaste la contraseña ?
               </Link>*/ } 
            </Grid>
          
          </Grid>
        </form>
      </div>
     
    </Container>
  );
};
 
export default RecoverPassword;

