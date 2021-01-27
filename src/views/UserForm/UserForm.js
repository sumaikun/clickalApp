import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FormProfile, FormDetails } from './components';

import { connect } from 'react-redux';

import { saveUser } from 'actions/users';

import { uploadFileToServer, deleteFile } from 'actions/app'

import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const UserForm = props => {
  const classes = useStyles();

  const mode = props.location.state.mode

  console.log("mode",mode)

  console.log("props user form",props.usersState.selectedUser)

  const [values, setValues] = useState({
    _id:  props.usersState.selectedUser._id || props.usersState.selectedUser.id,
    name: props.usersState.selectedUser.name,
    lastName: props.usersState.selectedUser.lastName,
    city: props.usersState.selectedUser.city,
    email: props.usersState.selectedUser.email,
    phone: props.usersState.selectedUser.phone,
    address: props.usersState.selectedUser.address,
    role: props.usersState.selectedUser.role,
    state: props.usersState.selectedUser.state,
    birthDate: props.usersState.selectedUser.birthDate,
    typeId: props.usersState.selectedUser.typeId,
    identification: props.usersState.selectedUser.identification,
    picture: props.usersState.selectedUser.picture ? props.usersState.selectedUser.picture : null,
    password: '',
    confirmPassword: '',
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
    
    const user = values; 

    if(props.usersState.selectedUser.id)
    {
      user._id = props.usersState.selectedUser.id
    }

    if(user.name === "" || user.email === "" ||  user.phone === "" || user.address === "") 
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



          props.saveUser(values,(res,err)=>{
           
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

      console.log("user to save",values);

      props.saveUser(values,(res,err)=>{
       
        
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
          lg={12}
          md={6}
          xl={4}
          xs={12}
        >        
          <FormProfile mode={mode} userDetails={values} changeDetails={changeValues} />
        </Grid>
        <Grid
          item
          lg={12}
          md={6}
          xl={8}
          xs={12}
        >      
          <FormDetails mode={mode} changeDetails={changeValues} userDetails={values} submitData={submitData}  />
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    usersState: state.users,  
  };
}


export default  connect(mapStateToProps, { saveUser  } )(UserForm);
