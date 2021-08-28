import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {Inputicon} from '_components/form'
import Alert from '_components/alert'
import {axios} from '_utils/axios'

// INIT JS
function Login(props){
  const [loading, loadingSet] = useState(false)
  const input = useRef([])
  const [msg, msgSet] = useState(null)
  useEffect(() => {
    return () => {
      loadingSet(false)
      msgSet(null)
    }
  }, [])
  function login(e){
    e.preventDefault()
    loadingSet(true)
    const username = input.current['username'].value
    const password = input.current['password'].value
    if (username && password) {
      props.dispatch({type:'USERNAME', value:username})
      props.dispatch({type:'PASSWORD', value:password})
      axios.post('/a/hash-login', {
        email: username,
        password: password,
        expire: 3600,
        type: 'automatic',
      }).then(res => {
        props.dispatch({type:'LOGIN', value:res.data})
        msgSet('Login Berhasil')
        loadingSet(false)
      }).catch(err => {
        console.log(err.message);
        msgSet(err.message)
        loadingSet(false)
      })
    }else {
      msgSet('"Username" & "Password" tidak sesuai')
      loadingSet(false)
    }
  }
  return (
    <div className="account-pages">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-90">
          <div className="col-xl-10">
            <div className="card m-0 radius-30">
              <div className="card-body p-0">
                <div className="row flex-nowrap m-0">
                  <div className="col-md-6 offset-md-3 px-4 py-0 border-1">
                    <div className="text-center mb-1">
                      <img src={require(`_assets/images/logo/logo.png`).default} className="mb-2 p-1 border border-pink radius-100" alt="" height={60} />
                      <h3 className="my-0 text-logo text-14">Company <p className="m-0 f-600 text-7 text-muted lh-2">Company Slogan</p></h3>
                      <span className="center">
                      </span>
                    </div>
                    <div className="row m-0 px-1">
                      <div className="col-12">
                        <form action="#" className="authentication-form" onSubmit={login}>
                          <Inputicon ref={r => input.current['username'] = r } defaultValue="user_test_asset@mailinator.com" onChange={e => props.dispatch({type:'USERNAME', value:e.target.value})} rowClass="w-100" className="text-dark radius-5 border-light" placeholder="Email" icon={<i className="uil uil-user lh-12 text-10 pl-1 o-5"/>} />
                          <Inputicon ref={r => input.current['password'] = r } defaultValue="VW1Gb1lYTnBZVEl3TUNFclFsSnVjbTlaUVVSemF5RT0rWUFEc2shIQ==" onChange={e => props.dispatch({type:'PASSWORD', value:e.target.value})} password rowClass="w-100 my-3" className="text-dark radius-5 border-light" placeholder="Password" icon={<i className="uil uil-padlock lh-12 text-10 pl-1 o-5"/>} />
                            {msg && <Alert theme="danger" icon="exclamation-circle" close> {msg} </Alert>}
                          <div className="form-group mb-0 text-center">
                            <button className="btn btn-primary bold btn-block" type="submit" disabled={loading}> {loading ? 'Loading...' : 'Login'} </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect(s => s)(Login)
