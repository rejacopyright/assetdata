import React from 'react'
export default function StickyBottom(props){
  return(
    <div className="position-sticky bg-secondary shadowx radius-10 p-3 sticky-bottom">
      <div className="d-block mt-1 text-right">
        {props.children}
      </div>
    </div>
  )
}
