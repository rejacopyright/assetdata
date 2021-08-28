import React, {Fragment, useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '_assets/images/logo/logo.png'
import { connect } from 'react-redux'

function TopBar(props){
  const [height, heightSet] = useState(0)
  const ref = useRef()
  useEffect(() => {
    heightSet(ref.current.offsetHeight)
  }, [])
  function mobileBtn(e){
    let layout = document.body.getAttribute('data-layout');
    if (layout === 'topnav') {
      e.currentTarget.classList.toggle('open');
      // $('#topnav-menu-content').slideToggle(400);
    } else {
      document.body.classList.toggle('sidebar-enable');
      if (window.innerWidth >= 768) {
        document.body.classList.toggle('left-side-menu-condensed');
      } else {
        document.body.classList.remove('left-side-menu-condensed');
      }
    }
  }
  return (
    <Fragment>
      <div ref={ref} className={`navbar navbar-expand flex-column flex-md-row navbar-custom rj-topbar`}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brands mr-0 mr-md-2 logo">
            <span className="logo-lg center-left">
              <img src={Logo} alt="img" height={25} className="radius-50" />
              <span className="d-inline ml-2 text-primary f-700 text-12">Company</span>
            </span>
            <span className="logo-sm"> <img src={Logo} alt="img" height={24} /> </span>
          </Link>
          <ul className="navbar-nav flex-row list-unstyled menu-left mb-0">
            <li>
              <button className="button-menu-mobile open-left disable-btn" onClick={mobileBtn}>
                <i data-feather="menu" className="menu-icon" />
                <i data-feather="x" className="close-icon" />
              </button>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto list-unstyled topnav-menu center mb-0">
            <li className="dropdown notification-list">
              <Link to="#" className="nav-link right-bar-toggle" onClick={() => props.dispatch({type: 'LOGOUT'})}> <i data-feather="log-out" className="icon-dual" /> </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ paddingBottom: height }} />
    </Fragment>
  )
}

export default connect(s=>s)(TopBar)
