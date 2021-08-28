import React, { useState } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment';

function Index(props){
  const [selectedDate, selectedDateSet] = useState(props.defaultValue || new Date());
  const [isOpen, isOpenSet] = useState(false);
  function handleDateChange(e){
    selectedDateSet(e.toDate());
    props.onChange(e, props.name || false);
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="" onClick={() => isOpenSet(true)}>
        {
          props.children ||
          <button type="button" className={`btn ${props.className}`}>
            <i className={`uil uil-calendar-alt ${props.showDate && 'mr-1'}`} />
            {props.showDate && moment(selectedDate).format('DD-MM-Y')}
          </button>
        }
      </div>
      <DatePicker
        open={isOpen}
        onOpen={() => isOpenSet(true)}
        onClose={() => isOpenSet(false)}
        variant="dialog"
        label="Jam Masuk"
        inputVariant="outlined"
        hidden={true}
        ampm={false}
        minutesStep={5}
        maxDate={props.maxDate}
        disableFuture={props.disableFuture}
        disablePast={props.disablePast}
        showTodayButton={props.showToday}
        value={selectedDate}
        onChange={handleDateChange}
        />
    </MuiPickersUtilsProvider>
  )
}

export default Index
