import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
    } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import Swal from 'sweetalert2' 
import { PatientReview, PhysiologicalConstants, DiagnosticPlan,
  TherapeuticPlan, Appointments, Diseases, PatientFiles  } from './components'
import 'date-fns';
import { setCurrentPatient } from 'actions/app';
import { getPatientReviewsByPatient, savePatientReview } from 'actions/patientReviews';
import { getPhysiologicalConstantsByPatient, savePhysiologicalConstant } from 'actions/pyshiologicalConstants';
import { getDiagnosticPlansByPatient, saveDiagnosticPlan } from 'actions/diagnosticPlans'
import { getTherapeuticPlansByPatient, saveTherapeuticPlan } from 'actions/therapeuticPlans'
import { getAppointmentsByPatient, saveAppointment} from 'actions/appointments'
import { getDetectedDiseasesByPatient, saveDetectedDisease } from 'actions/detectedDiseases'
import { getPatientFilesByPatient, savePatientFile } from 'actions/patientFiles'

import { PatientReview as PatientReviewModel } from "models/patientReview";
import { PhysiologicalConstant as PhysiologicalConstantModel } from "models/physiologicalConstant"


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));


const MedicalRecords = props => {

  
  //console.log("history id",props.history.location.state.id)

  try{
    setCurrentPatient(props.history.location.state.id)
  }catch(e){
    console.error(e)
  }

  
  
  const classes = useStyles();

  const [currentPatientId, setCurrentPatientId] = useState(props.appState.currentPatient) 

  //const [values,setValues] = useState({})

  const [products,setProducts] = useState(null)

  const [patientReview, setPatientReview] = useState(null)

  const [physiologicalConstant, setPhysiologicalConstant] = useState(null)

  const [physiologicalConstants, setPhysiologicalConstants] = useState([])

  const [diagnosticPlans, setDiagnosticPlans] = useState([])

  const [therapeuticPlans, setTherapeuticPlans] = useState([])

  const [appointments, setAppointments] = useState([])

  const [detectedDiseases, setDetectedDiseases] = useState([])

  const [patientFiles, setPatientFiles] = useState([])

  const [ idPRToSave, setIdPRToSave ] = useState(null)

  const [ idPCToSave, setIdPCToSave ] = useState(null)

  const [ idDPToSave, setIdDPToSave ] = useState(null)

  const [ idTPToSave, setIdTPToSave ] = useState(null)

  const [ idAToSave, setIdAToSave ] = useState(null)

  const [ idDDToSave, setIdDDToSave ] = useState(null)

  const [ idPFToSave, setIdPFToSave ] = useState(null)

  useEffect(() => {

    let mounted = false;   

    if(mounted)
    {
      props.getProducts((success,error)=>{
        if(success)
        {
          setProducts(props.productsState.products)
        }
        if(error){
          alert("Sucedio un error trayendo los productos")
        }
      })
  
      props.getPatientReviewsByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            //if(props.patienReviewState.patientReviews[0])
            if(success[0])
            {
              setPatientReview(success[0])
            }
            else{
              setPatientReview(new PatientReviewModel())
            }    
            
           
        }
        if(error){
            alert("Sucedio un error trayendo las reseñas del paciente")
        }

      })
  
      props.getPhysiologicalConstantsByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            //console.info("physiological constants",props.constantsState)

            console.log("constants success",success)

            if(success.length > 0)
            {
              setPhysiologicalConstant(success[success.length - 1]) 
              setPhysiologicalConstants(success)

            }else{
              setPhysiologicalConstant(new PhysiologicalConstantModel())
            }

        }
        if(error){
          alert("Sucedio un error trayendo las constantes fisiológicas")
        }

      })

      props.getDiagnosticPlansByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            console.log("diagnostic plans success",success)

            if(success.length > 0)
            {
              setDiagnosticPlans(success)
            }
        }
        if(error){
          alert("Sucedio un error trayendo los planes de diagnostico")
        }

      })

      props.getTherapeuticPlansByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            console.log("therapeutic plans success",success)

            if(success.length > 0)
            {
              setTherapeuticPlans(success)
            }
        }
        if(error){
          alert("Sucedio un error trayendo los planes terapeuticos")
        }

      })

      props.getAppointmentsByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            console.log("appointments success",success)

            if(success.length > 0)
            {
              setAppointments(success)
            }
        }
        if(error){
          alert("Sucedio un error trayendo las citas")
        }

      })

      props.getDetectedDiseasesByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            console.log(" success",success)

            if(success.length > 0)
            {
              setDetectedDiseases(success)
            }
        }
        if(error){
          alert("Sucedio un error trayendo las citas")
        }

      })

      props.getPatientFilesByPatient(currentPatientId,(success,error)=>{
        
        if(success)
        {
            console.log(" success",success)

            if(success.length > 0)
            {
              setPatientFiles(success)
            }
        }
        if(error){
          alert("Sucedio un error trayendo las citas")
        }

      })

      mounted = false
    } 


  },[]);  

  

  /*const changeValues = (key,value) =>
  {

    console.log(key,value);
    setValues({
      ...values,
      [key]: value
    });
  
    console.log(values)

    
  }*/

 
  const saveOrUpdatePatientReview = (values) =>{

    console.log("patientReview to save",values)

    values.patient = currentPatientId
    
    if(idPRToSave)
    {
      if(!values._id)
      {
        values._id = idPRToSave
      }
      
    }

    
    props.savePatientReview(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdPRToSave(res.data.id)
        }
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        })
      }      
      
    })
    
  }


  const saveOrUpdatePhysiologicalConstant = (values) =>{

    console.log("constant to save",values)

    values.patient = currentPatientId
    
    if(idPCToSave)
    {
      if(!values._id)
      {
        values._id = idPCToSave
      }
      
    }

  
    props.savePhysiologicalConstant(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdPCToSave(res.data.id)
        }

        props.getPhysiologicalConstantsByPatient(currentPatientId,(success,error)=>{
          
            if(success)
            {
                if(success.length > 0)
                {                
                  setPhysiologicalConstants(success)  
                }
    
            }

        })  
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        })

      }            
      
    })
    
  }


  const saveOrUpdateDiagnosticPlan = (values,cb) =>{ 
    
    console.log("diagnostic plan to save",values)

    values.patient = currentPatientId
    
    if(idDPToSave)
    {
      if(!values._id)
      {
        values._id = idDPToSave
      }
      
    }
  
    props.saveDiagnosticPlan(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdDPToSave(res.data.id)
        }

        props.getDiagnosticPlansByPatient(currentPatientId,(success,error)=>{
          
            if(success)
            {
                if(success.length > 0)
                {                
                  setDiagnosticPlans(success)  
                }    
            }

        })  
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        }).then( any => {
          if(cb){ cb() }
        })

      }            
      
    })
  }

  const saveOrUpdateTherapeuticPlan = (values,cb) =>{ 
    
    console.log("therapeutic plan to save",values)

    values.patient = currentPatientId
    
    if(idTPToSave)
    {
      if(!values._id)
      {
        values._id = idTPToSave
      }

    }
  
    props.saveTherapeuticPlan(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdTPToSave(res.data.id)
        }

        props.getTherapeuticPlansByPatient(currentPatientId,(success,error)=>{
          
            if(success)
            {
                if(success.length > 0)
                {                
                  setTherapeuticPlans(success)  
                }    
            }

        })  
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        }).then( any => {
          if(cb){ cb() }
        })

      }            
      
    })
  }


  const saveOrUpdateAppointment = (values,cb) =>{ 
    
    console.log("appointment to save",values)

    values.patient = currentPatientId

    values.state = "done"
    
    if(idAToSave)
    {
      if(!values._id)
      {
        values._id = idAToSave
      }

    }
  
    props.saveAppointment(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdAToSave(res.data.id)
        }

        props.getAppointmentsByPatient(currentPatientId,(success,error)=>{
          
            if(success)
            {
                if(success.length > 0)
                {                
                  setAppointments(success)  
                }    
            }

        })  
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        }).then( any => {
          if(cb){ cb() }
        })

      }            
      
    })
  }

  const saveOrUpdateDetectedDisease = (values,cb) =>{ 
    
    console.log("detectedDisease to save",values)

    values.patient = currentPatientId
    
    if(idDDToSave)
    {
      if(!values._id)
      {
        values._id = idDDToSave
      }

    }
  
    props.saveDetectedDisease(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdDDToSave(res.data.id)
        }

        props.getDetectedDiseasesByPatient(currentPatientId,(success,error)=>{
          
            if(success)
            {
                if(success.length > 0)
                {                
                  setDetectedDiseases(success)  
                }    
            }

        })  
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        }).then( any => {
          if(cb){ cb() }
        })

      }            
      
    })
  }


  const saveOrUpdatePatientFile = (values,cb) =>{ 
    
    console.log("patientFile to save",values)

    values.patient = currentPatientId
    
    if(idPFToSave)
    {
      if(!values._id)
      {
        values._id = idPFToSave
      }

    }
  
    props.savePatientFile(values,(res,err)=>{       
        
      if(res){
        console.log("res end point",res)
        
        if(res.data && res.data.id)
        {
            setIdPFToSave(res.data.id)
        }

        props.getPatientFilesByPatient(currentPatientId,(success,error)=>{
          
            if(success)
            {
                if(success.length > 0)
                {                
                  setPatientFiles(success)  
                }    
            }

        })  
        
        return Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: "Datos registrados",          
        }).then( any => {
          if(cb){ cb() }
        })

      }            
      
    })
  }


  return (
    <div className={classes.root} style={{marginTop:"25px"}}>
        <Typography variant={"h3"} style={{textAlign:"center"}}>Historial Medico { " "+currentPatientId }</Typography>
       
      <div className={classes.root}>
        
        <ExpansionPanel defaultExpanded={true} >  
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Reseña del paciente</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

             

                  <PatientReview  patientReview={ patientReview }
                  saveOrUpdatePatientReview={saveOrUpdatePatientReview} /> :
                         

            </ExpansionPanelDetails>
        </ExpansionPanel>
        
        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Constantes fisiológicas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>                
             
                <PhysiologicalConstants  physiologicalConstant={ physiologicalConstant }
                saveOrUpdatePhysiologicalConstant={saveOrUpdatePhysiologicalConstant} 
                physiologicalConstants={physiologicalConstants} />

            </ExpansionPanelDetails>            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Planes de diagnostico</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <DiagnosticPlan saveOrUpdateDiagnosticPlan={saveOrUpdateDiagnosticPlan}
                  diagnosticPlans={diagnosticPlans}
                />
            </ExpansionPanelDetails>
            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Planes terapeuticos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {
                products ? <TherapeuticPlan products={products}  
                therapeuticPlans={therapeuticPlans}
                saveOrUpdateTherapeuticPlan={saveOrUpdateTherapeuticPlan} /> : false
              }
            </ExpansionPanelDetails>
            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Citas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Appointments appointments={appointments} 
                saveOrUpdateAppointment={saveOrUpdateAppointment} />
            </ExpansionPanelDetails>
            
        </ExpansionPanel>


        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Enfermedades detectadas</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Diseases detectedDiseases={detectedDiseases}
                saveOrUpdateDetectedDisease={saveOrUpdateDetectedDisease} />
            </ExpansionPanelDetails>
            
        </ExpansionPanel>

        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Archivos</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PatientFiles patientFiles={patientFiles}
                saveOrUpdatePatientFile={saveOrUpdatePatientFile} />
            </ExpansionPanelDetails>
            
        </ExpansionPanel>
       
       </div>
    </div>
  );
};


const mapStateToProps = state => {
 
  return {
    //petsState: state.pets,
    appState: state.app,
    productsState: state.products,  
    patienReviewState: state.patientReviews,
    constantsState: state.physiologicalConstants
  };
}


export default  connect(mapStateToProps, {
  setCurrentPatient,
  getPatientReviewsByPatient,
  getPhysiologicalConstantsByPatient,
  savePatientReview,
  savePhysiologicalConstant,
  getDiagnosticPlansByPatient,
  saveDiagnosticPlan,
  getTherapeuticPlansByPatient,
  saveTherapeuticPlan,
  getAppointmentsByPatient,
  saveAppointment,
  getDetectedDiseasesByPatient,
  saveDetectedDisease,
  getPatientFilesByPatient,
  savePatientFile 
} )(MedicalRecords);
