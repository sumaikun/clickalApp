import React, { Component } from 'react';
import moment from 'moment';
import { ReactAgenda, ReactAgendaCtrl, Modal } from 'react-agenda';
import { connect } from 'react-redux';
import Swal from 'sweetalert2' 
import { getAgendaAnnotations, saveAgendaAnnotation } from 'actions/agendaAnnotations'
import { getAppointments, saveAppointment, getAppointmentsByPatientAndDate  } from 'actions/appointments'
import { getPatients } from 'actions/patients'
import { saveMedicine, getMedicinesByAppointment } from 'actions/medicines'
import { Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
TextField } from '@material-ui/core'

import PerfectScrollbar from 'react-perfect-scrollbar';

import AppointmentsModal from 'views/PatientList/components/AppointmentsModal'

import PatientsModal from './Components/PatientsModal';


var now = new Date();

require('moment/locale/es.js');
    var colors= {
      'color-1':"rgba(102, 195, 131 , 1)" ,
      "annotation-color":"rgba(25, 39, 72, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)",
      "appointment-color":"#3f51b5"
    }


var items = [
  /*{
   _id            :guid(),
    name          : 'Cita thara!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1 color-4'
  }*/
];

class Agenda extends Component {

  constructor(props){

      super(props);

      this.state = {
        items:[],
        selected:[],
        cellHeight:(60 / 4),
        showModal:false,
        locale:"fr",
        rowsPerHour:4,
        numberOfDays:4,
        startDate: new Date(),
        open:false,
        openNotesModal:false,
        openSelectionModal:false,
        openPatientsModal:false,
        openAppointmentsModal:false,
        patiens:[],
        annotationToSave:{},
        currentSelectedPatient:null
      }
      
      this.handleRangeSelection = this.handleRangeSelection.bind(this)
      this.handleItemEdit = this.handleItemEdit.bind(this)
      this.zoomIn = this.zoomIn.bind(this)
      this.zoomOut = this.zoomOut.bind(this)
      this._openModal = this._openModal.bind(this)
      this._closeModal = this._closeModal.bind(this)
      this.addNewEvent = this.addNewEvent.bind(this)
      this.removeEvent = this.removeEvent.bind(this)
      this.editEvent = this.editEvent.bind(this)
      this.changeView = this.changeView.bind(this)
      this.handleCellSelection = this.handleCellSelection.bind(this)
      this.closeDialog = this.closeDialog.bind(this)
      this.closeNotesModal = this.closeNotesModal.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.saveAgendaAnnotation = this.saveAgendaAnnotation.bind(this)


      this.closeDialogPatients = this.closeDialogPatients.bind(this)
      this.closeDialogSelection = this.closeDialogSelection.bind(this)

      this.selectPatient = this.selectPatient.bind(this)

      this.openAppointmentsModal = this.openAppointmentsModal.bind(this)
      this.closeAppointmentsModal = this.closeAppointmentsModal.bind(this)


      this.proccessServerAppointments = this.proccessServerAppointments.bind(this)
      this.proccessServerAnnotations = this.proccessServerAnnotations.bind(this)
  }

  componentDidMount(){

    //this.setState({items:items})

    this.props.getPatients()  
    this.proccessServerAppointments()
    this.proccessServerAnnotations()  

  }

  proccessServerAppointments(){
    this.props.getAppointments((success,error)=>{
      if(success){
        success.forEach(element => {

          const index = items.findIndex( item => item._id == element._id )

          if(index != -1)
          {
            items[index] = {
              _id            :element._id,
              name          : element.patientDetails && element.patientDetails[0]?.name,
              startDateTime : new Date(element.appointmentDate),
              endDateTime   : moment(element.appointmentDate).add(1, 'hours'),
              classes       : 'appointment-color',
              type: 'appointment',
              meta:element
            }
          }else{
            items.push({
              _id            :element._id,
              name          : element.patientDetails && element.patientDetails[0]?.name,
              startDateTime : new Date(element.appointmentDate),
              endDateTime   : moment(element.appointmentDate).add(1, 'hours'),
              classes       : 'appointment-color',
              type: 'appointment',
              meta:element
            })
          }

        });

        //console.log("items",items)
        this.setState({items:items})

      }      
    })
  }

