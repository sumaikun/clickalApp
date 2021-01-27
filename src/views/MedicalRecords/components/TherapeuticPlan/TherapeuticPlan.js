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
import PatientsMedicine from 'views/PatientList/components/PatientsMedicine'
import { TherapeuticPlan as TherapeuticPlanModel } from "models/therapeuticPlan";

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

const TherapeuticPlan = props => {

  const classes = doStyles(); 

  const {  products,  ...rest } = props;

  const [ planTypes, setPlanTypes ] = useState([]);

  useEffect(() => {
    
    const getPlanTypes = async () => {
      const response = await api.getData("planTypes") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
      setPlanTypes(arrayData) 

    }

  getPlanTypes()
  },[]);  

  //Terapia de sosten
  //Tratamiento preventivo
  //Tratamiento sintomatico
  //Tratamiento etiologico 

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [selectedProduct, setSelectedProduct ] = useState(null)

  const closeDialog = () =>{
    setOpen(false)
  }

  const openMedicinesModal = () => {
    setOpen2(true)
  }

  const selectProduct = (data) => {
    //console.log("product selected",data)
    setSelectedProduct(data)
  }

  const handleClose2 = () => {
    setOpen2(false)
  }

  const [values, setValues] = useState(new TherapeuticPlanModel())

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

  const errors =  new Array(2)

  const rules = (key,value) =>{
    switch(key){
        case "posology":

          errors[0] = value.length > 0 && value.length < 5 ?
          "La posologia debe tener mas de 5 carácteres" : false    
          
          return  errors[0]

        case "totalDose":

          errors[1] = value.length > 0 && value.length < 5 ?
          "La dosis total debe tener mas de 5 carácteres" : false    
            
          return  errors[1]
        
        case "frecuencyAndDuration":

          errors[2] = value.length > 0 && value.length < 5 ?
          "La frecuencia y duración debe tener mas de 5 carácteres" : false    
            
          return  errors[2]

        default:
          return true
    }
  }

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
                        <TableCell>Tipo de plan</TableCell>
                        <TableCell>Principio activo a administrar</TableCell>
                        <TableCell>Presentación</TableCell>
                        <TableCell>Posologia</TableCell>
                        <TableCell>Dosis total</TableCell>
                        <TableCell>Via</TableCell>
                        <TableCell>Frecuencia/duración</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                      props.therapeuticPlans.slice(0).reverse().map( plan => ( 

                        <TableRow>
                          <TableCell>{ 
                            planTypes.length > 0 ?
                              planTypes.filter( type => plan.typeOfPlan === type.value)[0].label:
                              null
                           }</TableCell>
                          <TableCell>{
                            
                            products ? 
                              products.filter( product => plan.activeSubstanceToAdminister === product._id )[0].name
                              : false
                           
                           }</TableCell>
                          <TableCell>{
                            
                            products ? 
                              products.filter( product => plan.activeSubstanceToAdminister === product._id )[0].presentation
                              : false
                           
                           }</TableCell>
                          <TableCell>{ plan.posology }</TableCell>
                          <TableCell>{ plan.totalDose }</TableCell>
                          <TableCell>{
                            
                            products ? 
                              products.filter( product => plan.activeSubstanceToAdminister === product._id )[0].administrationWay
                              : false
                           
                           }</TableCell>
                          <TableCell>{ plan.frecuencyAndDuration }</TableCell>
                          <TableCell>{ plan.date.split(" ")[0] }</TableCell>
                          <TableCell>
                          <Button color="secondary"
                              onClick={()=>{

                                const filteredProduct = products.filter( product => plan.activeSubstanceToAdminister === product._id )[0]

                                setSelectedProduct(filteredProduct)

                                setValues(plan)
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
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}  onClick={()=>{
              setSelectedProduct(null)
              setValues( new TherapeuticPlanModel() )
              setOpen(true)
            }} >
                Crear nuevo plan terapeutico
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
                        <TextField
                            fullWidth
                            label="Tipo de plan"
                            margin="dense"
                            name="typeOfPlan"
                            required
                            select                                   
                            variant="outlined"
                            SelectProps={{ native: true }}
                            onChange={handleChange}
                            value={values.typeOfPlan}
                        >
                            {planTypes.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <Button color="success" fullWidth variant="contained" style={{marginTop:"10px"}}
                            onClick={ () => {
                                openMedicinesModal()
                            }}
                        >
                            Seleccionar medicamento
                        </Button> 
                        <Typography style={{ textAlign:"center" }} variant="button" >
                            { selectedProduct ? "Producto seleccionado : "+selectedProduct.name : null }
                        </Typography>                                   
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth 
                          label="Posología"
                          margin="dense"
                          name="posology"
                          variant="outlined"
                          onChange={handleChange}
                          value={values.posology}
                          helperText={rules("posology",values.posology)}
                          error = {rules("posology",values.posology)}
                    />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Dosis total" margin="dense"
                        name="totalDose"  variant="outlined"
                        onChange={handleChange}
                        value={values.totalDose}
                        helperText={rules("totalDose",values.totalDose)}
                        error = {rules("totalDose",values.totalDose)}
                    />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Frecuencia y duración" margin="dense"
                        name="frecuencyAndDuration"  variant="outlined"
                        onChange={handleChange}
                        value={values.frecuencyAndDuration}
                        helperText={rules("frecuencyAndDuration",values.frecuencyAndDuration)}
                        error = {rules("frecuencyAndDuration",values.frecuencyAndDuration)}
                    />
                    </Grid>

                    <Divider></Divider>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button color="primary" variant="contained" style={{marginTop:"10px"}}
                          onClick={()=>{
                            
                            console.info("values",values)

                            if(selectedProduct && selectedProduct._id)
                            {
                              values.activeSubstanceToAdminister = selectedProduct._id
                            }

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

                            if( !values.typeOfPlan || !values.activeSubstanceToAdminister ||
                              !values.posology || !values.totalDose || !values.frecuencyAndDuration )
                            {
                              setOpen(false)
                              Swal.fire({
                                  icon: 'warning',
                                  title: 'Espera',
                                  text: "Todos los datos son obligatorios para continuar",          
                              }).then( data => {
                                setOpen(true)
                              })
                            }
                            else{
                              setOpen(false)
                              props.saveOrUpdateTherapeuticPlan(values,()=>{
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

        <PatientsMedicine selectProduct={selectProduct}  products={products} open={open2} handleClose={handleClose2} />

    </Grid>  
  );
};

TherapeuticPlan.propTypes = {
  className: PropTypes.string
};

export default TherapeuticPlan;
