import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  api  from '../../../../middleware/api'

const ParametersModal = props => {

  console.log("props",props)

  let formContent = ""



  const handleChange = event => {
  
    props.changeFormData(event.target.name,event.target.value)

  };

 
   
  if(props.newButtonText === "Agregar nuevo tipo de especialización" 
      || props.newButtonText === "Agregar nueva ciudad de atención"
    ){              
      formContent = 
      <div>
        <TextField
          fullWidth
          label="Nombre"
          value={props.formData.name}
          onChange={handleChange}
          name="name"   
        >
        </TextField>
        <TextField
          fullWidth
          label="Descripción"
          value={props.formData.meta}
          onChange={handleChange}
          name="meta"  
          rows={2}
          multiline  
        >
        </TextField>
      </div> }

  


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {    
    //setOpen(false);
    props.changeModalState(false)
    
  };

  const saveAction = () => {
    //setOpen(false);
    props.changeModalState(false)
    props.createButton()
  } 

  return (
    <div>
     
        {
            props.newButtonText ?
            <Button variant="contained" onClick={()=>{ props.changeModalState(true) }}  color="primary">
            {props.newButtonText}
            </Button> : false
        }
      
      <Dialog
        open={props.modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ingresa el valor del nuevo parametro"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { formContent }
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={saveAction} color="primary" autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParametersModal;