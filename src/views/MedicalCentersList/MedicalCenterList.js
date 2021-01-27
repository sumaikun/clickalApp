import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MedicalCentersToolbar, MedicalCenterCard } from './components';
import { connect } from 'react-redux';

import { getMedicalCenters , getMedicalCenter } from 'actions/medicalCenters';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

class MedicalCenterList extends Component{

  constructor(props){
    super(props)
    console.log("medicalCenterlist props",props)
    this.state = {
      medicalCenters:[]
    }   
  }

  componentDidMount(){
    
    this.props.getMedicalCenters((success,error)=>{
      this.setState({
        ...this.state,
        medicalCenters:this.props.medicalCentersState.medicalCenters,
        selectedMedicalCenter:null,
        page:0,
        rowsPerPage:6
      },()=>console.log("current state",this.state))
    })


    
    this.createButton = this.createButton.bind(this)
    this.editButton = this.editButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
    this.filteredMedicalCenters = this.filteredMedicalCenters.bind(this)
    this.addSelectedMedicalCenter = this.addSelectedMedicalCenter.bind(this)


    this.leftPagination = this.leftPagination.bind(this)
    this.rightPagination = this.rightPagination.bind(this)

    this.csvExport = this.csvExport.bind(this)
  
  }

  addSelectedMedicalCenter(id){

    let medicalCenter = this.state.medicalCenters.filter( medicalCenter =>  medicalCenter._id === id )[0]
    
    this.setState({
      ...this.state,
      selectedMedicalCenter:medicalCenter,
    })

  }

  csvExport() {
      
    let arrData = this.state.medicalCenters;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += [
      Object.keys(arrData[0]).join(";"),
      ...arrData.map(item => Object.values(item).join(";"))
    ]
      .join("\n")
      .replace(/(^\[)|(\]$)/gm, "");

    const data = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", "report.csv");
    link.click();
  }

  createButton(){
    console.log("create Button");
    this.props.getMedicalCenter(null)
    this.props.history.push('/medicalCenters/form')
  }

  editButton(id){
    console.log("edit Button");
    let self = this
    this.props.getMedicalCenter(id,(success, error)=>{
      if(success)
      {
        self.props.history.push('/medicalCenters/form')
      }
    })
  }

  deleteButton(id){
    console.log("delete Button");
  }

  filteredMedicalCenters(data){
    //console.log("data",data)
    //return this.props.medicalCentersState.medicalCenters
    
    if(data.length == 0)
    {
      this.setState({
        ...this.state,
        medicalCenters:this.props.medicalCentersState.medicalCenters
      })
    }else
    {
      data = data.toLowerCase()

      const filteredArray = this.props.medicalCentersState.medicalCenters.filter( medicalCenter => 
        medicalCenter.name.toLowerCase().includes(data) ||
        medicalCenter.value.includes(data) ||
        medicalCenter.description.toLowerCase().includes(data) 
      )

      this.setState({
          ...this.state,
          medicalCenters:filteredArray
      })

    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("should update");
    return nextProps === this.props
  }

  leftPagination(){
    if(this.state.page > 0)
    {
      this.setState({
        ...this.state,
        page: this.state.page - 1
      })
    }    
  }

  rightPagination(){
    if( this.state.rowsPerPage * (this.state.page + 1) <  this.state.medicalCenters.length )
    {
      this.setState({
          ...this.state,
          page: this.state.page + 1
      },()=>{
        //console.log("result state",this.state)
      })
    }    
  }

  render(){    
    const { classes } = this.props;

    const { page , rowsPerPage } = this.state;

    return (
      <div className={classes.root}>
        <MedicalCentersToolbar csvExport={this.csvExport} filteredMedicalCenters={this.filteredMedicalCenters} createButton={this.createButton}  />
        <div className={classes.content}>
          <Grid
            container
            spacing={3}
          >
            {this.state.medicalCenters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(medicalCenter => (
              <Grid
                item
                key={medicalCenter.id}
                lg={4}
                md={6}
                xs={12}
              >
                <MedicalCenterCard
                editButton={this.editButton}
                deleteButton={this.deleteButton}
                medicalCenter={medicalCenter} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.pagination}>
            <Typography variant="caption">{1  + (page * rowsPerPage) }-{ rowsPerPage * (page + 1) } of { this.state.medicalCenters.length }</Typography>
          <IconButton>
            <ChevronLeftIcon onClick={this.leftPagination} />
          </IconButton>
          <IconButton>
            <ChevronRightIcon onClick={this.rightPagination} />
          </IconButton>
        </div>
      </div>
    );
  }

}


const mapStateToProps = state => {
 
  return {
    medicalCentersState: state.medicalCenters,  
  };
}

MedicalCenterList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const componentDefinition =  withStyles(useStyles)(MedicalCenterList);

export default  connect(mapStateToProps, { getMedicalCenters , getMedicalCenter } )(componentDefinition);



