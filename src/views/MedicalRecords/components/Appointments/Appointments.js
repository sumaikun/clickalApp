import 'date-fns';
import React, { useState  , useEffect  } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {  Divider,  Typography,  Grid, Button,  Table,  TableBody,  TableCell,  TableHead,  TableRow } from '@material-ui/core';
import Swal from 'sweetalert2'

const doStyles = makeStyles(theme => ({
    root: {},
    content: {
      padding: 0
    },
    inner: {
      minWidth: 1050
    },
    nameContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      marginRight: theme.spacing(2)
    },
    actions: {
      justifyContent: 'flex-end'
    }
}));

const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};

const Appointments = props => {

  const classes = doStyles(); 

  useEffect(() => {
  },[]);  

  return (
    <>
    <Grid lg={12} md={12} xs={12}>    

        <Grid  container direction="row" justify="center" alignItems="center">
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table fullWidth>
                <TableHead>
                    <TableRow>                  
                      <TableCell>Anotación</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Motivo de la consulta</TableCell>
                      <TableCell>Resultados de la consulta</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    props.appointments.slice(0).reverse().map( appointment => ( 
                    <TableRow>
                        <TableCell>{ appointment?.agendaAnnotation || "sin anotación de agenda" }</TableCell>
                        <TableCell>{ appointment?.state }</TableCell>
                        <TableCell>{ appointment?.reasonForConsultation }</TableCell>
                        <TableCell>{ appointment?.resultsForConsultation }</TableCell>
                        <TableCell>{ appointment?.date.split(" ")[0] }</TableCell>
                        <TableCell>

                        <Button color="secondary"
                        onClick={()=>{
                          if( appointment?.state !== "DONE"){
                            return Swal.fire("Espera","Solo las citas completamente terminadas permiten ver la información completa","warning")
                          }
                          props.seeCompleteInfo(appointment)
                        }}
                        >Ver info completa</Button>

                        </TableCell>
                    </TableRow>
                    ))
                }
                    
                </TableBody>
                </Table>
            </div>
            </PerfectScrollbar>
        </Grid>

        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>    
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} onClick={()=>props.manageNewAppointment()}>
                Gestionar cita
            </Button>
        </Grid>


       
    </Grid>
 
    </>
  );
};

Appointments.propTypes = {
  className: PropTypes.string
};

export default Appointments;