  proccessServerAnnotations(){
    this.props.getAgendaAnnotations((success,error)=>{
      if(success){
        console.info("agenda annotations",success)
        success.forEach(element =>{

          const index = items.findIndex( item => item._id == element._id )

          if(index != -1)
          {
            items[index] = {
              _id            :element._id,
              name          : element.title,
              startDateTime : new Date(element.annotationDate),
              endDateTime   : new Date(element.annotationToDate),
              classes       : 'annotation-color',
              type: 'annotation',
              meta:element
            }
          }else{
            items.push({
              _id            :element._id,
              name          : element.title,
              startDateTime : new Date(element.annotationDate),
              endDateTime   : new Date(element.annotationToDate),
              classes       : 'annotation-color',
              type: 'annotation',
              meta:element
            })
          }
          
        })

        this.setState({items:items})
      }      
    })
  }

  closeDialog(){
    this.setState({ ...this.state, open:false})
  }

  closeNotesModal(){
    this.setState({ ...this.state, openNotesModal:false})
  }

  closeDialogSelection(){
    this.setState({ ...this.state, openSelectionModal:false })
  }

  closeDialogPatients(){
    this.setState({ ...this.state, openPatientsModal:false })
  }

  openAppointmentsModal(){
    this.setState({ ...this.state, openAppointmentsModal:true })
  }

  closeAppointmentsModal(flag){
    console.log("flag",flag)
    this.setState({ ...this.state,
      openAppointmentsModal:false,
      openSelectionModal:false
    })
    if(flag)
    {
      //this.proccessServerAnnotations()
      this.proccessServerAppointments()
    }
  }


  componentWillReceiveProps(next , last){
    
    if(next.items){

      this.setState({items:next.items})
    }
    
  }

  handleItemEdit(item, openModal) {

    console.log("item",item)

    //console.log("event on cell selected",item,this.state)

    if(item.type === "appointment")
    {

      console.log("item",item)

      this.setState({
        ...this.state,
        open:true,
        appointmentDetails:item.meta
      })
    }
    else{
      if(item.type === "annotation")
      {
        this.setState({
          annotationToSave:{
            ...this.state,
            _id:item.meta._id,
            title:item.meta.title,
            description:item.meta.description,
            annotationDate:item.meta.annotationDate,
            annotationToDate:item.meta.annotationToDate
          }
        })
      }
      if(item && openModal === true){
        this.setState({selected:[item] })
        console.log(this.state)
        return this._openModal();
      }
    }

  }

  handleCellSelection(item, openModal) {

    console.log("event on cell selected",item,this.state)

    if(this.state.selected && this.state.selected[0] === item){
      console.log(this.state)
      /*this.setState({annotationToSave:{
        ...this.state.annotationToSave,
        annotationDate:this.state.selected[0],
        annotationToDate:this.state.selected[1]
      }})*/
      return  this._openModal();
    }
    this.setState({selected:[item] })

  }

  zoomIn(){
    
    var num = this.state.cellHeight + 15
    this.setState({cellHeight:num})
    
  }
  zoomOut(){

    var num = this.state.cellHeight - 15
    this.setState({cellHeight:num})
  
  }


  handleDateRangeChange (startDate, endDate) {
      
    this.setState({startDate:startDate })

  }

  handleRangeSelection (selected) {

      //console.log("handleRangeSelection",selected,this.state)

      const annotationToSave = JSON.parse(JSON.stringify({
        annotationDate:selected[0],
        annotationToDate:selected[1]
      }))
      
      this.setState({...this.state, selected:selected , showCtrl:true, annotationToSave },()=> this._openModal() )

  }

  _openModal(){
    //this.setState({showModal:true})

    //console.log("selected",this.state)

    //this.setState({openNotesModal:true})

    console.log("this.state",this.state)

    this.setState({ ...this.state, openSelectionModal:true })
  }

