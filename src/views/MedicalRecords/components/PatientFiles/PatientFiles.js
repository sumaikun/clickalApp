import 'date-fns';
import React, { useState  , useEffect, useRef } from 'react';
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
    Avatar
} from '@material-ui/core';
import Swal from 'sweetalert2'
import { PatientFile as PatientFileModel } from "models/PatientFile";

import { uploadFileToServer, deleteFile } from 'actions/app'

import AssignmentIcon from '@material-ui/icons/Assignment';

import { green, pink } from '@material-ui/core/colors';

import PictureAsPdf from '@material-ui/icons/PictureAsPdf';

import FolderIcon from '@material-ui/icons/Folder';

import api from 'middleware/api'

import { saveAs } from 'file-saver';

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
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
    red: {
      color: '#fff',
      backgroundColor: pink[500],
    }
}));

const useStyles = {
  root: {},
  horizontalGroup:{width: 'auto', height: 'auto', display: 'flex', flexWrap: 'nowrap',
  flexDirection: 'row'}
};

const PatientFiles = props => {

  const classes = doStyles(); 

  const [open, setOpen] = useState(false);

  useEffect(() => {
  },[]);  

  const closeDialog = () =>{
    setOpen(false)
  }

  const [values, setValues] = useState(new PatientFileModel())

  const linkRef = useRef(null);

  const handleChange = event => {
    
    //console.log(event,event.target)
    //console.log(event.target.name,event.target.value,event.target.checked,event.target.type)
    if( event.target.type === "checkbox" )
    {
        setData(event.target.name,event.target.checked)
    }
    else{
        if(event.target.files)
        {
          setData(event.target.name,event.target.files[0])
        }
        else{
          setData(event.target.name,event.target.value)
        }        
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
        case "name":

          errors[0] = value.length > 0 && value.length < 10 ?
          "El nombre debe tener mas de 10 carácteres" : false    
          
          return  errors[0]

        case "description":

          errors[1] = value.length > 0 && value.length < 40 ?
          "La descripción debe tener mas de 40 carácteres" : false    
            
          return  errors[1]

        default:
          return true
    }
  }

  const downloadFile = async (path) => {
    
    //const file = await api.getData("/downloadFile/"+path)
    
    //console.log("file response",file,file.headers["content-type"])
    //const blob = new Blob([file.data], {type : file.headers["content-type"]+";"});

    const { token } = Window.Store.getState().auth

    saveAs(
      process.env.REACT_APP_SERVER_HOST + "/downloadFile/"+path+"?token="+token,
      path);
    //saveAs(blob, path);

    /*const href = window.URL.createObjectURL(blob);
    const a = linkRef.current;
    a.download = path;
    a.href = href;
    a.target = 
    a.click();
    a.href = '';*/

  }

  const convertToByteArray = (input) =>{
    var sliceSize = 512;
    var bytes = [];
  
    for (var offset = 0; offset < input.length; offset += sliceSize) {
      var slice = input.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
  
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
  
      bytes.push(byteArray);
    }
  
    return bytes;
  }

  const generateFileIcon = (path) => {

    console.log("path",path)

    let extension = path.split('.').pop()

    extension = extension.toLowerCase()

    console.log("extension",extension)

    if(extension === "jpg" || extension === "jpeg" ||
    extension === "png" || extension === "gif")
    {
        return <Avatar alt="Remy Sharp" 
        src={  process.env.REACT_APP_SERVE_IMAGE + path}
        onClick={()=>downloadFile(path)}
        />
    }

    if(extension === "xls" || extension === "xlsx" 
    || extension === "csv" )
    {
      return <Avatar className={classes.green}  onClick={()=>downloadFile(path)}>
        <AssignmentIcon />
      </Avatar>
    }

    if(extension === "pdf" || extension === "pd" )
    {
      return <Avatar className={classes.red} onClick={()=>downloadFile(path)}>
        <PictureAsPdf />
      </Avatar>
    }

    return <Avatar onClick={()=>downloadFile(path)}>
      <FolderIcon />
    </Avatar>
  }


  return (
    <Grid lg={12} md={12} xs={12}>    

        <a ref={linkRef}/>

        <Grid  container direction="row" justify="center" alignItems="center">
            <PerfectScrollbar>
            <div className={classes.inner}>
                <Table>
                <TableHead>
                    <TableRow>                  
                        <TableCell>Veterinario/a</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descargar</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    props.patientFiles.slice(0).reverse().map( file => ( 
                    <TableRow>
                        <TableCell>{ file.userDetails[0].name }</TableCell>
                        <TableCell>{ file.name }</TableCell>
                        <TableCell>{ generateFileIcon(file.filePath) }</TableCell>
                        <TableCell>{ file.description }</TableCell>
                        <TableCell>{ file.date.split(" ")[0] }</TableCell>
                        <TableCell>
                          <Button color="secondary"
                                  onClick={()=>{
                                    setValues(file)
                                    setOpen(true)
                                  }}
                            >Ver</Button>
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
              setValues(new PatientFileModel())
            }}>
                  Subir nuevo archivo
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
                   Información de enfermedad y diagnostico
                </DialogContentText>               
                  
                  <Grid  container>                  

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  
                        label="Nombre del archivo"
                        margin="dense"
                        name="name"
                        helperText={rules("name",values.name)}
                        error = {rules("name",values.name)}
                        value={values.name} onChange={handleChange}
                        variant="outlined"
                             />          
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  type="file" margin="dense"
                             variant="outlined" name="file" onChange={handleChange}
                        />          
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField  fullWidth  label="Descripción" margin="dense"
                            name="description"
                            helperText={rules("description",values.description)}
                            error = {rules("description",values.description)}
                            value={values.description} onChange={handleChange}
                            variant="outlined"
                            multiline rows={3} />          
                    </Grid>
                    

                    <Divider></Divider>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button color="primary" variant="contained" style={{marginTop:"10px"}}
                          onClick={()=>{

                            console.log("values",values)

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


                            if( !values.name || !values.description || (!values.filePath && !values.file) )
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
                                if(values.file != null)
                                {
                                  console.log("send file")
                                  uploadFileToServer(values.file,(response,err)=>{
                                    if(response){
                            
                                      if(values.filePath)
                                      {
                                        deleteFile(values.filePath)
                                      }
                            
                                      values.filePath = response.data.filename

                                      props.saveOrUpdatePatientFile(values,()=>{
                                        setOpen(true)
                                      })
                                      
                                    }else{
                                      return Swal.fire({
                                        icon: 'error',
                                        title: 'Espera',
                                        text: "Hubo un error subiendo el archivo",          
                                      })
                                    }
                                  })
                                }
                                else{
                            
                                  console.log("contact to save",values);
                            
                                  props.saveOrUpdatePatientFile(values,()=>{
                                    setOpen(true)
                                  })
                                }                           
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

PatientFiles.propTypes = {
  className: PropTypes.string
};

export default PatientFiles;
