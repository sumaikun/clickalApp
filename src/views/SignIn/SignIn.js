import React, { useState, useEffect } from 'react';
//import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { connect } from "react-redux";
import { loginUser } from "actions/auth";
import Swal from 'sweetalert2'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import clicalPicture from 'assets/branding/Clicalmedic/svgClical2.svg'

//console.log("clicalPicture",clicalPicture)

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


const SignIn = props => {

  //console.log("props",props);

  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

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

  const handleSignIn = event => {
    
    event.preventDefault()
    console.log("it is time to login")
    console.log(formState.values)
    props.loginUser(formState.values, ( success , error ) =>{
      
      console.log("done")
      
      if(success){

        history.push('/');
      }
      if(error){
        
        let errorText

        try {
          errorText = error.response.status === 401 ? 'Las credenciales no son validas, vuelva a intentarlo' : 'Hay un problema con el servidor'
        }
        catch(error) {
           errorText =  "Hay un problema de conexión al servidor"
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorText,          
        })
      }
    })
    //
  
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: "4%", marginBottom: "4%"}} >
      <CssBaseline />
      <img src={clicalPicture} alt="Clickal Icon"></img>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar al sistema
        </Typography>
        <form className={classes.form}   onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="username"
            autoComplete="email"
            type="email"
            autoFocus
            onChange={handleChange}
          />
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
            <Link  variant="body2" onClick={ (e) => {
               
              }}>
                {"¿ Olvidaste la contraseña ? Haz click aqui"}
              </Link>
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
            Ingresar
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"          
          >
            Face Login
          </Button>

          <Grid container>
            <Grid item xs>
              { /*<Link href="#" variant="body2">
                ¿ Olvidaste la contraseña ?
               </Link>*/ } 
            </Grid>
            <Grid item>          
              <Link  variant="body2" onClick={ (e) => {
                e.preventDefault()  
                props.history.push("/sign-up")
              }}>
                {"¿ No tienes una cuenta ? Registrarse"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapDispatchToProps = {
  loginUser
 };
 
export default connect(null, mapDispatchToProps)(withRouter(SignIn));