  _closeModal(e){
    if(e)
    {
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }

  handleItemChange(items , item){

    //console.log("item changed",item)
    //console.log(item.meta.state)
    if(item.type === "appointment" && item.meta.state != "PENDING" )
    {

      const { meta } = item

      const index = items.findIndex( item => item._id == meta._id )

      if(index != -1)
      {
        items[index] = {
          _id            :meta._id,
          name          : meta.patientDetails && meta.patientDetails[0]?.name,
          startDateTime : new Date(meta.appointmentDate),
          endDateTime   : moment(meta.appointmentDate).add(1, 'hours'),
          classes       : 'appointment-color',
          type: 'appointment',
          meta:meta
        }
      }
      
      this.setState({items:items})

      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: "No puede modificarse la fecha de una cita del calendario que ha sido confirmada, cancelada o terminada",          
      })

    }
    else{
      if(item.type === "appointment")
      {
        //console.log("this.state",moment(item.startDateTime).format("YYYY-MM-DD HH:mm:ss"))
        this.props.saveAppointment({ ...item.meta, appointmentDate:moment(item.startDateTime).format("YYYY-MM-DD HH:mm:ss") })
        //saveAppointment
      }
      if(item.type === "annotation")
      {
        //console.log("item",item)
        this.props.saveAgendaAnnotation({ ...item.meta, annotationDate:moment(item.startDateTime).format("YYYY-MM-DD HH:mm:ss"),
        annotationToDate:moment(item.endDateTime).format("YYYY-MM-DD HH:mm:ss")  })
      }
      this.setState({items:items})
    }
  }

  handleItemSize(items , item){

    console.log("item sized changed",item)

    this.setState({items:items})

  }

  removeEvent(items , item){

    if(item.type === "appointment")
    {
      return Swal.fire({
        icon: 'warning',
        title: 'Espera',
        text: "No puede borrarse una cita del calendario",          
      })
    }
    else{
      this.setState({ items:items});
    }  
  }

  addNewEvent (items , newItems){

    this.setState({showModal:false ,selected:[] , items:items});
    //this._closeModal();
  }
  editEvent (items , item){

    this.setState({showModal:false ,selected:[] , items:items});
    //this._closeModal();
  }

  changeView (days , event ){
    this.setState({numberOfDays:days})
  }


  handleChange(event){
    
    //props.changeDetails(event.target.name,event.target.value)
    this.setState({
      annotationToSave:{
        ...this.state.annotationToSave,
        [event.target.name]:event.target.value
      }
    })
  };

  saveAgendaAnnotation(e){
    e.preventDefault()
    console.log("agenda annotation",this.state.annotationToSave)
    if( !this.state.annotationToSave.title || !this.state.annotationToSave.description )
    {
      this.setState({openNotesModal:false,openSelectionModal:false})
      Swal.fire({
          icon: 'warning',
          title: 'Espera',
          text: "Todos los datos son obligatorios",          
      }).then( data => {
        this.setState({openNotesModal:true})
      })
    }else{
      this.props.saveAgendaAnnotation(this.state.annotationToSave,(success,error)=>{
        if(success)
        {
          this.setState({openNotesModal:false,openSelectionModal:false})
          Swal.fire({
            icon: 'success',
            title: 'Bien',
            text: "Datos registrados",          
          })  
          this.proccessServerAnnotations()
        }
      })
    }
    
  }

  selectPatient(patient){
    //console.log("select patient",patient)

    let validation = false
    
    this.state.items.map( item => {
      
      if(item.type === "appointment"){
        
        if( moment(item.meta.appointmentDate).diff( moment(this.state.selected[0]), 'days') == 0 &&
            item.meta.patient == patient
          )
        {
          validation = true
        }
      }
    })

    if(validation){
      this.setState({ openSelectionModal:false },() => Swal.fire("Espera","ya existe una cita agendada para el mismo paciente el mismo dia","warning"))
    }else{
      this.setState({...this.state, currentSelectedPatient:patient},()=>{
        console.log("this.state",this.state)
        this.openAppointmentsModal()
      })
    }    
    
  }


  render() {

    /*var AgendaItem = function(props){
      console.log( ' item component props' , props)
      return <div style={{display:'block', position:'absolute' , background:'#FFF'}}>{props.item.name} <button onClick={()=> props.edit(props.item)}>Edit </button></div>
    }*/
    return (

      <div className="content-expanded ">

        <div className="control-buttons">
          <button  className="button-control" onClick={this.zoomIn}> <i className="zoom-plus-icon"></i> </button>
          <button  className="button-control" onClick={this.zoomOut}> <i className="zoom-minus-icon"></i> </button>
          <button  className="button-control" onClick={this._openModal}> <i className="schedule-icon"></i> </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 4)}> {moment.duration(4, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
          <button  className="button-control" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>
        </div>

        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={6}
          endAtTime={23}
          cellHeight={this.state.cellHeight}
          locale="fr"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={true}
          //itemComponent={AgendaItem}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)} />

        {
          this.state.showModal &&
          <Modal clickOutside={this._closeModal} >
            <div className="modal-content">
              <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected}
               Addnew={this.addNewEvent} edit={this.editEvent}  />
            </div>
          </Modal>
        }

      <Dialog
        open={this.state.open}
        onClose={this.closeDialog}
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
                      { moment(this.state.appointmentDetails?.appointmentDate).isSame(new Date(), "day") && <TableCell>Opciones</TableCell> }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>                  
                      <TableCell>{ this.state.appointmentDetails?.doctorDetails[0]?.name }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.patientDetails[0]?.name }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.reasonForConsultation }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.resultsForConsultation }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.state }</TableCell>
                      <TableCell>{ this.state.appointmentDetails?.appointmentDate.split(" ")[0] || this.state.appointmentDetails?.date.split(" ")[0] }</TableCell>
                      { moment(this.state.appointmentDetails?.appointmentDate).isSame(new Date(), "day") && 
                      <TableCell>
                        <Button color="primary" variant="contained" style={{ fontSize:12 }}
                          onClick={()=>{
                            this.setState({openAppointmentsModal:true})
                          }}
                        >Ir a cita</Button>  
                      </TableCell>
                      }                      
                    </TableRow>
                </TableBody>
              </Table>
            </div> 
          </PerfectScrollbar>   
        </DialogContent>
      </Dialog>  


      <Dialog
        open={this.state.openNotesModal}
        onClose={this.closeNotesModal}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>
          Nueva nota
        </DialogTitle>
        <DialogContent>

        <form onSubmit={this.saveAgendaAnnotation} >
          <Grid  container>            

              <Grid item lg={12} md={12} xs={12}>
                  <TextField  fullWidth  label="Titulo de la nota" margin="dense"
                  required
                  name="title" value={this.state.annotationToSave.title} variant="outlined"
                  onChange={this.handleChange}
                  />
              </Grid>
              
              <Grid item lg={12} md={12} xs={12}>
                  <TextField  fullWidth  label="Descripción de la nota" margin="dense"
                  required
                  name="description" value={this.state.annotationToSave.description}
                  onChange={this.handleChange}
                  variant="outlined"
                  multiline rows={3} />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  id="datetime-local"
                  label="Fecha inicio"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  name="annotationDate"
                  value={this.state.annotationToSave.annotationDate}
                  onChange={this.handleChange}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  required
                />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  id="datetime-local"
                  label="Fecha final"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  name="annotationToDate"
                  value={this.state.annotationToSave.annotationToDate}
                  onChange={this.handleChange}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  required
                />
              </Grid>
              

              <Grid item lg={12} md={12} xs={12}>
                <Button color="primary" variant="contained" type="submit" style={{marginTop:"10px"}} >
                    Guardar
                </Button>
              </Grid>        
            
          </Grid>
        </form>

        </DialogContent>    
      </Dialog>

      <Dialog
        open={this.state.openSelectionModal}
        onClose={this.closeDialogSelection}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>
          ¿ Que deseas realizar ?
        </DialogTitle>
        <DialogContent>
          <Grid  container>            

            <Grid item lg={12} md={12} xs={12}>
              <Button color="primary" variant="contained" fullWidth  onClick={ () => {

                if(moment(this.state.selected[0]).isBefore(moment(), "day"))
                {
                  alert("No puede agendar citas previas al tiempo actual")
                }else{
                  this.setState({ ...this.state, openPatientsModal:true })
                }
                
               }} >
                 Agendar cita
              </Button>
            </Grid>

            

            <Grid item lg={12} md={12} xs={12} style={{ marginTop:"20px", marginBottom:"20px" }} >
              <Button color="primary" variant="contained" fullWidth onClick={ () => this.setState({ ...this.state, openNotesModal:true  })  } >
                 Poner una anotación en la agenda
              </Button>
            </Grid>

          </Grid>
        </DialogContent>    
      </Dialog>

      <PatientsModal open={this.state.openPatientsModal} selectPatient={this.selectPatient}  patients={ this.props.patients }
        handleClose={this.closeDialogPatients} />

      <AppointmentsModal 
          open={ this.state.openAppointmentsModal }
          auth={ this.props.authState }
          doctors={ [] }
          handleClose={ this.closeAppointmentsModal }
          handleOpen={ this.openAppointmentsModal }
          saveAppointment={ this.props.saveAppointment }
          saveMedicine={ this.props.saveMedicine }
          getAppointmentsByPatientAndDate={ this.props.getAppointmentsByPatientAndDate }
          getMedicinesByAppointment ={ this.props.getMedicinesByAppointment }
          patient = { this.state.currentSelectedPatient }
          defaultDate={this.state.selected[0]}
      />

    </div>

    );
  }
}  

const mapStateToProps = state => {

  
  
  const { patients, selectedPatient } = state.patients
  
  return {
    patients,
    selectedPatient, 
    appState: state.app,
    authState: state.auth
  };
}

export default  connect(mapStateToProps, { getAgendaAnnotations,
   saveAgendaAnnotation,
   getAppointments,
   getPatients,
   saveAppointment,
   saveMedicine,
   getAppointmentsByPatientAndDate,
   getMedicinesByAppointment })(Agenda)