import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Generate(n, f){
  return Array(n).fill().map((v, i) => (f || 1)+i)
}
function Index(props){
  const [page, pageSet] = useState(1)
  const size = {
    size: (props.xs && '20') || (props.sm && '25') || (props.md && '30') || (props.lg && '40') || '25',
    font: (props.xs && '7') || (props.sm && '8') || (props.md && '9') || (props.lg && '12') || '8',
  }
  useEffect(() => {
    pageSet(props.currentPage)
  }, [props.currentPage])
  if (props.lastPage === 1) {
    return true
  }
  return(
    <div className={`row justify-content-${props.align || 'center'}`}>
      {
        ((props.lastPage > 10 && page >= 7) || (props.lastPage === 11 && page === 6)) &&
        <Fragment>
          <div className="col-auto px-1"><div onClick={() => props.onClick(1)} className={`center same-${size.size || '25'} ${page === 1 ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>1</div></div>
          <div className="col-auto px-1"><div onClick={() => props.onClick(2)} className={`center same-${size.size || '25'} ${page === 2 ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>2</div></div>
          <div className="col-auto px-0"><span className={`center same-${size.size || '25'} oh text-${size.font} bold`}>...</span></div>
        </Fragment>
      }
      {
        (props.lastPage > 10 && page >= 7 && page < (props.lastPage - 5)) ?
        Generate(7, page - 3).map(key => (
          <div className="col-auto px-1" key={key}><div onClick={() => props.onClick(key)} className={`center same-${size.size || '25'} ${page === key ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>{key}</div></div>
        ))
        :
        (props.lastPage > 10 && page >= (props.lastPage - 5)) ?
        Generate(5, props.lastPage - 6).map(key => (
          <div className="col-auto px-1" key={key}><div onClick={() => props.onClick(key)} className={`center same-${size.size || '25'} ${page === key ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>{key}</div></div>
        ))
        :
        Generate(props.lastPage > 10 ? 7 : props.lastPage).map(key => (
          <div className="col-auto px-1" key={key}><div onClick={() => props.onClick(key)} className={`center same-${size.size || '25'} ${page === key ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>{key}</div></div>
        ))
      }
      {
        (props.lastPage > 10) && (
          <Fragment>
            {(page < (props.lastPage - 5)) && <div className="col-auto px-0"><span className={`center same-${size.size || '25'} oh text-${size.font} bold`}>...</span></div>}
            <div className="col-auto px-1"><div onClick={() => props.onClick(props.lastPage-1)} className={`center same-${size.size || '25'} ${page === props.lastPage-1 ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>{props.lastPage-1}</div></div>
            <div className="col-auto px-1"><div onClick={() => props.onClick(props.lastPage)} className={`center same-${size.size || '25'} ${page === props.lastPage ? 'btn-primary' : 'btn-light border border-gray'} oh radius-50 pointer text-${size.font} bold`}>{props.lastPage}</div></div>
          </Fragment>
        )
      }
    </div>
  )
}
// PropTypes
Index.propTypes = {
  // currentPage: PropTypes.any.isRequired,
  // lastPage: PropTypes.any.isRequired,
  onClick: PropTypes.any.isRequired,
}
export default Index
