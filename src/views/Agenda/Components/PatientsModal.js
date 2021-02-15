import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
  } from '@material-ui/core'
  

import PatientsTable from 'views/PatientList/components/PatientsTable'

import { SearchInput } from 'components';

import 'date-fns';



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
  dialogPaper: {
    width: '200%',
  },
}));

const PatientsModal = props => {
  
  const {  open, patients,selectPatient, handleClose,  ...rest } = props;

  //console.log("patient props",props)

  const [selectedPatient, setSelectedPatient] = useState(null);
   
  const [filteredPatients, setFilteredPatients] = useState([]);

  const [openPatientConfirmation, setOpenPatientConfirmation] = useState(false);

  useEffect(() => {
      console.log("patients",props.patients)
    setFilteredPatients(patients)
  },[patients]); 
  
  const addFilterText = event => {
    //console.log("filter text",event.target.value)

    const data = event.target.value.toLowerCase()

    if(data.length == 0)
    {
        setFilteredPatients(patients)
    }else
    {

      const filteredArray = patients.filter( patient => 
        (patient.name ? patient.name.toLowerCase().includes(data) : false) ||
        (patient.value ? patient.value.includes(data) : false) ||
        (patient.administrationWay ? patient.administrationWay.toLowerCase().includes(data) : false) ||
        (patient.presentation ? patient.presentation.toLowerCase().includes(data) : false)
      )

      setFilteredPatients(filteredArray)      

    }
  }

  const confirmPatient = () => {
    setOpenPatientConfirmation(false)
    
    selectPatient(selectedPatient)
    window.setTimeout(function(){ handleClose() }, 500);
    //
  }

  const cancelPatient = () => {
    setOpenPatientConfirmation(false)
  }

  const addSelectedPatient = (patient) => {
    console.log("addSelectedPatient",patient)
    setSelectedPatient(patient)
    setOpenPatientConfirmation(true)
  }
  
  const classes = useStyles();

    return (
        <div>
            <Dialog
                open={open}              
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Pacientes"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Seleccione el medicamento
                </DialogContentText>    
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Buscar"
                    onChange={addFilterText}
                />  
                <PatientsTable addSelectedPatient={addSelectedPatient} patients={filteredPatients || []} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cerrar
                </Button>       
            </DialogActions>
            </Dialog>

            <Dialog
                open={openPatientConfirmation}
                onClose={cancelPatient}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                  Desea seleccionar este paciente
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                  Seleccionara este paciente para un proceso de cita
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={cancelPatient} color="primary">
                    Cancelar
                </Button>
                <Button onClick={confirmPatient} color="primary">
                    Afirmar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
      
    );
};


export default PatientsModal;