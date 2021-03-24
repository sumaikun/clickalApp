import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {  Card,  CardActions,  CardHeader,  CardContent,  Divider,  Table,
  TableBody,  TableCell,  TableHead,  TableRow,  IconButton,  Menu,
  MenuItem,  TablePagination, Dialog, DialogTitle, DialogContent
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { StatusBullet } from 'components';
import Swal from 'sweetalert2'
import api from 'middleware/api'
import AppointmentsModal from 'views/PatientList/components/AppointmentsModal'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  DONE: 'black',
  PENDING: 'warning',
  CONFIRMED: 'success',
  CANCELLED: 'danger',
  "PENDING DOCTOR": 'info',
  DUE: 'danger'
};

const LatestOrders = props => {

  //console.log("props dashboard",props)

  const { className,  ...rest } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [appointments, setAppointments] = useState([])
  const open = Boolean(anchorEl);

  const [ openInfoDialog, setOpenInfoDialog ] = useState(false)
  const [ appointmentDetails, setAppointmentDetails ] = useState(null)

  const [ openAppointmentsModal, setOpenAppointmentsModal ] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  String.prototype.ucwords = function() {
    const str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function($1){
            return $1.toUpperCase();
        });
  }

  const handlePageChange = (event, page) => {
    console.log("handle change",event,page)
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    console.log("rows per page event")
    setRowsPerPage(event.target.value);
    setPage(0)
  };

  useEffect(()=>{
    let data = []

    props.appointments.map( appointment => {
      //console.log("appointment",appointment)
      data.push({
        _id:appointment._id,
        patient: appointment.patientDetails[0] && `${appointment.patientDetails[0].name} ${appointment.patientDetails[0].lastName}` || "",
        email: appointment.patientDetails[0] && `${appointment.patientDetails[0].email} ` || "",
        phone: appointment.patientDetails[0] && `${appointment.patientDetails[0].phone} ` || "",
        appointmentDate: appointment.appointmentDate,
        state: appointment.state == "PENDING" || appointment.state == "PENDING DOCTOR"
        &&  moment(appointment.appointmentDate).isBefore(moment()) ? "DUE" : appointment.state
      })
    })

    setAppointments(data)

  },[props.appointments])

  return (
  <Fragment>
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader        
        title="Ultimas citas"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ref</TableCell>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.sort((a,b) => new moment(b.appointmentDate).format('YYYYMMDD') - new moment(a.appointmentDate).format('YYYYMMDD')).map(appointment => (
                  <TableRow
                    hover
                    key={appointment._id}
                  >
                    <TableCell>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                        <span>{appointment._id && appointment._id.substring(0,11)}</span>
                        <div>
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            anchorEl={anchorEl}                            
                            open={open}
                            onClose={handleClose}                         
                          >
                            <MenuItem onClick={()=>{
                              setAppointmentDetails(props.appointments.filter( x => x._id == appointment._id )[0])
                              setOpenInfoDialog(true)
                              handleClose()
                            }}>
                                <b>Detalle de cita</b>
                            </MenuItem>
                            <MenuItem onClick={()=>{                             

                              if( moment(appointment.appointmentDate).isSame(new Date(), "day") && 
                                ( appointment.state == "PENDING" || appointment.state == "PENDING DOCTOR"
                                || appointment.state == "CONFIRMED" )
                              )
                              {
                                setAppointmentDetails(props.appointments.filter( x => x._id == appointment._id )[0])
                                setOpenAppointmentsModal(true)
                                handleClose()
                              }else{
                                Swal.fire("Espera","Esta cita no puede procesarse ¡ Solo citas pendientes y confirmadas ! ","warning")
                              }
                              
                            }}>
                                <b>Proceder a cita</b>
                            </MenuItem>
                            <MenuItem 
                              onClick={()=>{

                                if( appointment.state == "PENDING" || appointment.state == "PENDING DOCTOR"  ){

                                  Swal.fire({
                                    title: '¿Esta seguro de confirmar la cita?',
                                    text: "Este proceso no podra revertirse!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                  }).then((result) => {
                                    
                                    api.getData("confirmAppointment/"+appointment.email)
                                    .then( data => {
  
                                    Swal.fire({
                                      icon: 'success',
                                      title: '',
                                      text: 'Notificación enviada al cliente',          
                                    })
  
                                    })
                                    .catch( error => {
                                      console.log("error",error)
                                      return Swal.fire({
                                        icon: 'error',
                                        title: 'Ooops',
                                        text: 'Sucedio un error en el servidor',          
                                      })
                                    })
                                    
                                  })                                

                                  handleClose()
                                }else{
                                  Swal.fire("Espera","Esta cita no puede confirmarse, ¡solo citas pendientes!","warning")
                                }                                

                              }}>
                                <b>Confirmar cita</b>
                            </MenuItem>
                            <MenuItem onClick={()=>{

                              if( appointment.state == "PENDING" || appointment.state == "PENDING DOCTOR"  ){

                                Swal.fire({
                                  title: '¿Esta seguro de cancelar la cita?',
                                  text: "Este proceso no podra revertirse!",
                                  icon: 'warning',
                                  showCancelButton: true,
                                }).then((result) => {

                                    api.getData("cancelAppointment/"+appointment.email)
                                    .then( data => {
                                      
                                      Swal.fire({
                                        icon: 'success',
                                        title: '',
                                        text: 'Notificación enviada al cliente',          
                                      })

                                    })
                                    .catch( error => {
                                      console.log("error",error)
                                      return Swal.fire({
                                        icon: 'error',
                                        title: 'Ooops',
                                        text: 'Sucedio un error en el servidor',          
                                      })
                                    })

                                })

                                handleClose()
                              }else{
                                Swal.fire("Espera","Esta cita no puede cancelarse, ¡solo citas pendientes!","warning")
                              }   
                            }}>
                                <b>Cancelar cita</b>
                            </MenuItem>                          
                          </Menu>
                        </div>
                      </div>                      
                    </TableCell>
                    <TableCell>
                      { appointment.patient }
                    </TableCell>
                    <TableCell>
                        { appointment.email }
                    </TableCell>
                    <TableCell>
                        { appointment.phone }
                    </TableCell>
                    <TableCell>
                      { moment(appointment.appointmentDate).format('DD/MM/YYYY HH:mm') }
                    </TableCell>                   
                    <TableCell>
                      
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[appointment.state]}
                          size="sm"
                        />
                        { appointment.state.ucwords() }
                      </div>
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <TablePagination
            component="div"
            count={appointments.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
        />       
      </CardActions>
    </Card>

    <Dialog
      open={openInfoDialog}
      onClose={()=>{
        setOpenInfoDialog(false)
      }}
      aria-labelledby="draggable-dialog-title"
      fullWidth
      maxWidth="md"
    >
    <DialogTitle>
      Información de cita
    </DialogTitle>
    <DialogContent>

      <PerfectScrollbar>
        <div>
          <Table>
            <TableHead>
                <TableRow>                  
                  <TableCell>Doctor/a</TableCell>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Motivo de la consulta</TableCell>
                  <TableCell>Resultados de la consulta</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>                  
                  <TableCell>{  appointmentDetails?.doctorDetails[0] && `${appointmentDetails.doctorDetails[0].name} ${appointmentDetails.doctorDetails[0].lastName}` }</TableCell>
                  <TableCell>{  appointmentDetails?.patientDetails[0] && `${appointmentDetails.patientDetails[0].name} ${appointmentDetails.patientDetails[0].lastName}` }</TableCell>
                  <TableCell>{  appointmentDetails?.reasonForConsultation }</TableCell>
                  <TableCell>{  appointmentDetails?.resultsForConsultation }</TableCell>
                  <TableCell>{  appointmentDetails?.state }</TableCell>
                  <TableCell>{  appointmentDetails?.appointmentDate.split(" ")[0]}</TableCell>                      
                </TableRow>
            </TableBody>
          </Table>
        </div> 
      </PerfectScrollbar>   
    </DialogContent>
  </Dialog>  


  <AppointmentsModal 
          open={ openAppointmentsModal }
          auth={ props.authState }
          doctors={ [] }
          handleClose={()=>{
            setOpenAppointmentsModal(false)
          }}
          handleOpen={()=>{
            setOpenAppointmentsModal(true)
          }}
          saveAppointment={ props.saveAppointment }
          saveMedicine={ props.saveMedicine }
          getAppointmentsByPatientAndDate={ props.getAppointmentsByPatientAndDate }
          getMedicinesByAppointment ={ props.getMedicinesByAppointment }
          patient = {  appointmentDetails?.patientDetails[0] }
  />
  

</Fragment>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
