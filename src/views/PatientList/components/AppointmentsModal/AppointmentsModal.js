import React, { useState, useCallback, useRef, useEffect  } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Divider,
    Grid, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Switch
  } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'; 
  
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CancelIcon from '@material-ui/icons/Cancel';

import 'date-fns';

import { useConfirm } from 'material-ui-confirm';

import moment from 'moment';

import * as cie10 from 'cie10';

import { withStyles } from '@material-ui/core/styles';

import { debounce } from "lodash";

import Swal from 'sweetalert2' 

const useStyles = makeStyles(theme => ({
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
  },
  boldOption: {
      fontWeight: 'bold'
  },
  notchedOutline: {
    color:"white !important",
    borderColor: "white !important"
  },
  floatingLabelFocusStyle: {
    color: "white !important"
  }
}));

const AppointmentsModal = props => {

    //console.log("props",props)      

    //console.log("default date", props.defaultDate , moment().toISOString())

    const AntSwitch = withStyles((theme) => ({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
        }))(Switch);

  const confirm = useConfirm();

  const {  open, handleOpen,  doctors, watch, watchValues } = props;

  const classes = useStyles();

  const cie10Codes = cie10('array');

  const [ medicines , setMedicines ] = useState([
      {
        product:null,
        presentation:null,
        posology:null,
        administrationWay:null,
        duration:null
      }
  ]) 

  const [appointment, setAppointment] = useState({
    reasonForConsultation:"",
    resultsForConsultation:"",
    medicines:[],
    doctor:null,
    haveMedicalTest:false,
    _id:null,
    agendaAnnotation:null,
    appointmentDate:moment().format("YYYY-MM-DD HH:mm:ss")
  })

  const [avaliableCieCodes, setAvaliableCieCodes] = useState([])

  const [ appointmentErrors , setAppointmentErrors ] = useState([])

  const [ errorTitle , setErrorTitle ] = useState(null)



  useEffect(() => {
        
      if(props.patient && !watch)
      {
        //if is required setting default date would bring the appointment information from that day
        props.getAppointmentsByPatientAndDate(props.patient._id,moment().format("Y-MM-D"),
            (success,error)=>{
                if(success && success[0])
                {
                    console.log("day appointment",success[0])

                    const searchCodeVlue = success[0].diagnosticCode

                    const avaliableCodes =  searchCodeVlue.length > 0 ? cie10Codes.filter( option => option.c.toLowerCase().includes(searchCodeVlue.toLowerCase())  ) : [] 
                    //console.log("avaliableCodes",avaliableCodes)    
                    setAvaliableCieCodes(avaliableCodes)

                    setAppointment({
                        ...success[0]
                    })

                    props.getMedicinesByAppointment(success[0]._id,
                        (success,error)=>{

                            setMedicines(success)
                        }
                    )
                }
            }
        )
      }else{
          
      }
      
  }, [props.patient,watch])

  useEffect(()=>{
    if(watch){
        setAppointment({ ...watchValues })
        props.getMedicinesByAppointment(watchValues._id,
            (success,error)=>{

                setMedicines(success)
            }
        )
    }
    else{
        setAppointment({})
    }
  },[watch])

  /**  Dialogs for notifications */

  const [openDialog, setOpenDialog] = useState(false);

  const [openDialog2, setOpenDialog2] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen2 = () => {
    setOpenDialog2(true);
  };

  const handleDialogClose2 = () => {
    setOpenDialog2(false);
  };

  /**  Dialogs for notifications */

  const presentationTypes = [ "Jarabes", "Gotas", "Capsulas", "Polvo", "Granulado", "Emulsión", "Bebible" ]

  const administrationWaysTypes = [ "Oral", "Intravenosa", "Intramuscular", "Subcutanea", "tópica", "inhalatoria" ]

  const handleChange = ( event , key ) => {


    if(key != null)
    {
        const copyArray = JSON.parse( JSON.stringify( medicines ) );

        copyArray[ key ] = { ...copyArray[ key ] , [event.target.name]:event.target.value }

        //console.log("copyArray",copyArray)

        setMedicines([ ...copyArray ])


    }else{
        setAppointment({
            ...appointment,
            [event.target.name]:event.target.value
        })
    }

  }

  const addNewMedicament = () => {

    setMedicines([...medicines , {
        product:null,
        presentation:null,
        posology:null,
        administrationWay:null,
        duration:null
    }])

  }

  const deleteMedicine = (index) => {
    confirm({  title:'¿Estas seguro?'  ,description: 'No podras recuperar la información y tendrias que reescribirla' })
      .then(() => {  

        console.log("index",index)

        const copyArray = JSON.parse( JSON.stringify( medicines ) );

        console.log("medicines.splice(index, 1)",copyArray.splice(index, 1),copyArray)

        setMedicines([ ...copyArray ])


      })
      .catch(() => { /* ... */ });
  };

  const saveAppointment = () => {

    //console.log("appintment",appointment)

    //console.log("medicines",medicines)   

      const copyArray = []

      //setAppointmentErrors(["testing error"])

      if( !appointment.reasonForConsultation || appointment.reasonForConsultation < 15 ){
        copyArray.push("La razón de consulta debe tener por lo menos 15 carácteres")
      }

      if( !appointment.resultsForConsultation || appointment.resultsForConsultation < 15 ){
        copyArray.push("El resultado de la consulta debe tener por lo menos 15 carácteres")
      }

      let medicinesValidation = false

      medicines.forEach(  medicine => {
          if( !medicine.product || !medicine.presentation || !medicine.posology || !medicine.administrationWay  ){

                medicinesValidation = true

          }

      })

      if( medicinesValidation )
      {
        copyArray.push("Deben llenarse todos los campos de cada medicamento con valores validos (minimo 5 carácteres) ")
      }

      if(props.auth?.user.role)
      {
        if( !appointment.doctor ){
            copyArray.push("debes poner un doctor para asociar la cita")
        }
      }

      if(props.auth?.userType === 2){
        appointment.doctor = props.auth?.user._id
      }
      

      if(copyArray.length > 0)
      {
        setErrorTitle("Espera no puedo guardar la cita")
        setAppointmentErrors(  copyArray  )  
        return handleDialogOpen()
      }

      //console.log("appintment",appointment)

      //console.log("medicines",medicines)  
      
      props.saveAppointment({
        patient:props.patient?._id || props.patient,
        state:'DONE',
        appointmentDate:moment().format("YYYY-MM-DD HH:mm:ss"),
        ...appointment
      },(success,error)=>{
          if(success)
          {      
            if(success.data.id ){
                setAppointment({ ...appointment, _id:success.data.id })
            }         
            
            medicines.map( medicine => {
                props.saveMedicine({
                    ...medicine,
                    patient:props.patient._id,
                    appointment:success.data.id || appointment._id
                },(success,error)=>{
                    console.log("medicines success",success)
                })
            })
            //alert("cita guardada")

            props.saveCb && props.saveCb()

            handleDialogOpen2(true)
          }
          if(error)
          {
            setErrorTitle("Espera no puedo guardar la cita")
            setAppointmentErrors(  ["Sucedio un error con el servidor"]  )  
            handleDialogOpen()
          }
      })
      
  }

  const frmCompleteService = useRef();

  const frmCompleteService2 = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event: Form Submit');
    saveAppointment()
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    
    const finalDate = appointment.appointmentDate || props.defaultDate

    //console.log("finalDate",finalDate)

    const dataToSend = {
        patient:props.patient?._id || props.patient,
        state:'PENDING',
        appointmentDate:moment( finalDate ).format("YYYY-MM-DD HH:mm:ss"),
        agendaAnnotation:appointment.agendaAnnotation
    }
    
    props.saveAppointment(dataToSend,(success,error)=>{
          if(success)
          {                    
            handleClose(true)

            window.setTimeout(()=>{
                Swal.fire("ok","cita agendada","success")
            },300)

          }
          if(error)
          {
            setErrorTitle("Espera no puedo guardar la cita")
            setAppointmentErrors(  ["Sucedio un error con el servidor"]  )  
            handleDialogOpen()
          }
      })
    
  };

  //** filter helper for very huge array */
  const handlerAutocompleteBox = useCallback(debounce( (event) => {
      //console.log("something",event.target.value)
      const searchVlue  = event.target.value
      //console.log("cie10Codes",cie10Codes)
      const avaliableCodes =  searchVlue.length > 0 ? cie10Codes.filter( option => option.d.toLowerCase().includes(searchVlue.toLowerCase())  ) : [] 
      //console.log("avaliableCodes",avaliableCodes)    
      setAvaliableCieCodes(avaliableCodes)
  },1500), []);


  const handleClose = ( flag = null ) => {
    props.handleClose(flag)
  }

  
    return (
        <div>
            <Dialog
                open={open}              
                onClose={()=>handleClose()}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Cita rapida"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                A continuación podra agendar citas o crear citas nuevas.
                </DialogContentText>
                <Divider></Divider>

                { props.auth?.userType == 2 &&  moment(props.defaultDate).isSame(moment(), 'day') &&
                <ExpansionPanel style={{ backgroundColor:"#1b2458" }} >  
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography  style={{ color:"white" }} className={classes.heading}>Gestionar cita</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <form ref={frmCompleteService} onSubmit={handleSubmit}> 
                    <Divider></Divider>
                        <Grid  container spacing={3}>

                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Anamnesis (Motivo de la consulta)" margin="dense"
                                required
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    },
                                    style:{ color:"white"  }
                                }}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                onChange={(event)=>{ handleChange(event , null)  }}    
                                name="reasonForConsultation"  variant="outlined"
                                value={  appointment.reasonForConsultation  }
                                disabled={watch}
                                multiline rows={3} />
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Analísis medico (del Motivo de la consulta)" margin="dense"
                                required
                                InputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    },
                                    style:{ color:"white"  }
                                }}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                onChange={(event)=>{ handleChange(event , null)  }}    
                                name="medicalReasonForConsultation"  variant="outlined"
                                value={  appointment.medicalReasonForConsultation  }
                                disabled={watch}
                                multiline rows={3} />
                            </Grid>
                            
                        <Grid item md={12} xs={12}>
                            <ExpansionPanel>  
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Incluir Medicamentos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                
                                    <Grid  container>

                                        {medicines.map( (currElement, index)  => (
                                        <Grid  key={index} container>
                                            <h4>Medicamento: { (index + 1 ) }</h4> 
                                            <CancelIcon style={{ marginTop:"-3px" }}  onClick={ () => { deleteMedicine(index)  } } ></CancelIcon>
                                            <Grid item md={12} xs={12}>
                                                <TextField  fullWidth name="product"
                                                onChange={(event)=>{ handleChange(event , index)  }}
                                                label="Principio activo a administrar" variant="outlined"
                                                value={ medicines[index].product }
                                                disabled={watch}
                                                margin="dense"  />
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <TextField  style={{width:"99%"}} onChange={(event)=>{ handleChange(event , index)  }}
                                                variant="outlined" name="presentation"  label="Presentación" select  
                                                value={ medicines[index].presentation }
                                                disabled={watch}
                                                margin="dense" SelectProps={{ native: true }} >
                                                    <option className={classes.boldOption} >Selecciona</option>
                                                    {presentationTypes.map(option => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            <Grid  item md={6} xs={12}>
                                                <TextField style={{width:"99%"}} name="posology"  variant="outlined"
                                                onChange={(event)=>{ handleChange(event , index)  }}
                                                disabled={watch}
                                                label="Posología"  margin="dense" value={ medicines[index].posology }  />
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <TextField style={{width:"99%"}} fullWidth name="duration" label="Frecuencia o duración" variant="outlined" disabled={watch}
                                                onChange={(event)=>{ handleChange(event , index)  }} margin="dense" value={ medicines[index].duration }  />
                                            </Grid> 

                                            <Grid item md={6} xs={12}>
                                                <TextField  style={{width:"99%"}} name="administrationWay" label="Via" variant="outlined" disabled={watch}
                                                onChange={(event)=>{ handleChange(event , index)  }}  
                                                value={ medicines[index].administrationWay }
                                                margin="dense" select  SelectProps={{ native: true }} >
                                                    <option className={classes.boldOption} >Selecciona</option>
                                                    {administrationWaysTypes.map(option => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Grid>                                            

                                            <Divider></Divider>            
                                        
                                        </Grid>

                                        ))}
                                    
                                        <Divider></Divider>
                                        <Grid container direction="row" justify="center" alignItems="center">
                                            { !watch &&
                                            <Button color="default" variant="contained" style={{marginTop:"10px",marginLeft:"5px"}} 
                                                onClick={()=> addNewMedicament() }
                                            > 
                                                Añadir otro medicamento
                                            </Button>
                                            }
                                        </Grid>                                

                                    </Grid>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                id="combo-box-demo2"
                                //searchText="example"
                                options={avaliableCieCodes}
                                getOptionLabel={(option) => option.d }
                                required
                                onChange={(event, values) => 
                                {
                                    console.log("event",event)
                                    setAppointment({
                                        ...appointment,
                                        diagnosticCode:values?.c || null
                                    })
                                }}    
                                value={ appointment.diagnosticCode ? avaliableCieCodes.filter( code => code.c === appointment.diagnosticCode )[0] : {} }                         
                                renderInput={(params) => 
                                    <TextField {...params} label="Diagnostico tecnico"
                                        onChange={ (event)=>{
                                            event.persist()
                                            handlerAutocompleteBox(event)                                   
                                        }}
                                        margin="dense"
                                        InputProps={{
                                            ...params.InputProps ,
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            },
                                            style:{ color:"white"  }
                                        }}                            
                                        InputLabelProps={{
                                            classes:{
                                                root: classes.floatingLabelFocusStyle,
                                                focused: classes.floatingLabelFocusStyle,
                                            }                                    
                                        }}
                                        disabled={watch}                               
                                        variant="outlined" />}                                
                            />
                        </Grid>
                        
                     

                        <Grid item md={12} xs={12}>                        
       
                            <TextField  fullWidth  label="Resultados o conclusiones de la consulta" margin="dense"
                                required
                                onChange={(event)=>{ handleChange(event , null)  }}  
                                InputProps={{
                                    classes: {
                                      notchedOutline: classes.notchedOutline
                                    },
                                    style:{ color:"white"  }
                                }}
                                InputLabelProps={{
                                    classes:{
                                        root: classes.floatingLabelFocusStyle,
                                        focused: classes.floatingLabelFocusStyle,
                                    }                                    
                                }}
                                name="resultsForConsultation"  variant="outlined"
                                value={  appointment.resultsForConsultation  }
                                disabled={watch}
                                multiline rows={3} />          
                        </Grid>

                        <Grid item md={12} xs={12}>

                            <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid style={{color:"white"}} item>¿ Desea agendar un examen para esta cita ? No</Grid>
                                        <Grid item>
                                            <AntSwitch  disabled={watch} onChange={(e)=>{
                                                setAppointment({
                                                    ...appointment,
                                                    haveMedicalTest:e.target.checked
                                                })
                                            }} checked={ appointment.haveMedicalTest }  />
                                        </Grid>
                                        <Grid item>Si</Grid>
                                    </Grid>
                            </Typography>

                        </Grid>

                        

                        
                        <Grid item md={12} xs={12}>
                            <ExpansionPanel expanded={appointment.haveMedicalTest || false} disabled={!appointment.haveMedicalTest || false}>  
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>Agendar Examen o solicitar examen</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                
                                    <Grid  container>

                                    <Grid item md={12} xs={12}>
                                        <TextField style={{width:"99%"}} name="testName"  variant="outlined" disabled={watch}
                                            value={  appointment.testName  }
                                            required={appointment.haveMedicalTest} onChange={(event)=>{ handleChange(event , null)  }}
                                            label="Nombre del examen"  margin="dense"  />
                                    </Grid>

                                    <Grid item md={6} xs={6}>
                                        <TextField style={{width:"99%"}} name="laboratory"  variant="outlined" disabled={watch}
                                            value={  appointment.laboratory  }
                                            required={appointment.haveMedicalTest} 
                                            onChange={(event)=>{ handleChange(event , null)  }}
                                            label="Laboratorio"  margin="dense"  />
                                    </Grid>

                                    <Grid item md={6} xs={6}>
                                        <TextField style={{width:"99%"}} name="laboratoryAddress" disabled={watch}
                                            value={  appointment.laboratoryAddress  }
                                            variant="outlined"
                                            required={appointment.haveMedicalTest} 
                                            onChange={(event)=>{ handleChange(event , null)  }}
                                            label="Dirección"  margin="dense"  />
                                    </Grid>
                                    
                                                                   

                                    </Grid>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>

                        

                        { !watch &&
                        <Grid  container direction="row" justify="center" alignItems="center">        
                            <Button color="primary" type="submit"  variant="contained" style={{marginTop:"10px"}} >
                                Guardar detalles cita
                            </Button>
                        </Grid>}
                        
                    </Grid>
                    
                    </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                }

                { !moment(props.defaultDate).isSame(moment(), 'day') &&
                <ExpansionPanel>  
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Agendar Cita</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Divider></Divider>
                        <form ref={frmCompleteService2} onSubmit={handleSubmit2}> 
                        <Grid  container spacing={3}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                id="datetime-local"
                                label="Proxima cita"
                                type="datetime-local"
                                defaultValue={ props.defaultDate || moment().toISOString() }
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="appointmentDate"
                                onChange={(event)=>{ handleChange(event , null)  }} 
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField  fullWidth  label="Información a tener en cuenta"
                                    margin="dense" name="agendaAnnotation"  variant="outlined" required
                                    onChange={(event)=>{ handleChange(event , null)  }} 
                                    value={  appointment.agendaAnnotation  }
                                    multiline rows={3} />          
                            </Grid>
                            
                            { props.auth?.user.role &&
                                <Grid item xs={12}>
                                        <Autocomplete
                                            required
                                            id="combo-box-demo"
                                            //searchText="example"
                                            options={doctors}
                                            getOptionLabel={(option) => option.name +" "+option.lastName+",id:"+option.identification+",cel:"+option.phone }
                                            //onChange={(event, values)=>AutoCompleteChange(event, values,"laboratory")}
                                            renderInput={(params) => 
                                                <TextField {...params} label="Médico"
                                                    margin="dense"                           
                                                    variant="outlined" />}                                
                                                />
                                </Grid>
                            }

                            <Grid tem md={12} xs={12}>
                                <Button fullWidth
                                color="primary"
                                variant="contained"
                                type="submit"                 
                                >
                                Guardar
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>        
                }
                



            
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>handleClose()} color="primary">
                Cerrar
                </Button>       
            </DialogActions>
            </Dialog>




            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <ul>{

                    appointmentErrors.map( aerror  => (
                        
                    <li>{ aerror }</li>
                        
                    ))
                }</ul> 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openDialog2}
                onClose={handleDialogClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div>
                        <h2>¡Datos registros!</h2>
                        <span>¿Deseas enviar un correo al paciente con el diagnostico general y los medicamentos?</span>
                    </div>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose2} color="primary" autoFocus>
                    Enviar
                </Button>
                <Button onClick={handleDialogClose2} color="primary" autoFocus>
                    Terminar
                </Button>
                </DialogActions>
            </Dialog>


        </div>
      
    );
};


export default AppointmentsModal;
