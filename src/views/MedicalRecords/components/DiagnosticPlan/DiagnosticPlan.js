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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import  api  from 'middleware/api'
import moment from 'moment';
import Swal from 'sweetalert2'
import SweetAlert from 'sweetalert2-react';
import { DiagnosticPlan as DiagnosticPlanModel } from "models/diagnosticPlan";

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

const DiagnosticPlan = props => {

  const classes = doStyles(); 

  const [ examTypes, setExamTypes ] = useState([]);



  useEffect(() => {

    const getExamTypes = async () => {
      const response = await api.getData("examTypes") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data.name,value:data._id}) )
      setExamTypes(arrayData) 

    }

    getExamTypes()

  },[])


  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const closeDialog = () =>{
    setOpen(false)
  }

  const closeDialog2 = () =>{
    setOpen2(false)
  }

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })    
  }

  const handleChange = event => {
    
    //console.log(event,event.target)
    console.log(event.target.name,event.target.value,event.target.checked,event.target.type)
    if( event.target.type === "checkbox" )
    {
        setData(event.target.name,event.target.checked)
    }
    else{
        setData(event.target.name,event.target.value)
    }

  };

  const [values, setValues] = useState(new DiagnosticPlanModel())


  const errors =  new Array(3)

  const rules = (key,value) =>{
    switch(key){

      case "description":

        errors[0] = value.length > 0 && value.length < 15 ?
        "La descripción debe tener mas de 15 carácteres" : false    
        
        return  errors[0]
      
      case "laboratory":

        errors[1] = value.length > 0 && value.length < 5 ?
        "El laboratorio debe tener mas de 5 carácteres" : false

        return  errors[1]
        
      case "laboratoryAddress":

        errors[2] = value.length > 0 && value.length < 12 ?
        "El laboratorio debe tener mas de 12 carácteres" : false

        return  errors[2]

      case "results":

        errors[3] = value.length > 0 && value.length < 15 ?
        "Los resultados deben tener mas de 15 carácteres" : false

        return  errors[3]

      default:
        return true
    }
  }


  const handleSave = (cb=null) => {

    let errorValidation = false

    errors.forEach(data => {
        if(data != false){  errorValidation = true  }
    })

    if(errorValidation)
    {
        Swal.fire({
            icon: 'warning',
            title: 'Espera',
            text: "Tienes error en los datos suministrados, revisalos",          
        })

    }
    
    //console.info("values",values)                           

      if( !values.typeOfExam  ||  !values.description  || !values.examDate
      || !values.laboratory || !values.laboratoryAddress )
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
        //alert("continue")
        setOpen(false)
        props.saveOrUpdateDiagnosticPlan(values,cb)
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
                    <TableCell>Tipo de examen</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Fecha Realizado</TableCell>
                    <TableCell>Laboratorio</TableCell>
                    <TableCell>Resultados</TableCell>
                    <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {  props.diagnosticPlans ? props.diagnosticPlans.slice(0).reverse().map( plan => (
                    <TableRow>
                      <TableCell>
                        {
                           examTypes.length > 0 ? examTypes.filter( type => type.value === plan.typeOfExam  )[0].label  : null                         
                        }
                      </TableCell>
                      <TableCell>{plan.description}</TableCell>
                      <TableCell>{plan.examDate}</TableCell>
                      <TableCell>{plan.laboratory}</TableCell>
                      <TableCell>{plan.results ?
                           plan.results :
                           <Button color="secondary" onClick={()=>{
                            setValues(plan)
                            setOpen2(true)    
                           }}>+ Resultados</Button>   }
                      </TableCell>
                      <TableCell><Button color="secondary"
                        onClick={()=>{
                          setValues(plan)
                          setOpen(true)
                        }}
                      >Ver info completa</Button></TableCell>
                    </TableRow>
                 )) : null }
                    
                </TableBody>
                </Table>
            </div>
            </PerfectScrollbar>
        </Grid>   
        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>    
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}
             onClick={()=>{
               setOpen(true)
             }}>
                Crear nuevo plan de diagnostico
            </Button>
        </Grid>  


        <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Plan de diagnostico
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                   Información de plan de diagnostico
                </DialogContentText>

                <Grid  container>

                  <Grid item md={12} xs={12}>
                      <TextField
                          fullWidth label="Tipo de examen"
                          margin="dense" name="typeOfExam"
                          required
                          select                                   
                          variant="outlined"
                          SelectProps={{ native: true }}
                          onChange={handleChange}
                          value={values.typeOfExam}
                      >
                          {examTypes.map(option => (
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
                      <TextField  fullWidth  label="Descripción del examen" 
                       margin="dense"
                       name="description"
                       onChange={handleChange}
                       value={values.description}
                       variant="outlined"
                       multiline rows={3}
                       helperText={rules("description",values.description)}
                       error = {rules("description",values.description)}
                      />
                  </Grid>
                  
                  <Grid container direction="row" justify="center" alignItems="center">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                              name ="examDate"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Fecha"
                              format="MM/dd/yyyy"                   
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                              onChange={(date)=>setData("examDate",moment(date).add('days', 1).format("YYYY-MM-DD"))}
                              value={values.examDate}     
                          />              
                      </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item md={12} xs={12}>
                      <TextField  fullWidth
                        label="Laboratorio" margin="dense"
                        name="laboratory"  variant="outlined"
                        onChange={handleChange}
                        value={values.laboratory}
                        helperText={rules("laboratory",values.laboratory)}
                        error = {rules("laboratory",values.laboratory)}
                  />
                  </Grid>

                  <Grid item md={12} xs={12}>
                      <TextField  fullWidth  label="Dirección del laboratorio" margin="dense"
                      name="laboratoryAddress"  variant="outlined"
                      onChange={handleChange}
                      value={values.laboratoryAddress}
                      helperText={rules("laboratoryAddress",values.laboratoryAddress)}
                      error = {rules("laboratoryAddress",values.laboratoryAddress)}
                  />
                  </Grid>
                  <Divider></Divider>
                  <Grid container direction="row" justify="center" alignItems="center">
                      <Button color="primary"
                        variant="contained"
                        style={{marginTop:"10px"}} 
                        onClick={()=>handleSave(()=>{
                          setOpen(true)
                        })}
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


        <Dialog
                open={open2}
                onClose={closeDialog2}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Resultados del plan diagnostico
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Porfavor escribo con detalle el resultado bajo su criterio medico
                  </DialogContentText>

                  <Grid  container>
                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Resultados del examen" 
                        margin="dense"
                        name="results"
                        onChange={handleChange}
                        value={values.results}
                        variant="outlined"
                        multiline rows={3}
                        helperText={rules("results",values.results)}
                        error = {rules("results",values.results)}
                        />
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Button color="primary"
                        variant="contained"
                        style={{marginTop:"10px"}} 
                        onClick={handleSave}
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

DiagnosticPlan.propTypes = {
  className: PropTypes.string
};

export default DiagnosticPlan;
