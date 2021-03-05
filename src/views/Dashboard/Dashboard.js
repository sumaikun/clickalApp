import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  //LatestProducts,
  LatestOrders
} from './components';
import { getAppointments } from 'actions/appointments'

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
        
        <LatestOrders appointments={props.appointments} />
        
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {

  const { appointments } = state.appointments

  return {
   appointments
  };
}

export default connect(mapStateToProps, { getAppointments })(Dashboard);
