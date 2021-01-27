import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Password } from './components';
import { getDoctorConfig, saveDoctorConfig, updateDoctorConfig } from "actions/settings";

import { connect } from "react-redux";
import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = (props) => {
  const classes = useStyles();

  useEffect(()=>{

    props.getDoctorConfig(props.auth.user._id)
  
  },[])

  const saveSetting = (setting) => {

    const settingToSave = { ...setting, doctor: props.auth.user._id }

    if(props.doctorSetting)
    {
      //console.log("settingToSave",settingToSave,"props.doctorSetting",props.doctorSetting)
      console.log("props.doctorSetting.id",props.doctorSetting._id)
      props.updateDoctorConfig(props.doctorSetting._id,settingToSave,( success, error ) =>{
        if(success && !error ){
          return Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: "Configuración guardada",          
          })
        }
      })
      
    }
    else{
      //console.log("settingToSave",settingToSave,"props.doctorSetting",props.doctorSetting)
      props.saveDoctorConfig(settingToSave,( success, error ) =>{
        if(success && !error ){
          return Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: "Configuración guardada",          
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
          md={7}
          xs={12}
        >
          <Notifications saveSetting={saveSetting} doctorSetting={props.doctorSetting} />
        </Grid>
        
        <Grid
          item
          md={5}
          xs={12}
        >
          <Password />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  console.log("state",state)
  return {
    auth: state.auth,  
    doctorSetting: state.settings.doctorSetting
  };
}

export default  connect(mapStateToProps, { getDoctorConfig, saveDoctorConfig, updateDoctorConfig  } )(Settings);

