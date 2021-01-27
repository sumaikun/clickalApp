import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FormProfile, FormDetails } from './components';

import { connect } from 'react-redux';

import { saveDoctor } from 'actions/doctors';

import { uploadFileToServer, deleteFile } from 'actions/app'

import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const DoctorForm = props => {
  const classes = useStyles();

  const mode = props.location.state?.mode ? props.location.state.mode : "form" 

  console.log("props doctor form",props.doctorsState.selectedDoctor)

  const [values, setValues] = useState({
    _id:  props.doctorsState.selectedDoctor._id || props.doctorsState.selectedDoctor.id,
    name: props.doctorsState.selectedDoctor.name,
    lastName: props.doctorsState.selectedDoctor.lastName,
    city: props.doctorsState.selectedDoctor.city,
    specialistType: props.doctorsState.selectedDoctor.specialistType,
    email: props.doctorsState.selectedDoctor.email,
    phone: props.doctorsState.selectedDoctor.phone,
    phone2: props.doctorsState.selectedDoctor.phone2,
    address: props.doctorsState.selectedDoctor.address,
    role: props.doctorsState.selectedDoctor.role,
    state: props.doctorsState.selectedDoctor.state,
    birthDate: props.doctorsState.selectedDoctor.birthDate,
    typeId: props.doctorsState.selectedDoctor.typeId,
    identification: props.doctorsState.selectedDoctor.identification,
    picture: props.doctorsState.selectedDoctor.picture ? props.doctorsState.selectedDoctor.picture : null,
    aboutDoctor: props.doctorsState.selectedDoctor.aboutDoctor,
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
    
    const doctor = values; 

    if(props.doctorsState.selectedDoctor.id)
    {
      doctor._id = props.doctorsState.selectedDoctor.id
    }

    if(doctor.name === "" || doctor.email === "" ||  doctor.phone === "" || doctor.address === "") 
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



          props.saveDoctor(values,(res,err)=>{
           
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

      console.log("doctor to save",values);

      props.saveDoctor(values,(res,err)=>{
       
        
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
          <FormProfile mode={mode} doctorDetails={values} changeDetails={changeValues} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >      
          <FormDetails mode={mode} changeDetails={changeValues} doctorDetails={values} submitData={submitData}  />
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    doctorsState: state.doctors,  
  };
}


export default  connect(mapStateToProps, { saveDoctor  } )(DoctorForm);
