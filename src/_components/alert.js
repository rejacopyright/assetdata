import React from 'react'

export default function Alert(props){
  return (
    <div className={`alert bg-soft-${props.theme || 'success'} text-${props.theme || 'success'} border-${props.theme || 'success'} alert-dismissible fade show center-left py-1 px-2 lh-12`}>
      { props.icon ? <i className={`uil uil-${props.icon} text-9`} /> : <i className={`uil uil-check-circle text-9`} /> }
      <div className="px-2 text-9">
        {props.children}
      </div>
      { props.close && <div className="ml-auto pointer" data-bs-dismiss="alert" onClick={props.onClose}> <i className="uil uil-times text-9" /> </div> }
    </div>
  )
}
