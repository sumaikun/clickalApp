import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  //LatestProducts,
  LatestOrders
} from './components';
import { getAppointments, saveAppointment, getAppointmentsByPatientAndDate } from 'actions/appointments'
import { saveMedicine, getMedicinesByAppointment } from 'actions/medicines'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props) => {

  useEffect(()=>{
    props.getAppointments()
  },[])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >      
        
        <LatestOrders {...props}  />
        
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {

  console.log("state",state)

  const { appointments } = state.appointments

  return {
   appointments,
   authState: state.auth
  };
}

export default connect(mapStateToProps, { getAppointments,
   saveAppointment,
   getAppointmentsByPatientAndDate,
   saveMedicine,
   getMedicinesByAppointment})(Dashboard);
