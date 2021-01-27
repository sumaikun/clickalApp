import 'date-fns';
import React, { useState  , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Divider,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,  
} from '@material-ui/core';
import Swal from 'sweetalert2'
import { Appointment as AppointmentModel } from "models/Appointment";

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

  const [open, setOpen] = useState(false);

  useEffect(() => {
  },[]);  

  const closeDialog = () =>{
    setOpen(false)
  }

  const errors =  new Array(1)

  const rules = (key,value) =>{
    switch(key){
        case "reasonForConsultation":

          errors[0] = value.length > 0 && value.length < 80 ?
          "La razón de consulta debe tener mas de 80 carácteres" : false    
          
          return  errors[0]

        case "resultsForConsultation":

          errors[1] = value.length > 0 && value.length < 80 ?
          "Los resultados de consulta debe tener mas de 80 carácteres" : false    
            
          return  errors[1]

        default:
          return true
    }
  }

  const handleChange = event => {
    
    //console.log(event,event.target)
    //console.log(event.target.name,event.target.value,event.target.checked,event.target.type)
    if( event.target.type === "checkbox" )
    {
        setData(event.target.name,event.target.checked)
    }
    else{
        setData(event.target.name,event.target.value)
    }

  };

  const [values, setValues] = useState(new AppointmentModel())

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })    
  }

  return (
    <Grid lg={12} md={12} xs={12}>    

        <Grid  container direction="row" justify="center" alignItems="center">
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table>
                <TableHead>
                    <TableRow>                  
                      <TableCell>Veterinario/a</TableCell>
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
                        <TableCell>{ appointment.userDetails[0].name }</TableCell>
                        <TableCell>{ appointment.reasonForConsultation }</TableCell>
                        <TableCell>{ appointment.resultsForConsultation }</TableCell>
                        <TableCell>{ appointment.date.split(" ")[0] }</TableCell>
                        <TableCell>

                        <Button color="secondary"
                              onClick={()=>{
                                setValues(appointment)
                                setOpen(true)
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
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} onClick={()=>{
              setOpen(true)
              setValues( new AppointmentModel() )
            }}>
                Gestionar nueva cita
            </Button>
        </Grid>


        <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Plan terapeutico
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                   Información de plan terapeutico
                </DialogContentText>               
                  <Grid  container>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Motivo de la consulta" margin="dense"
                        value={values.reasonForConsultation} onChange={handleChange}
                        name="reasonForConsultation"  variant="outlined"
                        helperText={rules("reasonForConsultation",values.reasonForConsultation)}
                        error = {rules("reasonForConsultation",values.reasonForConsultation)}
                        multiline rows={3} />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Resultados y o conclusiones de la consulta" margin="dense"
                            name="resultsForConsultation"  variant="outlined"
                            value={values.resultsForConsultation} onChange={handleChange}
                            helperText={rules("resultsForConsultation",values.resultsForConsultation)}
                            error = {rules("resultsForConsultation",values.resultsForConsultation)}
                            multiline rows={3} />          
                    </Grid>
                    

                    <Divider></Divider>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button color="primary" variant="contained" style={{marginTop:"10px"}} 
                          onClick={()=>{

                            let errorValidation = false

                            errors.forEach(data => {
                                if(data != false){  errorValidation = true  }
                            })

                            if(errorValidation)
                            {
                              setOpen(false)
                                return Swal.fire({
                                    icon: 'warning',
                                    title: 'Espera',
                                    text: "Tienes error en los datos suministrados, revisalos",          
                                }).then( data => {
                                  setOpen(true)
                                })                        
                            }

                            if( !values.reasonForConsultation )
                            {
                                setOpen(false)
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Espera',
                                    text: "La razón de consulta es un dato obligatorio",          
                                }).then( data => {
                                  setOpen(true)
                                })
                            }
                            else{
                                setOpen(false)
                                props.saveOrUpdateAppointment(values,()=>{
                                  setOpen(true)
                                })
                            }



                          }}
                        >
                            Guardar
                        </Button>
                    </Grid> 

                  </Grid>




                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={closeDialog} color="primary">
                    Cancelar
                </Button>
           
            </DialogActions>
        </Dialog>         

    </Grid>  
  );
};

Appointments.propTypes = {
  className: PropTypes.string
};

export default Appointments;
