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

import api from '../../../../middleware/api'

const useStyles = makeStyles(() => ({
  root: {}
}));

const FormDetails = props => {

  console.log("props",props)

  const { className, ...rest } = props;

  const classes = useStyles();

  const [administrationWays, setAdministrationWays ] = useState([]);

  const [presentations, setPresentations ] = useState([]);

  useEffect(() => {

    const getPresentations = async () => {
      const response = await api.getData("presentations") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setPresentations(arrayData)

    }

    const getAdministrationWays = async () => {
      const response = await api.getData("administrationWays") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setAdministrationWays(arrayData)

    }

    getPresentations()
    getAdministrationWays()

  },[]); 

  const handleChange = event => {
  
    props.changeDetails(event.target.name,event.target.value)

  };

  const errors =  new Array(5)

  const rules = (key,value) =>{
    switch(key){

      case "name":

        errors[0] = value.length > 0 && value.length < 3 ?
         "El nombre debe tener mas de tres digitos" : false       

        return  errors[0]

      case "value":

        errors[1] = value.length > 0 && value < 0 ?
         "El valor de un producto debe ser mayor a 0" : false

        return  errors[1]
         
      case "description":

        errors[2] = value.length > 0 && value.length < 10 ?
          "La descripción debe tener mas de 10 dígitos":false
        
          return  errors[2]

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
          subheader="Ingresar la información del producto"
          title="Producto"
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("name",props.productDetails.name)}
                error = {rules("name",props.productDetails.name)}            
                label="Nombre"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={props.productDetails.name}
                variant="outlined"
              />
            </Grid>  
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText={rules("value",props.productDetails.value)}
                error = {rules("value",props.productDetails.value)}            
                label="Valor"
                margin="dense"
                name="value"
                onChange={handleChange}
                required
                value={props.productDetails.value}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Via de administración"
                margin="dense"
                name="administrationWay"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.productDetails.administrationWay }}
                value={ props.productDetails.administrationWay }  
                variant="outlined"
              >
                {administrationWays.map(option => (
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
                label="Presentación"
                margin="dense"
                name="presentation"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!props.productDetails.presentation }}
                value={ props.productDetails.presentation }  
                variant="outlined"
              >
                {presentations.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText={rules("description",props.productDetails.description)}
                error = {rules("description",props.productDetails.description)}            
                label="Descripción"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                type="text"
                value={props.productDetails.description}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>            
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={saveUser}
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
