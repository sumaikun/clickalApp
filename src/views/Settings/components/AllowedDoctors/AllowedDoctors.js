import React, { useState , useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import  DoctorTable  from '../../../DoctorList/components/DoctorsTable/DoctorsTable';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));



const AllowedDoctors = props => {

  const { className, doctors,  ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
        <CardHeader
          subheader="Configuración para agenda"
          title=""
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Typography gutterBottom variant="h6">Accesos a historia medica</Typography>

                <DoctorTable doctors={doctors} />

            </Grid> 
            
          </Grid>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="outlined" >Habilitar Acceso</Button>
          <Button color="secondary" variant="outlined" >Revocar Acceso</Button>
        </CardActions>
    </Card>
  );
};

export default AllowedDoctors;
