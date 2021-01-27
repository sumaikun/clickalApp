import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FormFile, FormDetails } from './components';

import { connect } from 'react-redux';

import { saveProduct } from 'actions/medicines';

import { uploadFileToServer, deleteFile } from 'actions/app'

import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const ProductForm = props => {
  const classes = useStyles();


  console.log("props product form",props.productsState.selectedProduct)

  const [values, setValues] = useState({
    _id:  props.productsState.selectedProduct._id || props.productsState.selectedProduct.id,
    name: props.productsState.selectedProduct.name,
    value: props.productsState.selectedProduct.value,
    description: props.productsState.selectedProduct.description,
    picture: props.productsState.selectedProduct.picture ? props.productsState.selectedProduct.picture : null,
    administrationWay: props.productsState.selectedProduct.administrationWay,
    presentation: props.productsState.selectedProduct.presentation,
    file: null
  });

  const changeValues = (key,value) =>
  {

    console.log(key,value);
    setValues({
      ...values,
      [key]: value
    });
  
    console.log(values)
  }

  const submitData = (errors) => {
    
    const product = values;

    if(props.productsState.selectedProduct.id)
    {
      product._id = props.productsState.selectedProduct.id
    }

    if(product.name === "" || product.name === "" 
    ||  product.value === "" || product.description === ""
    ||  product.administrationWay === "" || product.presentation === "") 
    {
      return Swal.fire({
        icon: 'error',
        title: 'Espera',
        text: "Debe llenar todos los datos obligatorios para continuar",          
      })
    }

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

    if(values.file != null)
    {
      console.log("send file")
      uploadFileToServer(values.file,(response,err)=>{
        if(response){

          if(values.picture)
          {
            deleteFile(values.picture)
          }

          values.picture = response.data.filename
          props.saveProduct(values,(res,err)=>{
           
            if(res){
              return Swal.fire({
                icon: 'success',
                title: 'Bien',
                text: "Datos registrados",          
              })
            }

          })
        }else{
          return Swal.fire({
            icon: 'error',
            title: 'Espera',
            text: "Hubo un error subiendo el archivo",          
          })
        }
      })
    }
    else{

      console.log("product to save",values);

      props.saveProduct(values,(res,err)=>{
       
        
        if(res){
          return Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: "Datos registrados",          
          })
        }
        
        
        
      })
    }

  } 

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >        
          <FormFile  productDetails={values} changeDetails={changeValues} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >      
          <FormDetails changeDetails={changeValues} productDetails={values} submitData={submitData}  />
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    productsState: state.products,  
  };
}


export default  connect(mapStateToProps, { saveProduct  } )(ProductForm);
