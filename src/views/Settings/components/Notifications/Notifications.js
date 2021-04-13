import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  Button,
  Switch,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

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

const Notifications = props => {

  const { className, doctorSetting, ...rest } = props;

  const classes = useStyles();

  //console.log("doctorSetting",doctorSetting)

  const [ settings, setSettings ] = useState({
    hoursRange: doctorSetting?.hoursRange || [450,450],
    daysRange: doctorSetting?.daysRange || [],
    isScheduling: doctorSetting?.isScheduling || false,
    appointmentTime: doctorSetting?.appointmentTime || ""
  })

  const saveSettings = () => {
    props.saveSetting(settings)
  }

  const minutesToHours = (minutes) => {
    //console.log("hoursRangeCopy[0]",hoursRangeCopy[0],Math.floor(hoursRangeCopy[0]/60), hoursRangeCopy[0] - (60 * Math.floor(hoursRangeCopy[0]/60)) )
    
    const hours = Math.floor(minutes/60)

    const minutesResult = minutes - (60 * Math.floor(minutes/60))

    const stringhours =  hours < 10 ?  "0" + String(hours) : String(hours)

    const stringMinutes = minutesResult < 10 ? "0" + String(minutesResult) : String(minutesResult)

    return  stringhours + ":" + stringMinutes
  
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Configuración para agenda"
          title=""
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap" >
            <Grid
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Horas de atención
              </Typography>

              <div style={{display:"flex",justifyContent:"space-around"}} >

                <TextField
                  id="time"
                  label="Desde"
                  type="time"
                  defaultValue="07:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}

                  value = { minutesToHours(settings.hoursRange[0]) }

                  onChange={(e)=>{

                    const hoursRangeCopy = JSON.parse( JSON.stringify(settings.hoursRange) )

                    const time = e.target.value.split(":")

                    hoursRangeCopy[0] = Number(time[0]*60) + Number(time[1])

                    setSettings({ ...settings, hoursRange:hoursRangeCopy  })
                  }}
                />
                
                <TextField
                  id="time"
                  label="Hasta"
                  type="time"
                  defaultValue="07:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}

                  value = { minutesToHours(settings.hoursRange[1]) }

                  onChange={(e)=>{

                    const hoursRangeCopy = JSON.parse( JSON.stringify(settings.hoursRange) )

                    const time = e.target.value.split(":")

                    hoursRangeCopy[1] = Number(time[0]*60) + Number(time[1])

                    setSettings({ ...settings, hoursRange:hoursRangeCopy  })
                  }}
                />

              </div>              
             
            </Grid>

            <Grid className={classes.item} item md={6} sm={6} xs={12}>
              <Typography
                gutterBottom
                variant="h6"
              >
                Dias de atención
              </Typography>

              <FormControlLabel
                checked = { settings.daysRange.includes('Mon') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Mon'}
                  />
                }
                label="Lunes"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />

              <FormControlLabel
                checked = { settings.daysRange.includes('Tues') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Tues'}
                  />
                }
                label="Martes"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />

              <FormControlLabel
                checked = { settings.daysRange.includes('Wed') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Wed'}
                  />
                }
                label="Miercoles"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />


              <FormControlLabel
                checked = { settings.daysRange.includes('Thurs') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Thurs'}
                  />
                }
                label="Jueves"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />


              <FormControlLabel
                checked = { settings.daysRange.includes('Frid') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Frid'}
                  />
                }
                label="Viernes"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />


              <FormControlLabel
                checked = { settings.daysRange.includes('Sat') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Sat'}
                  />
                }
                label="Sabado"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />

              <FormControlLabel
                checked = { settings.daysRange.includes('Sun') }
                control={
                  <Checkbox
                    color="primary"
                    value={'Sun'}
                  />
                }
                label="Domingo"
                onChange={ (e) => {

                  const daysRangeCopy = JSON.parse( JSON.stringify(settings.daysRange) )
                  
                  if(e.target.checked)
                  {
                    daysRangeCopy.push(e.target.value)
                  }else{
                    const index = daysRangeCopy.indexOf(e.target.value);
                    if (index > -1) {
                      daysRangeCopy.splice(index, 1);
                    }
                  }

                  setSettings({ ...settings, daysRange:daysRangeCopy  })

                }}
              />

            </Grid>

            <Grid className={classes.item} item md={12} sm={12} xs={12}>
              <Typography
                gutterBottom
                variant="h6"
              >
                ¿ En este momento estas atendiendo citas ?
              </Typography>

              <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>No</Grid>
                    <Grid item>
                        <AntSwitch  name="havePreviousIllness"
                          checked = { settings.isScheduling }
                          onChange={ e => {
                            setSettings({ ...settings, isScheduling:e.target.checked  })
                          }}
                         />
                    </Grid>
                    <Grid item>Si</Grid>
                </Grid>
             
            </Grid>

            <Grid className={classes.item} item md={12} sm={12} xs={12}>
              <Typography
                gutterBottom
                variant="h6"
              >
                Cual es el valor por defecto de la cita
              </Typography>

              <TextField
                fullWidth
                onChange={ e =>  { 
                  console.log("e.target.value",e.target.value)
                  setSettings({ ...settings, appointmentTime:e.target.value  })
                }}
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                InputLabelProps={{ shrink: !!doctorSetting?.appointmentTime }}               
                variant="outlined"
              >
                <option  value={""}></option>
                <option  value={"30"} selected={ doctorSetting?.appointmentTime == "30" } >30 MINUTOS</option>
                <option  value={"45"} selected={ doctorSetting?.appointmentTime == "45" } >45 MINUTOS</option>
                <option  value={"60"} selected={ doctorSetting?.appointmentTime == "60" } >60 MINUTOS</option>
              
              </TextField>
           
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={saveSettings}
          >
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
