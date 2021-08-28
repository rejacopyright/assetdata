import { useEffect, Fragment } from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
function Index(props){
  useEffect(() => {
    $(document).on('click', '.right-bar-toggle', function (e) {
      $('body').toggleClass('right-bar-enabled')
    })
    $(document).on('click', 'body', function (e) {
      if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
        return
      }
      if ($(e.target).closest('.left-side-menu, .side-nav').length > 0 || $(e.target).hasClass('button-menu-mobile')
      || $(e.target).closest('.button-menu-mobile').length > 0) {
        return
      }
      $('body').removeClass('right-bar-enabled')
      $('body').removeClass('sidebar-enable')
      return
    })
  }, [])
  return (
    <Fragment>
      <div className={`right-bar ${props.className}`}>
        <div className="rightbar-title p-3">
          <Link to="#" className="right-bar-toggle float-right text-gray"> <i className="uil uil-times text-14 lh-1" /> </Link>
          <h6 className="m-0 text-primary">{props.title}</h6>
        </div>
        <div className="slimscroll-menu px-3">
          {props.children}
        </div>
      </div>
      <div className="rightbar-overlay" />
    </Fragment>
  )
}
export default Index
