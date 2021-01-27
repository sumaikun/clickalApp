import 'date-fns';
import React, { useState  , useEffect  } from 'react';
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

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import  api  from '../../../../middleware/api'



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
  
    props.changeDetails(event.target.name,event.target.value)

  };

  const [cities, setCities ] = useState([]);

  const [typesId, setTypesId ] = useState([]);

  useEffect(() => {
    
    const getCityTypes = async () => {
      const response = await api.getData("cityTypes") 
      setCities(response.data)
    }

    getCityTypes() 

    const getDocumentsTypes = async () => {
      const response = await api.getData("contactDocumentType") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setTypesId(arrayData)
    }

    getDocumentsTypes() 
  

  },[]);

  const errors =  new Array(5)

  const rules = (key,value) =>{
    switch(key){
      
      case "name":

        errors[0] = value.length > 0 && value.length < 3 ?
         "El nombre debe tener mas de tres digitos" : false       

        return  errors[0]
        
      case "lastName":

        errors[1] = value.length > 0 && value.length < 3 ?
          "El color debe tener mas de tres digitos" : false       

        return  errors[1]
      
      case "address":

        errors[2] = value.length > 0 && ( value.length < 7 || !value.match(/\w*[a-zA-Z]\w*/) ) ?
          "La dirección debe tener al menos un número y una letra y por lo menos 7 digitos" : false

        return  errors[2]

      case "phone":

        errors[3] = value.length > 0 && (value.length > 10 || value.length < 7)   ?
        "El número telefónico debe tener entre 7 a 10 dígitos":false
      
        return  errors[3]

      case "phone2":

        errors[4] = value.length > 0 && (value.length > 10 || value.length < 7)   ?
        "El número telefónico debe tener entre 7 a 10 dígitos":false
      
        return  errors[4]


      default:
        return false
    } 
  }

  const savePatient = () =>{
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
          subheader="Ingresar la información del paciente"
          title="Paciente"
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("name",props.patientDetails.name)}
                error = {rules("name",props.patientDetails.name)}            
                label="Nombre"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={props.patientDetails.name}
                variant="outlined"
                disabled={ mode === "watch" } 
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("lastName",props.patientDetails.lastName)}
                error = {rules("lastName",props.patientDetails.lastName)}            
                label="Apellidos"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                required
                value={props.patientDetails.lastName}
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
                InputLabelProps={{ shrink: !!props.patientDetails.city }}
                value={props.patientDetails.city}  
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
                helperText={rules("address",props.patientDetails.address)}
                error = {rules("address",props.patientDetails.address)}
                label="Dirección"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                value={props.patientDetails.address}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
            
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("email",props.patientDetails.email)}
                error = {rules("email",props.patientDetails.email)}
                label="Correo electrónico"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={props.patientDetails.email}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("phone",props.patientDetails.phone)}
                error = {rules("phone",props.patientDetails.phone)}
                label="Número de teléfono"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={props.patientDetails.phone}
                required
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>


            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("phone2",props.patientDetails.phone2)}
                error = {rules("phone2",props.patientDetails.phone2)}
                label="Número de teléfono 2"
                margin="dense"
                name="phone2"
                onChange={handleChange}
                type="number"
                value={props.patientDetails.phone2}
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
                    value={props.patientDetails.birthDate ?  props.patientDetails.birthDate : null }
                    onChange={(date)=>handleDateChange("birthDate",date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    disabled={ mode === "watch" }
                />

              </Grid>
            </MuiPickersUtilsProvider>

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
                InputLabelProps={{ shrink: !!props.patientDetails.typeId }}
                value={props.patientDetails.typeId}  
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
                helperText={rules("identification",props.patientDetails.identification)}
                error = {rules("identification",props.patientDetails.identification)}
                label="Número de identificación"
                margin="dense"
                name="identification"
                onChange={handleChange}
                type="number"
                value={props.patientDetails.identification}
                required
                variant="outlined"
                disabled={ mode === "watch" }
              />
          
             </Grid>

             <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("ocupation",props.patientDetails.ocupation)}
                error = {rules("ocupation",props.patientDetails.ocupation)}            
                label="Ocupación"
                margin="dense"
                name="ocupation"
                onChange={handleChange}
                required
                value={props.patientDetails.ocupation}
                variant="outlined"
                disabled={ mode === "watch" } 
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("stratus",props.patientDetails.stratus)}
                error = {rules("stratus",props.patientDetails.stratus)}            
                label="Estrato"
                margin="dense"
                name="stratus"
                onChange={handleChange}
                required
                value={props.patientDetails.stratus}
                variant="outlined"
                disabled={ mode === "watch" }
              />
            </Grid>
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={savePatient}
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
