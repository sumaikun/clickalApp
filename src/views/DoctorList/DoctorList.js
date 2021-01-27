import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { DoctorsToolbar, DoctorsTable } from './components';

import { connect } from 'react-redux';

import { getDoctors , getDoctor, deleteDoctor } from 'actions/doctors';

import Swal from 'sweetalert2' 

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});



class DoctorList extends Component{
  
  
  constructor(props){
    super(props)
    console.log("doctorlist props",props)
    this.state = {
      doctors:[]
    }   
  }

  componentDidMount(){
    
    this.props.getDoctors((success,error)=>{
      this.setState({
        ...this.state,
        doctors:this.props.doctorsState.doctors,
        selectedDoctor:null,
      })
    })
    
    this.createButton = this.createButton.bind(this)
    this.editButton = this.editButton.bind(this)
    this.watchButton = this.watchButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
    this.filteredDoctors = this.filteredDoctors.bind(this)
    this.addSelectedDoctor = this.addSelectedDoctor.bind(this)
  
  }

  addSelectedDoctor(id){

    let doctor = this.state.doctors.filter( doctor =>  doctor._id === id )[0]
    
    this.setState({
      ...this.state,
      selectedDoctor:doctor,
    })

  }

  createButton(){
    console.log("create Button");
    this.props.getDoctor(null)
    this.props.history.push({pathname: '/doctors/form',state: { mode: "form" }})
  }

  editButton(){
    console.log("edit Button");
    let self = this
    this.props.getDoctor(this.state.selectedDoctor._id,(success, error)=>{
      if(success)
      {
        self.props.history.push({pathname: '/doctors/form',state: { mode: "form" }})
      }
    })
  }

  watchButton(){
    console.log("watch Button");
    let self = this
    this.props.getDoctor(this.state.selectedDoctor._id,(success, error)=>{
      if(success)
      {
        self.props.history.push({pathname: '/doctors/form',state: { mode: "watch" }})
      }
    })
  }

  deleteButton(){
    
    console.log("delete Button",this.state.selectedDoctor);

    const self = this

    const selectedDoctor = this.state.selectedDoctor

    Swal.fire({
      title: '¿Esta seguro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(63 81 181)',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si!'
    }).then((result) => {
      if (result.value) {
       
        self.props.deleteDoctor(selectedDoctor._id,(success, error)=>{
          if(success)
          {
            return Swal.fire({
              icon: 'success',
              title: 'Bien',
              text: "Doctor inactivado",          
            })
          }
        })
      }
    })
   
  }

  filteredDoctors(data){
    //console.log("data",data)
    //return this.props.doctorsState.doctors
    
    if(data.length == 0)
    {
      this.setState({
        ...this.state,
        doctors:this.props.doctorsState.doctors
      })
    }else
    {
      data = data.toLowerCase()

      const filteredArray = this.props.doctorsState.doctors.filter( doctor => 
        doctor.name.toLowerCase().includes(data) ||
        doctor.email.toLowerCase().includes(data) || 
        doctor.phone.includes(data) || 
        doctor.date.includes(data) ||
        doctor.address.toLowerCase().includes(data))

      this.setState({
          ...this.state,
          doctors:filteredArray
      })

    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("should update");
    return nextProps === this.props
  }

  render(){    
    const { classes } = this.props;

 


    return (
      <div className={classes.root}>
        <DoctorsToolbar
          selectedDoctor={this.state.selectedDoctor}  
          createButton={this.createButton} 
          editButton={this.editButton}
          deleteButton={this.deleteButton}
          watchButton={this.watchButton}
          filteredDoctors={this.filteredDoctors} />
        <div className={classes.content}>
          <DoctorsTable  addSelectedDoctor={this.addSelectedDoctor} doctors={this.state.doctors} />
        </div>
      </div>
    );  
  }
} 


const mapStateToProps = state => {
 
  return {
    doctorsState: state.doctors,  
  };
}

DoctorList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentDefinition =  withStyles(useStyles)(DoctorList);

export default  connect(mapStateToProps, { getDoctors , getDoctor, deleteDoctor } )(componentDefinition);
