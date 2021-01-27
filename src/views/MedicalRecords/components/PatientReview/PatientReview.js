import 'date-fns';
import React, { useState  , useEffect, useRef  } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Typography,
  Grid,
  TextField,
  Button,
  Switch
} from '@material-ui/core';
import Swal from 'sweetalert2'


const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};


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


const PatientReview = props => {

  
  //console.info("props pr",props)

  const handleWindowSizeChange = () => {
    console.log("window size changed",screenWidth)
    setscreenWidth(window.innerWidth)

  };

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

  const [values, setValues] = useState({
    havePreviousIllness:false,
    previousIllnesses:"",
    haveSurgeris:false,
    surgeris:"",
    familyBackground:"",
    haveToxicBackground:false,
    toxicBackground:"",
    haveAllergies:false,
    allergies:"",
    performPhysicalActivity:false,
    immunizations:"",
    haveChildBirths:false,
    childBirdths:null,
    haveChildAborts:false,
    childAborts:null,
    haveMenstruation:true,
    femaleComments:"",
    comments:""
  })

  //const [values, setValues] = useState(props.patientReview)

  const setData = (key , value) => {
    setValues({
        ...values,
        [key]:value
    })
    
  }

  window.addEventListener('resize', handleWindowSizeChange);

  useEffect(() => {
  },[]);

  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

  //const screenWidth =  window.innerWidth

  //const isMobile = screenWidth <= 550;

  const errors =  new Array(3)

  const rules = (key,value) =>{
    switch(key){

        case "previousIllnesses":

            errors[1] = value.length > 0 && value.length < 15 ?
                "Las enfermedades anteriores deben tener mas de 15 carácteres" : false       

            return  errors[1]

        case "surgeris":

            errors[2] = value.length > 0 && value.length < 15 ?
                "La información de cirugias debe tener mas de 15 carácteres" : false       

            return  errors[2]

        case "familyBackground":

            errors[3] = value.length > 0 && value.length < 15 ?
                "La información de antecedentes familiares debe tener mas de 15 carácteres" : false       

            return  errors[3]

        case "toxicBackground":

            errors[4] = value.length > 0 && value.length < 15 ?
                "La información de antecedentes toxicos debe tener mas de 15 carácteres" : false       

            return  errors[4]

        case "allergies":

            errors[5] = value.length > 0 && value.length < 15 ?
                "La información de las alergias debe tener mas de 15 carácteres" : false       

            return  errors[5]

        case "immunizations":

            errors[6] = value.length > 0 && value.length < 15 ?
                "La información de las inmunización debe tener mas de 15 carácteres" : false       

            return  errors[6] 
        
        case "femaleComments":

            errors[7] = value.length > 0 && value.length < 15 ?
                "La información adicional femenina debe tener mas de 15 carácteres" : false       

            return  errors[7]         
        
        case "comments":

            errors[8] = value.length > 0 && value.length < 15 ?
                "Los comentarios o notas deben tener mas de 15 carácteres" : false       

            return  errors[7]   
      default:
        return true
    } 
  }

  const frmCompleteService = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event: Form Submit');
  };

  return (
    <form ref={frmCompleteService} onSubmit={handleSubmit}> 
    <Grid container>          
        
        <Typography variant="subtitle2">Antecedentes</Typography>
        
        <Grid lg={12} md={12} xs={12}>
            <Divider/>
        </Grid>    

        <Grid lg={12} md={12} xs={12}>            
            <Typography component="div">
                <span>¿ Ha tenido o tiene enfermedades cronicas o enfermedades que afectaron en gran medida su salud ? </span>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.havePreviousIllness }name="havePreviousIllness" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
        </Grid>
        
        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Antecedentes patológicos"
                margin="dense"
                name="previousIllnesses"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.previousIllnesses }
                helperText={rules("previousIllnesses",values.previousIllnesses)}
                error = {rules("previousIllnesses",values.previousIllnesses)}
                required = { values.havePreviousIllness }
                disabled={!values.havePreviousIllness}
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>            
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>¿ Ha tenido cirugias ? No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.haveSurgeris }name="haveSurgeris" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
        </Grid>
        

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Cirugías"
                margin="dense"
                name="surgeris"
                variant="outlined"
                disabled={!values.haveSurgeris}
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.surgeris }
                helperText={rules("surgeris",values.surgeris)}
                error = {rules("surgeris",values.surgeris)}
                required = { values.haveSurgeris }
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>            
            <Typography component="div">
                <span>¿ Ha tenido incidentes con sustancias tóxicas: medicamentos u otro tipo de compuesto ?</span>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}   checked={ values.haveToxicBackground }name="haveToxicBackground" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
        </Grid>
        
        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Antecedentes tóxicos"
                margin="dense"
                name="toxicBackground"
                variant="outlined"
                disabled={!values.haveToxicBackground}
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.surgeris }
                helperText={rules("toxicBackground",values.toxicBackground)}
                error = {rules("toxicBackground",values.toxicBackground)}
                required = { values.haveToxicBackground }
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>            
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>¿Alergías? No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.haveAllergies }name="haveAllergies" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
        </Grid>
        
        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Alergías"
                margin="dense"
                name="allergies"
                variant="outlined"
                disabled={!values.allergies}
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.allergies }
                helperText={rules("allergies",values.allergies)}
                error = {rules("allergies",values.allergies)}
                required = { values.haveAllergies }
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Antecedentes familiares"
                margin="dense"
                name="familyBackground"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.familyBackground }
                helperText={rules("familyBackground",values.familyBackground)}
                error = {rules("familyBackground",values.familyBackground)}
                required
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>            
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>¿ realiza ejercicio ? No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.haveSurgeris }name="haveSurgeris" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Inmunizaciones"
                margin="dense"
                name="immunizations"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.immunizations }
                helperText={rules("immunizations",values.immunizations)}
                error = {rules("immunizations",values.immunizations)}
                required
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Notas o comentarios o info adicional (Ej: si toma un medicamento especial actualmente)"
                margin="dense"
                name="comments"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.comments }
                helperText={rules("comments",values.comments)}
                error = {rules("comments",values.comments)}
                required
            />
        </Grid>
        
        <Grid lg={12} md={12} xs={12}>
            <Typography variant="subtitle2">Información femenina</Typography>
            <Divider/>
        </Grid>

        <Grid lg={6} md={6} xs={12}>                  
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>¿ Ha tenido partos ? No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.haveChildBirths }name="haveChildBirths" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
     
            <TextField
                fullWidth
                label="Partos"
                margin="dense"
                name="childBirths"
                variant="outlined"
                type="number"
                onChange={handleChange}
                value={ values.childBirdths }
                disabled={ !values.haveChildBirths }              
                required = { values.haveChildBirths }
                style={{width:"99%"}}
            />
        </Grid>

        <Grid lg={6} md={6} xs={12}>
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>¿ Ha tenido abortos ? No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.haveChildAborts }name="haveChildAborts" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
            <TextField
                fullWidth
                label="Abortos"
                margin="dense"
                name="childAborts"
                variant="outlined"
                type="number"
                onChange={handleChange}
                value={ values.childAborts }
                disabled={ !values.haveChildAborts } 
                required={ values.haveChildAborts }
            />
        </Grid>

        <Grid lg={12} md={12} xs={12}>            
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>¿ su periodo sucede con normalidad ? No</Grid>
                    <Grid item>
                        <AntSwitch  onChange={handleChange}  checked={ values.haveMenstruation }name="haveMenstruation" />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
            </Typography>
        </Grid>

        <Grid lg={12} md={12} xs={12}>
            <TextField
                fullWidth
                label="Información adicional ginecoobstetrica a tener en cuenta"
                margin="dense"
                name="femaleComments"
                variant="outlined"
                multiline
                rows={3}
                onChange={handleChange}
                value={ values.femaleComments }
                helperText={rules("femaleComments",values.femaleComments)}
                error = {rules("femaleComments",values.femaleComments)}
            />
        </Grid>
        
        
        <Grid lg={12} md={12} xs={12}>
            <Typography variant="subtitle2">Opciones</Typography>
            <Divider/>
        </Grid>
        
        <Grid  container direction="row" justify="center" alignItems="center">        
            <Button type="submit" color="primary" variant="contained" style={{marginTop:"10px"}} 
                onClick={(e)=>{

                    //e.preventDefault();
                    //const validation = frmCompleteService.current.submit();

                    //console.info("validation",validation)

                    /*console.info("values",values)
                    
                    console.log("errors",errors)

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

                        if(values.feedingType === null || values.habitat === null
                            || values.reproductiveState === null
                            || values.previousIllnesses === ""
                            || values.surgeris === ""
                            || values.familyBackground === ""){

                            Swal.fire({
                                icon: 'warning',
                                title: 'Espera',
                                text: "No has puesto los datos obligatorios (tipo de alimentación, estado reproductivo, enfermedades anteriores, cirugias, habitat, antecedentes familiares)",          
                            })

                        }else{
                            console.log("time to send")
                            props.saveOrUpdatePatientReview(values)
                        }
                        
                    }*/
                    
                }}>
                Guardar
            </Button>
        </Grid>
    </Grid>  
    </form> 
  );
};

PatientReview.propTypes = {
  className: PropTypes.string
};

export default PatientReview;
