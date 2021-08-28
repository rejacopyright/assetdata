import React, { useState, Fragment } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '_assets/scss/calendar.scss'
// import '@date-io/moment'
import { DateRange } from 'react-date-range'
import * as locales from 'react-date-range/dist/locale'

function Index(props){
  const [state, stateSet] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  function handleSelect(r){
    stateSet({...r.selection})
  }
  return (
    <Fragment>
      <div className={!props.children ? `same-30 radius-50 center pointer text-9 ${props.btnClass}` : ''} data-toggle="modal" data-target={`#${props.id || 'selection'}`}> {props.children || <i className={`uil ${props.icon || 'uil-calendar-alt'}`} />}</div>
      <div className="modal fade" id={`${props.id || 'selection'}`} role="dialog" aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered center ${props.modalClass}`}>
          <div className="modal-content w-auto p-2">
            <DateRange
              ranges={[state]}
              locale={locales['id']}
              onChange={handleSelect}
              />
            <div className="row">
              <div className="col text-right">
                <span className="btn pointer btn-sm text-muted width-md" data-dismiss="modal">Tutup</span>
                <span className="btn pointer btn-sm btn-soft-primary width-md" data-dismiss="modal" onClick={() => props.onChange(state)}>Okey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Index
