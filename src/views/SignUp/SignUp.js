import React, { useState, useEffect }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Swal from 'sweetalert2'
import  api  from 'middleware/api'

//import Autocomplete from '@material-ui/lab/Autocomplete'; 



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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {

  const [values, setValues] = useState(
    { 
     name:"",
     lastName:"",
     email:"",
     password:"",
     confirmPassword:"",
     phone:""
    })


  const errors =  new Array(5)

  const rules = (key,value) =>{

    //console.log("values",values)

    switch(key){
      case "name":

        errors[0] = value.length > 0 && value.length < 3 ?
         "El nombre debe tener mas de tres digitos" : false       

        return  errors[0]

      case "lastName":

        errors[1] = value.length > 0 && value.length < 3 ?
         "El apellido debe tener mas de tres digitos" : false  

        return  errors[1]
         
      case "email":

        errors[2] = value.length > 0 && ( !value.match(/\S+@\S+\.\S+/) ) ?
          "No es un correo valido":false
        
          return  errors[2]    

      case "password":

        errors[3] = value.length > 0 && (  !value.match(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/) )  ?
        "La contraseña debe tener una mayuscula, una minuscula y tener al menos 8 dígitos":false
      
        return  errors[3]

      case "confirmPassword":

        errors[4] = value.confirmPassword.length > 0 && value.password != value.confirmPassword ?
          "Las contraseñas deben coincidir":false         
          
        return  errors[4]

      case "phone":
              
        errors[5] = value.length > 0 && (value.length > 10 || value.length < 7) ?
          "El telefono debe tener entre 7 a 10 carácteres":false         
          
        return  errors[5]


      default:
        return true
    } 
  }


  const [cities, setCities ] = useState([]);

  useEffect(() => {
    
    const getCityTypes = async () => {
      const response = await api.getData("cityTypes") 
      setCities(response.data)
    }

    getCityTypes()   
    

  },[]); 


  const handleChange = event => {

    //console.log(event,event.target.name,event.target.value)

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });   

  };


  const handleCheck = (event) => {
    console.log(event.target.checked,event.target.name);

    setValues({
      ...values,
      [event.target.name]: event.target.checked
    });

  };

  const AutoCompleteChange = (event, complete, name) => {

    console.log("autocomplete changed",event,complete,name)
    
    if(values){
      setValues({
        ...values,
        [name]: complete.value
      });
      //props.changeDetails(name,values.value)
    }

  }

  const sendForm = event => {
    event.preventDefault()
    console.log("send form", values, errors.length)

    for (var i = 0; i < errors.length; i++) {
        if(errors[i])
        {
          return Swal.fire({
            icon: 'error',
            title: 'Espera',
            text: "Existen errores de validación en el formulario",          
          })
        }
    }

    if(  !values.name || !values.lastName || !values.email || !values.password || !values.confirmPassword || !values.phone || !values.city || !values.type ){
      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: "Debes llenar todos los campos",          
      })
    }   

    if( !values.confirmed ){
      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: "Si quieres registrarte debes aceptar los terminos y condiciones",          
      })
    }

   const { name, lastName, email, password, phone, city, confirmed  } = values

    const user = { name, lastName, email, password, phone, city, confirmed }

    console.log(user)

    if(values.type === "Patient")
    {
      api.postData("registerPatient",user).then(( response ) => {

        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Busca en tu correo te mandamos un mensaje de confirmación",          
        })
       
      })
      .catch(err => { console.log("Error: ", err)
       
        return Swal.fire({
          icon: 'error',
          title: 'Espera',
          text: "Intentalo de nuevo, puede estar sucediendo un problema con el servidor",          
        })
  
      })
    } 

    if(user.type === "Doctor")
    {
      api.postData("registerDoctor",user).then(( response ) => {

        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "espera que el administrador habilite tu usario y podras ingresar",          
        })
       
      })
      .catch(err => { console.log("Error: ", err)
       
        return Swal.fire({
          icon: 'error',
          title: 'Espera',
          text: "Intentalo de nuevo, puede estar sucediendo un problema con el servidor",          
        })
  
      })
    }

    /*delete user.confirmPassword

    api.postData("signUp",user).then(( response ) => {

      return Swal.fire({
        icon: 'success',
        title: 'Bien',
        text: "espera que el administrador habilite tu usario y podras ingresar",          
      })
     
    })
    .catch(err => { console.log("Error: ", err)
     
      return Swal.fire({
        icon: 'error',
        title: 'Espera',
        text: "Intentalo nueva, puede estar sucediendo un problema con el servidor",          
      })

    });*/

  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" style={{marginTop: "4%", marginBottom: "4%"}} >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <form className={classes.form} onSubmit={sendForm}  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                helperText={rules("name",values.name)}
                error = {rules("name",values.name)} 
             
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                onChange={handleChange}
                autoFocus
                value={values.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                helperText={rules("lastName",values.lastName)}
                error = {rules("lastName",values.lastName)} 
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
             
                onChange={handleChange}
                value={values.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                helperText={rules("email",values.email)}
                error = {rules("email",values.email)} 
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                
                onChange={handleChange}
                value={values.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                helperText={rules("phone",values.phone)}
                error = {rules("phone",values.phone)} 
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Teléfono o celular"
                name="phone"                
                onChange={handleChange}
                value={values.phone}
              />
            </Grid>

            <Grid item  xs={12}>
              <TextField
                fullWidth
                label="Ciudad"
                margin="dense"
                name="city"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                variant="outlined"
              >
                 <option></option>
                 {cities.map(option => (
                  <option
                    key={option._id}
                    value={option._id}
                  >
                    {option.name}
                  </option>
                ))}               
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                helperText={rules("password",values.password)}
                error = {rules("password",values.password)} 
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
              
                onChange={handleChange}
                value={values.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                helperText={rules("confirmPassword",values)}
                error = {rules("confirmPassword",values)} 
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="confirmar contraseña"
                type="password"
                id="confirmPassword"
             
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </Grid>

            <Grid item  xs={12}>
              <TextField
                fullWidth
                label="Paciente o Médico"
                margin="dense"
                name="type"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option></option>
                <option
                    key={"Patient"}
                    value={"Patient"}
                  >
                    {"Paciente"}
                </option>
                <option
                    key={"Doctor"}
                    value={"Doctor"}
                  >
                    {"Médico"}
                </option>
                
              </TextField>
            </Grid>
            
           

            <Grid item xs={12}>

              <FormControlLabel
                control={<Checkbox name="confirmed"  onChange={handleCheck} />}
                label="¿Acepta terminos y condiciones?" 
              />

            </Grid>
            
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link  variant="body2" onClick={ (e) => {
                e.preventDefault()
                props.history.push("/sign-in")
              }} >
                ¿ Ya tienes una cuenta ? Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}