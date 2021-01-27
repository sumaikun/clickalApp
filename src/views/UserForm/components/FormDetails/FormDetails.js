import 'date-fns';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import  api  from '../../../../middleware/api'


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';



const useStyles = makeStyles(() => ({
  root: {}
}));

const FormDetails = props => {
  const { className, mode, ...rest } = props;

  const classes = useStyles();

  const handleDateChange = (key,date) => {
    
    props.changeDetails(key,date)
    
  };
 

  const handleChange = event => {
    console.log(event.target.name,event.target.value)
    props.changeDetails(event.target.name,event.target.value)

  };

  const [userRoles, setUserRoles ] = useState([]);

  const [typesId, setTypesId ] = useState([]);

  const [cities, setCities ] = useState([]);

  const [userStates, setUserStates ] = useState([]);

  useEffect(() => {

    const getRoles = async () => {
      const response = await api.getData("userRoles") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setUserRoles(arrayData) 
    }

    getRoles()

    const getDocumentsTypes = async () => {
      const response = await api.getData("contactDocumentType") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setTypesId(arrayData)
    }

    getDocumentsTypes() 
    
    const getCityTypes = async () => {
      const response = await api.getData("cityTypes") 
      setCities(response.data)
    }

    getCityTypes() 

    const getUserStates = async () => {
      const response = await api.getData("userStates") 
      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setUserStates(arrayData)
    }

    getUserStates() 

    

  },[]); 
  
  const errors =  new Array(5)

  const rules = (key,value) =>{
    switch(key){
      case "name":

        errors[0] = value.length > 0 && value.length < 3 ?
         "El nombre debe tener mas de tres digitos" : false       

        return  errors[0]

      case "address":

        errors[1] = value.length > 0 && ( value.length < 7 || !value.match(/\w*[a-zA-Z]\w*/) ) ?
         "La dirección debe tener al menos un número y una letra y por lo menos 7 digitos" : false

        return  errors[1]
         
      case "email":

        errors[2] = value.length > 0 && ( !value.match(/\S+@\S+\.\S+/) ) ?
          "No es un correo valido":false
        
          return  errors[2]

      case "phone":

        errors[3] = value.length > 0 && (value.length > 10 || value.length < 7)   ?
        "El número telefónico debe tener entre 7 a 10 dígitos":false
      
        return  errors[3]

        case "password":

          errors[4] = value.length > 0 && (  !value.match(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/) )  ?
          "La contraseña debe tener una mayuscula, una minuscula y tener al menos 8 dígitos":false
        
          return  errors[4]

        case "confirmPassword":      

          
          errors[5] = value.confirmPassword.length > 0 && value.password != value.confirmPassword ?
            "Las contraseñas deben coincidir":false         
          
          return  errors[5]


      default:
        return false
    } 
  }

  const saveUser = () =>{
    props.submitData(errors)
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Ingresar la información del usuario"
          title="Usuario"
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("name",props.userDetails.name)}
                error = {rules("name",props.userDetails.name)}            
                label="Nombres"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={props.userDetails.name}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("lastName",props.userDetails.lastName)}
                error = {rules("lastName",props.userDetails.lastName)}            
                label="Apellidos"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={props.userDetails.lastName}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
                InputLabelProps={{ shrink: !!props.userDetails.city }}
                value={props.userDetails.city}  
                variant="outlined"
                disabled={ mode === "watch" }
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("address",props.userDetails.address)}
                error = {rules("address",props.userDetails.address)}
                label="Dirección"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={props.userDetails.address}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("email",props.userDetails.email)}
                error = {rules("email",props.userDetails.email)}
                label="Correo electrónico"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={props.userDetails.email}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("phone",props.userDetails.phone)}
                error = {rules("phone",props.userDetails.phone)}
                label="Número de teléfono"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={props.userDetails.phone}
                required
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("password",props.userDetails.password)}
                error = {rules("password",props.userDetails.password)}
                label="Contraseña"
                margin="dense"
                name="password"
                onChange={handleChange}
                type="password"
                value={props.userDetails.password}               
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("confirmPassword",{ password:props.userDetails.password,confirmPassword:props.userDetails.confirmPassword})}
                error = {rules("confirmPassword",{ password:props.userDetails.password,confirmPassword:props.userDetails.confirmPassword})}
                label="Confirmar contraseña"
                margin="dense"
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                value={props.userDetails.confirmPassword}                                
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
           <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Rol de usuario"
                margin="dense"
                name="role"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.userDetails.role }}
                value={props.userDetails.role}  
                variant="outlined"
                disabled={ mode === "watch" }
              >
                {userRoles.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Estado"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.userDetails.state }}
                value={props.userDetails.state}  
                variant="outlined"
                disabled={ mode === "watch" }
              >
                {userStates.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo de identificación"
                margin="dense"
                name="typeId"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.userDetails.typeId }}
                value={props.userDetails.typeId}  
                variant="outlined"
                disabled={ mode === "watch" }
              >
                {typesId.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>         

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("identification",props.userDetails.identification)}
                error = {rules("identification",props.userDetails.identification)}
                label="Número de identificación"
                margin="dense"
                name="identification"
                onChange={handleChange}
                type="number"
                value={props.userDetails.identification}
                required
                variant="outlined"
                disabled={ mode === "watch" }
              />
          
             </Grid>

             <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item md={6} xs={12} container justify="space-around">        

                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de nacimiento"
                    format="MM/dd/yyyy"
                    value={props.userDetails.birthDate ?  props.userDetails.birthDate : null }
                    onChange={(date)=>handleDateChange("birthDate",date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    disabled={ mode === "watch" }
                />

              </Grid>
            </MuiPickersUtilsProvider>
            
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={saveUser}
            disabled={ mode === "watch" }
          >
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

FormDetails.propTypes = {
  className: PropTypes.string
};

export default FormDetails;
