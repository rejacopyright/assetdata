import React, {Fragment} from 'react'
import { ClassicSpinner } from 'react-spinners-kit'

export default function Loading(props){
  return (
    <Fragment>
      {
        props.loading &&
        <div className={`${props.absolute ? 'overlay-absolute' : 'overlay'} center`}>
          <ClassicSpinner color="#5369f8" loading={true} />
        </div>
      }
    </Fragment>
  )
}
