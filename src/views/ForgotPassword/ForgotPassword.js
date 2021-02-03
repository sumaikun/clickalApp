import React, { useState } from 'react';
//import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Typography,
  Avatar,
  Container,
  CssBaseline,
} from '@material-ui/core';
import { loginUser } from "actions/auth";
import Swal from 'sweetalert2'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import api from "../../middleware/api";
import clicalPicture from 'assets/branding/Clicalmedic/svgClical2.svg'

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


const ForgotPassword = props => {

  //console.log("props",props);

  const [ email, setEmail ] = useState(null)

  const [ loading, setLoading ] = useState(false)

  const classes = useStyles();

  const validateEmail = (email) => 
  {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
  }

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: "4%", marginBottom: "4%"}} >
      <CssBaseline />
      <img src={clicalPicture} alt="Clickal Icon"></img>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ¿ Cual es tu correo de usuario ?
        </Typography>
        <form className={classes.form}   onSubmit={(e)=>{
            e.preventDefault()
            if(!loading)
            {
                setLoading(true)

                api.postData("forgotPassword", { email })
                .then(( response ) => {
                    //console.log("response",response)
                    setLoading(false)
                    if(response.status == "200")
                    {
                        Swal.fire('Correo enviado','verifica las instrucciones en el correo electrónico','success').then(
                            any => {
                                if(any)
                                {
                                    props.history.push("/")
                                }                    
                            }
                        )
                    }
                    
                })
                .catch(err => { 
                    Swal.fire('Espera','sucedio un error intentando enviar el correo de recuperación','error')
                    setLoading(false)
                });
            }
         
            
        }}>
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
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={ !validateEmail(email) }           
          >
            Recuperar contraseña
          </Button>


        </form>
      </div>
     
    </Container>
  );
};

const mapDispatchToProps = {
  loginUser
 };
 
export default withRouter(ForgotPassword);

