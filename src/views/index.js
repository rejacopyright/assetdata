import {Suspense, useEffect, useCallback} from 'react'
import {Switch, Route} from 'react-router-dom'
import { withRouter } from 'react-router'
import { ClassicSpinner } from 'react-spinners-kit'
import Topbar from 'views/_layouts/topbar'
import MenuBar from 'views/_layouts/menuBar'
import LeftMenu from 'views/_layouts/leftMenu'

import routes from 'views/routes'

function Loading(){
  return <div className="overlay center"><ClassicSpinner color="#555" /></div>
}
function Index(props){
  const expired = useCallback(() => {
    if (false) {
      props.dispatch({type:'LOGOUT'})
    }
  }, [props])
  window.addEventListener('mouseover', expired)
  window.addEventListener('focus', expired)
  useEffect(() => {
    import('_utils/axios').then(({token}) => !token && window.location.reload(false))
    document.body.setAttribute('data-layout', 'nav')
    import('feather-icons').then(f => f.replace())
  }, [])
  useEffect(() => {
    expired()
    return () => {
      window.removeEventListener('mouseover', {})
      window.removeEventListener('focus', {})
    }
  }, [props, expired])
  return (
    <div id="wrapper">
      <Topbar />
      <LeftMenu />
      <div className="content-page ou mt-0">
        <div className="content">
          <Suspense fallback={<Loading />}>
            <Switch>
              { routes.map((r, key) => <Route  key={key} {...r} />) }
            </Switch>
          </Suspense>
        </div>
      </div>
      <MenuBar />
    </div>
  )
}
export default withRouter(Index)
