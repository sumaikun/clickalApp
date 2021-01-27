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

const ConfirmAccount = props => {

  //console.log("props",props);

  const { history } = props;

  //console.log("history",history)

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

        api.postData("confirmAccount?token="+tokenParam,{ token:tokenParam  })
        .then( data => {
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'Cuenta habilitada, ahora ingresa al sistema',          
          }).then( any => window.location.assign('sign-in') )
          
        })
        .catch( error => {
          console.log("error",error)
          return Swal.fire({
            icon: 'error',
            title: 'Ooops',
            text: 'Sucedio un error en el servidor',          
          })
        })
  
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: "4%", marginBottom: "4%"}} >
      <CssBaseline />
      <img style={{ marginTop:"20%" }} src={clicalPicture} alt="Clickal Icon"></img>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirma tu cuenta
        </Typography>
        <form className={classes.form}   onSubmit={handleSubmit}>
        
   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}           
          >
            Confirmar cuenta e ingresar
          </Button>
        </form>
      </div>
     
    </Container>
  );
};
 
export default ConfirmAccount;

