import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

function Index(props){
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
      open={props.open}
      autoHideDuration={5000}
      onClose={props.onClose}
      >
      <div className={`bg-soft-${props.theme || 'primary'} text-center text-${props.theme || 'primary'} border border-${props.theme || 'primary'} radius-5 shadow py-1 px-3 f-500 mw-200`}>
        <span className={`mr-1 text-10 uil uil-exclamation-circle`}></span> {props.msg || ''}
        </div>
      </Snackbar>
    )
}

export default Index;
