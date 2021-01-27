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

import  api  from 'middleware/api'
import Swal from 'sweetalert2'
import { DetectedDisease as DetectedDiseaseModel } from "models/DetectedDisease";

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

const Diseases = props => {

  const classes = doStyles(); 

  const [open, setOpen] = useState(false);

  const [ diseases, setDiseases ] = useState([]);

  useEffect(() => {
    const getDiseases = async () => {
      const response = await api.getData("diseases") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
      setDiseases(arrayData) 

    }

    getDiseases()
  },[]);  

  const [values, setValues] = useState(new DetectedDiseaseModel())

  const closeDialog = () =>{
    setOpen(false)
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

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })    
  }

  const errors =  new Array(1)

  const rules = (key,value) =>{
    switch(key){
        case "criteria":

          errors[0] = value.length > 0 && value.length < 80 ?
          "El criterio debe tener mas de 80 carácteres" : false    
          
          return  errors[0]

        case "observations":

          errors[1] = value.length > 0 && value.length < 80 ?
          "Las observaciones debe tener mas de 80 carácteres" : false    
            
          return  errors[1]

        default:
          return true
    }
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
                        <TableCell>Enfermedad</TableCell>
                        <TableCell>Criterio de diagnostico</TableCell>
                        <TableCell>Observaciones</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {
                    props.detectedDiseases.slice(0).reverse().map( disease => ( 
                      <TableRow>
                        <TableCell>{ disease.userDetails[0].name }</TableCell>
                        <TableCell>{  
                              diseases ? 
                              diseases.filter( dis => disease.disease === dis.value )[0]?.label
                              : false  }</TableCell>
                        <TableCell>{ disease.criteria }</TableCell>
                        <TableCell>{ disease.observations }</TableCell>
                        <TableCell>{ disease.date.split(" ")[0] }</TableCell>
                        <TableCell>
                          <Button color="secondary"
                                onClick={()=>{
                                  setValues(disease)
                                  setOpen(true)
                                }}
                          >Info completa</Button>
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
              setValues( new DetectedDiseaseModel() )
            }}>
                Asociar nueva enfermedad
            </Button>
        </Grid>


        <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Enfermedad detectada
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                   Información de la enfermedad detectada
                </DialogContentText>               
                  
                  <Grid  container>

                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth label="Enfemedad"
                            margin="dense" name="disease"
                            value={values.disease}
                            onChange={handleChange}
                            required
                            select                                   
                            variant="outlined"
                            SelectProps={{ native: true }}

                        >
                            { diseases.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                            )) }
                        </TextField>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Criterio de diagnostico" margin="dense"
                            name="criteria"  variant="outlined"
                            helperText={rules("criteria",values.criteria)}
                            error = {rules("criteria",values.criteria)}
                            value={values.criteria} onChange={handleChange}
                            multiline rows={3} />          
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Observaciones" margin="dense"
                            name="observations"  variant="outlined"
                            helperText={rules("observations",values.observations)}
                            error = {rules("observations",values.observations)}
                            value={values.observations} onChange={handleChange}
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

                            console.log(values)

                            if( !values.disease || !values.criteria || !values.observations )
                            {
                                setOpen(false)
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Espera',
                                    text: "Todos los datos son obligatorios",          
                                }).then( data => {
                                  setOpen(true)
                                })
                            }
                            else{
                                setOpen(false)
                                props.saveOrUpdateDetectedDisease(values,()=>{
                                  setOpen(true)
                                })
                            }

                          }} >
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

Diseases.propTypes = {
  className: PropTypes.string
};

export default Diseases;
