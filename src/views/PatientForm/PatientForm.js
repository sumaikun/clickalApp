import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { FormFile, FormDetails } from './components';

import { connect } from 'react-redux';

import { savePatient } from 'actions/patients';

import { uploadFileToServer, deleteFile  } from 'actions/app'

import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));




const PatientForm = props => {
  const classes = useStyles();

  const mode = props.location.state?.mode ? props.location.state.mode : "form" 

  console.log("props patient form",props.patientsState.selectedPatient)

  const [values, setValues] = useState({
    _id:  props.patientsState.selectedPatient._id || props.patientsState.selectedPatient.id,
    name: props.patientsState.selectedPatient.name || "" ,
    lastName: props.patientsState.selectedPatient.lastName || "" ,
    typeId: props.patientsState.selectedPatient.typeId || "" ,
    identification: props.patientsState.selectedPatient.identification || "" ,
    city:props.patientsState.selectedPatient.city || null ,
    birthDate: props.patientsState.selectedPatient.birthDate || null ,
    ocupation: props.patientsState.selectedPatient.ocupation || null ,
    address: props.patientsState.selectedPatient.address || "" ,
    email: props.patientsState.selectedPatient.email || "" ,
    state: props.patientsState.selectedPatient.state || "" ,
    phone: props.patientsState.selectedPatient.phone || "" ,
    phone2: props.patientsState.selectedPatient.phone2 || "" ,    
    confirmed:props.patientsState.selectedPatient.confirmed || false ,
    stratus:props.patientsState.selectedPatient.stratus || "" , 
    doctors:props.patientsState.selectedPatient.doctors || [], 
    picture: props.patientsState.selectedPatient.picture ? props.patientsState.selectedPatient.picture : null,
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
    
    const patient = values;

    if(props.patientsState.selectedPatient.id)
    {
      patient._id = props.patientsState.selectedPatient.id
    }

    if( patient.name === "" || patient.species === "" ||  patient.breed === "" || patient.sex === ""
    || patient.age === "" ) 
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
          props.savePatient(values,(res,err)=>{
           
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

      console.log("patient to save",values);

      props.savePatient(values,(res,err)=>{
       
        
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
          md={12}
          xl={12}
          xs={12}
        >        
          <FormFile mode={mode}  patientDetails={values} changeDetails={changeValues} />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >       
          <FormDetails mode={mode}  breeds={ props.appState.breeds } species={ props.appState.species }  changeDetails={changeValues} patientDetails={values} submitData={submitData}  />
        </Grid>
      </Grid>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    patientsState: state.patients,
    appState: state.app  
  };
}


export default  connect(mapStateToProps, { savePatient } )(PatientForm);
