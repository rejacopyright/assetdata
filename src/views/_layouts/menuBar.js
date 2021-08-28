import React, {useEffect, useState, useRef, Fragment} from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
const menu = [
  { link: '/', icon: 'home' },
  { link: '/search', icon: 'search' },
  { link: '/favorite', icon: 'heart' },
  { link: '/profile', icon: 'user' }
];
function Index(props){
  const height = useRef();
  const [space, spaceSet] = useState(0);
  const[activeLink, activeLinkSet] = useState(null);
  useEffect(() => {
    const rjMenu = document.querySelector(`#rj-menu`).getElementsByClassName('rj-menu');
    let activeItem
    if (window.location.hash) {
      activeItem = Object.values(rjMenu).find(i => i.hash !== '#/' && (i.hash === window.location.hash || window.location.hash.includes(i.hash)) ) || rjMenu[0];
      activeItem = activeItem.hash.replace('#', '')
    }else {
      activeItem = Object.values(rjMenu).find(i => i.pathname !== '/' && (i.pathname === window.location.pathname || window.location.pathname.includes(i.pathname)) ) || rjMenu[0];
      activeItem = activeItem.pathname
    }
    activeLinkSet(activeItem);
    spaceSet(height.current.offsetHeight+10);
  }, [activeLink, props]);
  return(
    <Fragment>
      <div id="rj-menu">
        <div className={`phone fixed-bottom b-0 shadow bg-white z-999 w-100 text-center`} ref={height}>
          <div className="d-flex py-2">
            {
              menu.map((r, key) => (
                <div className="col py-1" key={key} onClick={() => activeLinkSet(r.link)}>
                  <Link to={r.link} className="rj-menu">
                    <img src={require(`_assets/images/icons/${r.icon}${activeLink === r.link ? '-fill' : ''}.png`).default} alt="" className="same-25"/>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
        <div className="phone" style={{paddingBottom: space}} />
      </div>
      {/*<div className="phone" style={{paddingBottom: 10}} />*/}
    </Fragment>
  )
}
export default withRouter(Index)
