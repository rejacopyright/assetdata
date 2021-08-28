import {createStore} from 'redux'
import Cookies from 'js-cookie'
import moment from 'moment'
import 'moment/locale/id'
// Init State
const init = {
  username:null,
  password:null,
  auth:false,
}
// Reducer
const reducer = (state = init, action) => {
  if (action.type === 'USERNAME') {
    return {...state, username: action.value}
  }
  if (action.type === 'PASSWORD') {
    return {...state, password: action.value}
  }
  if (action.type === 'LOGIN') {
    if (state.username && state.password) {
      let data = action.value
      let expires = moment().add(data.expire, 's').toDate()
      Cookies.set('token', data.token, expires)
      Cookies.set('auth', true, expires)
      return {...state, auth: true}
    }
  }
  if (action.type === 'LOGOUT') {
    Object.keys(Cookies.get()).map(r => Cookies.remove(r))
    return {state:init}
  }
  return state
}
// Store
const store = createStore(reducer)
export default store
