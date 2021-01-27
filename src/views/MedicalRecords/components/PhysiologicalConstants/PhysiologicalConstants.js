import 'date-fns';
import React, { useState  , useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
} from '@material-ui/core';
import Swal from 'sweetalert2'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { PhysiologicalConstant as PhysiologicalConstantModel } from "models/physiologicalConstant";

const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};


const doStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    floatingLabelFocusStyle: {
        color: "#C6C0BF"
    }
  }));

const PhysiologicalConstants = props => {

    
  const classes = doStyles();

  useEffect(() => {
  },[]); 
  
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

  const [values, setValues] = useState({
    bloodPressure:null,
    heartRate:null,
    respiratoryRate:null,
    oxygenStauration:null,
    heartBeat:null,
    temperature:null,
    weight:null,
    height:null,
    hidrationStatus:null,
    physicalsEye:"",
    physicalsEars:"",
    physicalsLinfaticmodules:"",
    physicalsSkinandanexes:"",
    physicalsLocomotion:"",
    physicalsMusclesqueletal:"",
    physicalsNervoussystem:"",
    physicalsCardiovascularsystem:"",
    physicalsRespiratorysystem:"",
    physicalsDigestivesystem:"",
    physicalsGenitourinarysystem:""
  })

  //const [values, setValues] = useState(props.physiologicalConstant)

  //console.log("values",values)

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })
    
  }

  const errors =  new Array(19)

  const rules = (key,value) =>{
    switch(key){

        case "physicalsEye":

            errors[10] = value.length > 0 && value.length < 15 ?
                "El estado de los ojos debe tener mas de 15 carácteres" : false       

            return  errors[10]

        case "physicalsEars":

            errors[11] = value.length > 0 && value.length < 15 ?
                "El estado de los oidos debe tener mas de 15 carácteres" : false       

            return  errors[11]

        case "physicalsLinfaticmodules":

            errors[12] = value.length > 0 && value.length < 15 ?
                "El estado de los modulos linfaticos debe tener mas de 15 carácteres" : false       

            return  errors[12]

        case "physicalsSkinandanexes":

            errors[13] = value.length > 0 && value.length < 15 ?
                "El estado de la piel y anexos debe tener mas de 15 carácteres" : false       

            return  errors[13]

        case "physicalsLocomotion":

            errors[14] = value.length > 0 && value.length < 15 ?
                "El estado de la locomoción debe tener mas de 15 carácteres" : false       

            return  errors[14]

        case "physicalsMusclesqueletal":

            errors[15] = value.length > 0 && value.length < 15 ?
                "El estado de musculo esquelético debe tener mas de 15 carácteres" : false       

            return  errors[15]
        
        case "physicalsNervoussystem":

            errors[16] = value.length > 0 && value.length < 15 ?
                "El estado del sistema nervioso debe tener mas de 15 carácteres" : false       

            return  errors[16]

        case "physicalsCardiovascularsystem":

            errors[17] = value.length > 0 && value.length < 15 ?
                "El estado del sistema cardiovascular debe tener mas de 15 carácteres" : false       

            return  errors[17]

        case "physicalsRespiratorysystem":

            errors[18] = value.length > 0 && value.length < 15 ?
                "El estado del sistema respiratorio debe tener mas de 15 carácteres" : false       

            return  errors[18]

        case "physicalsDigestivesystem":

            errors[18] = value.length > 0 && value.length < 15 ?
                "El estado del sistema digestivo debe tener mas de 15 carácteres" : false       

            return  errors[18]

        case "physicalsGenitourinarysystem":

            errors[19] = value.length > 0 && value.length < 15 ?
                "El estado del sistema genitourinario debe tener mas de 15 carácteres" : false       

            return  errors[19]
    
        

      default:
        return true
    } 
  }

  return (
    <Grid lg={12} md={12} xs={12}>
         <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Typography variant="subtitle2">Signos vitales</Typography>
        
            <Grid lg={12} md={12} xs={12}>
                <Divider/>
            </Grid>  

            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="Presión sanguinea"
                    margin="dense"
                    name="bloodPressure"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.bloodPressure}
                    type="number"
                    required
                    min={0}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="Frecuencia cardiaca"
                    margin="dense"
                    name="heartRate"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.heartRate}
                    type="number"
                    required
                    min={0}
                />
            </Grid>
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="Frecuencia respiratoria X minuto"
                    margin="dense"
                    name="respiratoryRate"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.respiratoryRate}
                    type="number"
                    required
                    min={0}
                />
            </Grid>
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="Saturación de oxigeno (SpO2)"
                    margin="dense"
                    name="oxigenSaturation"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.oxigenSaturation}
                    type="number"
                    required
                    min={0}
                />
            </Grid>

            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="PULSO"
                    margin="dense"
                    name="heartBeat"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.heartBeat}
                    type="number"
                    required
                    min={0}
                />
            </Grid>

            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="TEMPERATURA (grados centigrados)"
                    margin="dense"
                    name="temperature"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.temperature}
                    type="number"
                    required
                    min={0}
                />
            </Grid>
    
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >            
           
            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="PESO"
                    margin="dense"
                    name="weight"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.weight}
                    type="number"
                    required
                    min={0}
                />
            </Grid>

            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="ALTURA"
                    margin="dense"
                    name="height"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={handleChange}
                    value={values.temperature}
                    type="number"
                    required
                    min={0}
                />
            </Grid>

            <Grid lg={4} md={4} xs={12} >
                <TextField  className={classes.paper}
                    fullWidth
                    label="INDICE DE MASA CORPORAL (IMC)"
                    margin="dense"
                    name="imc"
                    variant="outlined"
                    InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                    }}
                    value={ values.weight / ( values.height * values.height ) || 0  }
                    readOnly={true}
                />
            </Grid>
        </Grid>

        <Typography variant="subtitle2">Estado de hidratación</Typography>
        <Divider/>
        <Grid  container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
                <RadioGroup style={useStyles.horizontalGroup}
                    name="hidrationStatus" onChange={handleChange}
                    value={ values.hidrationStatus }
                    aria-label="customerBenefit">
                    
                    <FormControlLabel value="Normal" control={<Radio/>} 
                    label="Normal" />
                    <FormControlLabel value="0-5%" control={<Radio/>}
                    label="Deshidr. 0-5%" />
                    <FormControlLabel value="6-7%" control={<Radio/>} 
                    label="Deshidr. 6-7%" />
                    <FormControlLabel value="8-9%" control={<Radio/>} 
                    label="Deshidr. 8-9%" />
                    <FormControlLabel value="+10%" control={<Radio/>} 
                    label="Deshidr. +10%" />
                
                </RadioGroup>
            </FormControl>
        </Grid>

        <Typography variant="subtitle2">Estado físico (Solo comentar si hay algo anormal)</Typography>            
        <Divider/>

        <TextField
                fullWidth
                label="Ojos"
                margin="dense"
                name="physicalsEye"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsEye}
                helperText={rules("physicalsEye",values.physicalsEye)}
                error = {rules("physicalsEye",values.physicalsEye)}
        />

        <TextField
                fullWidth
                label="Oidos"
                margin="dense"
                name="physicalsEars"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsEars}
                helperText={rules("physicalsEars",values.physicalsEars)}
                error = {rules("physicalsEars",values.physicalsEars)}
        />

        <TextField
                fullWidth
                label="Modulos Linfáticos"
                margin="dense"
                name="physicalsLinfaticmodules"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsLinfaticmodules}
                helperText={rules("physicalsLinfaticmodules",values.physicalsLinfaticmodules)}
                error = {rules("physicalsLinfaticmodules",values.physicalsLinfaticmodules)}
        />

        <TextField
                fullWidth
                label="Piel y anexos"
                margin="dense"
                name="physicalsSkinandanexes"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsSkinandanexes}
                helperText={rules("physicalsSkinandanexes",values.physicalsSkinandanexes)}
                error = {rules("physicalsSkinandanexes",values.physicalsSkinandanexes)}
        />

        <TextField
                fullWidth
                label="Locomoción"
                margin="dense"
                name="physicalsLocomotion"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsLocomotion}
                helperText={rules("physicalsLocomotion",values.physicalsLocomotion)}
                error = {rules("physicalsLocomotion",values.physicalsLocomotion)}
        />

        <TextField
                fullWidth
                label="Musculo esqueletico"
                margin="dense"
                name="physicalsMusclesqueletal"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsMusclesqueletal}
                helperText={rules("physicalsMusclesqueletal",values.physicalsMusclesqueletal)}
                error = {rules("physicalsMusclesqueletal",values.physicalsMusclesqueletal)}
        />

        <TextField
                fullWidth
                label="Sistema nervioso"
                margin="dense"
                name="physicalsNervoussystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsNervoussystem}
                helperText={rules("physicalsNervoussystem",values.physicalsNervoussystem)}
                error = {rules("physicalsNervoussystem",values.physicalsNervoussystem)}
        />

        <TextField
                fullWidth
                label="Sistema cardiovascular"
                margin="dense"
                name="physicalsCardiovascularsystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsCardiovascularsystem}
                helperText={rules("physicalsCardiovascularsystem",values.physicalsCardiovascularsystem)}
                error = {rules("physicalsCardiovascularsystem",values.physicalsCardiovascularsystem)}
        />

        <TextField
                fullWidth
                label="Sistema respiratorio"
                margin="dense"
                name="physicalsRespiratorysystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsRespiratorysystem}
                helperText={rules("physicalsRespiratorysystem",values.physicalsRespiratorysystem)}
                error = {rules("physicalsCardiovascularsystem",values.physicalsCardiovascularsystem)}
        />

        <TextField
                fullWidth
                label="Sistema digestivo"
                margin="dense"
                name="physicalsDigestivesystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsDigestivesystem}
                helperText={rules("physicalsDigestivesystem",values.physicalsDigestivesystem)}
                error = {rules("physicalsDigestivesystem",values.physicalsDigestivesystem)}
        />

        <TextField
                fullWidth
                label="Sistema genitourinario"
                margin="dense"
                name="physicalsGenitourinarysystem"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleChange}
                value={values.physicalsGenitourinarysystem}
                helperText={rules("physicalsGenitourinarysystem",values.physicalsGenitourinarysystem)}
                error = {rules("physicalsGenitourinarysystem",values.physicalsGenitourinarysystem)}
        />
        <Typography variant="subtitle2">Lista de constantes registradas</Typography>
        <Divider/> 

        <Grid  lg={12} md={12} xs={12}>
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>                  
                        <TableCell>Actitud</TableCell>
                        <TableCell>Condición corporal</TableCell>
                        <TableCell>Hidratación</TableCell>
                        <TableCell>Pulso</TableCell>
                        <TableCell>Temperatura</TableCell>
                        <TableCell>Peso</TableCell>                        
                        <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>                  
                        
                    {
                        props.physiologicalConstants ? 
                        props.physiologicalConstants.slice(0).reverse().map( constant => (
                        <TableRow>
                            <TableCell>{constant.date.split(" ")[0]}</TableCell>
                            <TableCell>{constant.attitude}</TableCell>
                            <TableCell>{constant.bodyCondition}</TableCell>
                            <TableCell>{constant.hidrationStatus}</TableCell>
                            <TableCell>{constant.heartBeat}</TableCell>
                            <TableCell>{constant.temperature}</TableCell>
                            <TableCell>{constant.weight}</TableCell>
                            <TableCell><Button color="secondary"onClick={()=>{
                                
                                Swal.fire({
                                    title: '¿ Esta seguro ?',
                                    text: "Esto modificara los datos del formulario, si esta creando una constante y no ha guardado cambios, guardelos",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                  }).then((result) => {
                                    if (result.value) {
                                        setValues(constant)
                                    }
                                })

                            }} >Ver info completa</Button></TableCell>
                        </TableRow>
                        )) : null
                    }
                        
                    
                </TableBody>
                </Table>
            </div>
            </PerfectScrollbar>
        </Grid>  



        <Typography variant="subtitle2">Opciones</Typography>
        <Divider/>        
        <Grid  container direction="row" justify="space-evenly" alignItems="center">        
            <Button color="primary" variant="contained" style={{marginTop:"10px"}} 
                onClick={()=>{
                    console.info("values",values)

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

                    }else{
                        if(values.tlic === null || values.heartRate === null
                            || values.respiratoryRate === null
                            || values.heartBeat === ""
                            || values.temperature === ""
                            || values.weight === ""
                            || values.attitude === ""
                            || values.bodyCondition === ""
                            || values.hidrationStatus === ""){

                            Swal.fire({
                                icon: 'warning',
                                title: 'Espera',
                                text: "No has puesto los datos obligatorios (T.LI.C, Frecuencia cardiaca, Frecuencia respiratoria, Pulso, Temperatura, Peso, Actitud, Condición corporal, Estado de hidratación)",          
                            })

                        }
                        else{
                            props.saveOrUpdatePhysiologicalConstant(values)
                        }
                    }


                }}
            >
                Guardar
            </Button>
            <Button color="primary" variant="contained" style={{marginTop:"10px"}}
                onClick={()=>{
                    if(props.physiologicalConstants.length === 0)
                    {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Espera',
                            text: "Tienen que haber constantes fisiológicas previas para crear una nueva",          
                        })
                    }
                    else{
                        setValues( new PhysiologicalConstantModel() )
                    }
                }}
            >
                Crear nuevas constantes fisiológicas
            </Button>
        </Grid>

    </Grid>  
  );
};

PhysiologicalConstants.propTypes = {
  className: PropTypes.string
};

export default PhysiologicalConstants;
