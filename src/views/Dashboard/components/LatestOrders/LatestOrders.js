import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {  Card,  CardActions,  CardHeader,  CardContent,  Divider,  Table,
  TableBody,  TableCell,  TableHead,  TableRow,  IconButton,  Menu,
  MenuItem,  TablePagination
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { StatusBullet } from 'components';

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

  //console.log("props appointments",props.appointments)

  const { className,  ...rest } = props;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [appointments, setAppointments] = useState([])
  const open = Boolean(anchorEl);

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
      data.push({
        _id:appointment._id,
        patient: appointment.patientDetails[0] && `${appointment.patientDetails[0].name} ${appointment.patientDetails[0].lastName}` || "",
        appointmentDate: appointment.appointmentDate,
        state: appointment.state == "PENDING" || appointment.state == "PENDING DOCTOR"
        &&  moment(appointment.appointmentDate).isBefore(moment()) ? "DUE" : appointment.state
      })
    })

    setAppointments(data)

  },[props.appointments])

  return (
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
                            <MenuItem onClick={handleClose}>
                                <b>Detalle de cita</b>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <b>Proceder a cita</b>
                            </MenuItem>
                            <MenuItem 
                              onClick={handleClose}>
                                <b>Confirmar cita</b>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
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
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
