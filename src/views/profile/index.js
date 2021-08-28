import {useEffect, useState, useRef, useMemo} from 'react'
import {useSize} from '_utils/hooks'
import {axios} from '_utils/axios'
import { Decimal, Input } from '_components/form'
import Alert from '_components/alert'

function ImageSection(props){
  const imgContainer = useRef()
  const inputImage = useRef()
  const imgRef = useRef()
  const [image, imageSet] = useState()
  const [imgHeight, imgHeightSet] = useState()
  useSize(() => {
    const c = imgContainer.current
    c && imgHeightSet(c.clientWidth)
  }, 300)
  function changeImage(e){
    const file = inputImage.current.files[0]
    if (file) {
      imageSet({blob:URL.createObjectURL(file), file})
      inputImage.current.value = ''
    }
  }
  useEffect(() => {
    image && props.onChange({name: 'image', value: image})
  }, [image, props])
  return(
    <div className="row mx-0 mb-2 center-left">
      <div className="col-md-2 offset-md-0 col-8 offset-2 my-2">
        <input ref={inputImage} type="file" accept="image/png, image/jpeg" className="d-none" onChange={changeImage} />
          {
            !image ?
            <div className="w-100 h-100 center" ref={imgContainer}>
              <div className="w-100 pointer mx-auto oh p-2 center border border-gray border-dashed radius-10" onClick={() => inputImage.current.click()} style={{height: imgHeight}}>
                <div className="text-center">
                  <i className="uil uil-image-plus h1 text-light lh-75"></i>
                  <p className="mb-0 mt-1 text-gray">Update Foto Profile</p>
                </div>
              </div>
            </div>
            :
            <div ref={imgContainer} className="center hover-xs position-relative radius-5 oh shadow" style={{height: imgHeight}}>
              <div className="w-100 h-100 mx-auto oh bg-img-c" ref={imgRef} style={{ backgroundImage: `url(${image.blob})` }}> </div>
            </div>
          }
      </div>
      <div className="col my-2">
        <p className="bold text-10 my-0 text-capitalize">{props.first_name || 'John'} {props.last_name || 'Doe'}</p>
        <p className="mb-2 text-muted">{props.email || 'mail@mail.com'}</p>
        <div className="m-0 btn btn-xs btn-soft-primary bold">{props.account_type || 'Reguler'} Accout</div>
        {
          image &&
          <div className="btn-list mt-2">
            <div onClick={() => inputImage.current.click()} className="btn btn-xs btn-outline-light pointer bold py-0 pr-3 mr-1"><i className="uil uil-redo mr-1" />Ganti</div>
            <div onClick={() => imageSet()} className="btn btn-xs btn-outline-danger pointer bold py-0 pr-3"><i className="uil uil-times mr-1" />Hapus</div>
          </div>
        }
      </div>
    </div>
  )
}
function InfoSection(props){
  function onChange(e){
    props.onChange && props.onChange(e.target)
  }
  return(
    <div className="shadow border p-2 pb-3 radius-10">
      <div className="row mx-n1 pb-1 border-bottom border-light mb-3 center-left">
        <div className="col-auto col-md bold text-12">
          <div className="center-left"><i className="uil uil-exclamation-circle mr-1 text-14"/>Profile Page</div>
        </div>
      </div>
      {/* Image */}
      <ImageSection {...props} />
      {/* Name */}
      <div className="row mx-0 mb-2 center-left">
        <div className="col-md-6">
          <div className="row center-left">
            <div className="col-md-4 col-auto my-2"> <p className="bold m-0">First Name</p> </div>
            <div className="col my-2 pl-0"> <Input defaultValue={props.first_name} sm name="first_name" placeholder="First Name" onChange={onChange} /> </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row center-left">
            <div className="col-md-4 col-auto my-2"> <p className="bold m-0">Last Name</p> </div>
            <div className="col my-2 pl-0"> <Input defaultValue={props.last_name} sm name="last_name" placeholder="Last Name" onChange={onChange} /> </div>
          </div>
        </div>
      </div>
      {/* Company */}
      <div className="row mx-0 mb-2 center-left">
        <div className="col-md-6">
          <div className="row center-left">
            <div className="col-md-4 col-auto my-2"> <p className="bold m-0">Company</p> </div>
            <div className="col my-2 pl-0"> <Input disabled sm name="company" placeholder={(props.company && props.company.name) || 'Company'} onChange={onChange} /> </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row center-left">
            <div className="col-md-4 col-auto my-2"> <p className="bold m-0">Department</p> </div>
            <div className="col my-2 pl-0"> <Input disabled sm name="company_department" placeholder={props.company_department || 'Department'} onChange={onChange} /> </div>
          </div>
        </div>
      </div>
      {/* Job */}
      <div className="row mx-0 mb-2 center-left">
        <div className="col-md-6">
          <div className="row center-left">
            <div className="col-md-4 col-auto my-2"> <p className="bold m-0">Job Title</p> </div>
            <div className="col my-2 pl-0"> <Input sm name="job_title" placeholder={props.job_title || 'Job Title'} onChange={onChange} /> </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row center-left">
            <div className="col-md-4 col-auto my-2"> <p className="bold m-0">Employee ID</p> </div>
            <div className="col my-2 pl-0"> <Input sm name="employee_number" placeholder={props.employee_number || 'Employee ID'} onChange={onChange} /> </div>
          </div>
        </div>
      </div>
      {/* Phone */}
      <div className="row mx-0 mb-2 center-left">
        <div className="col-md-2 col-6 my-2"> <p className="bold m-0">Phone</p> <p className="m-0 text-muted">Number</p> </div>
        <div className="col-md-4 col-6 pl-0 my-2">
          <Decimal sm name="phone_number" onChange={e => props.onChange({name: 'phone_number', value: e})} placeholder="0" icon="+62" min="0" max="999999999999" decimal="0" thousandFalse />
        </div>
      </div>
      <div className="row mx-0 center-left">
        <div className="col-12 border-top border-2 pt-3 text-right">
          <div className="btn btn-sm btn-primary width-md bold text-10 radius-5 pointer" onClick={props.onSubmit}>Save</div>
        </div>
      </div>
    </div>
  )
}
function Index(){
  const [data, dataSet] = useState({})
  const [form, formSet] = useState({})
  const [alert, alertSet] = useState({m: undefined, theme: 'success'})
  useMemo(() => {
    document.title = 'Profile'
    axios.get('/a/me').then(res => dataSet(res.data.data))
  }, [])
  function onChange(e){
    formSet(r => {
      r[e.name] = e.value
      return r
    })
  }
  function onSubmit(){
    if (Object.keys(form).length) {
      axios.put('/a/me').then(res => {
        alertSet({m: res.data.message, theme: 'success'})
      }).catch(err => {
        alertSet({m: err.message, theme: 'danger'})
      })
    }
  }
  return(
    <div className="container-fluid pt-3">
      <div className="px-md-3 px-2 mt-3 mb-4">
        {alert.m && <Alert theme={alert.theme} icon="exclamation-circle" close> {alert.m} </Alert>}
        <InfoSection onSubmit={onSubmit} onChange={onChange} {...data} />
      </div>
    </div>
  )
}

export default Index
