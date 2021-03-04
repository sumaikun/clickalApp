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
        
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          {/*<LatestProducts />*/}
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders appointments={props.appointments} />
        </Grid>
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
