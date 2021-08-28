import {useMemo, useEffect, useState} from 'react'
import {axios} from '_utils/axios'
import Pagination from '_components/pagination'
import Modal from '_components/modal'
import { Decimal, Input } from '_components/form'

function Table(props){
  return(
    <div className="table-responsives">
      <table className="table table-sm table-borderless table-striped table-hover table-radius-5 table-space-5">
        <thead>
          <tr>
            <th className="p-2 bg-secondary text-white text-10 text-center">#</th>
            <th className="py-2 bg-secondary text-white text-10"><i className="uil uil-user pl-2"/></th>
            <th className="py-2 bg-secondary text-white text-10"><i className="uil uil-document-layout-left"/></th>
            <th className="py-2 bg-secondary text-white text-10"><i className="uil uil-money-stack"/></th>
            <th className="py-2 bg-secondary text-white text-10"><i className="uil uil-layer-group" /></th>
          </tr>
        </thead>
        <tbody>
          {
            (props.data || []).map((r, key) => (
              <tr key={key}>
                <td className="text-center text-dark bold pointer">{key+1}</td>
                <td className="pointer"> <p className="m-0 text-10 bold text-secondary">{r.name}</p> </td>
                <td className="pointer text-dark text-9">{r.contact_person || '-'}</td>
                <td className="pointer text-primary text-9 text-nowrap f-700">{r.contact_number || r.contact_number_alternate || '-'}</td>
                <td className="text-right">
                  <div className="btn-group dropleft">
                    <span className="same-20 btn-soft-primary radius-50 center ml-auto pointer dropdown-toggle mr-2" data-bs-toggle="dropdown" aria-expanded="false"><i className="uil uil-layer-group text-10" /></span>
                    <div className="dropdown-menu dropdown-menu-right dropdown-primary shadow-sm">
                      <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#form" onClick={() => props.onEdit && props.onEdit(r.guid)}><i className="uil uil-edit-alt mr-2" />Edit</span>
                      <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#del" onClick={() => props.onDelete && props.onDelete(r.guid)}><i className="uil uil-trash mr-2" />Delete</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
function Separator({title}){
  return(
    <div className="row center-left">
      <div className="col-auto bold text-12 text-primary pr-0 mt-3">{title || 'Title'}</div>
      <div className="col bold text-12 mt-3"><hr className="m-0 border-2"/></div>
    </div>
  )
}
function UpdateOrCreateModal(props){
  const [data, dataSet] = useState({})
  useEffect(() => {
    dataSet(props.data)
  }, [props.data])
  function onChange(e){
    props.onChange && props.onChange(e.target)
  }
  return(
    <Modal id={props.id || 'modal'} title={props.type === 'add' ? 'Add Supplier' : 'Edit Supplier'} modalClass="modal-lg">
      <div className="text-dark">
        <Input value={data.name} sm name="name" label="Supplier Name" placeholder="Supplier Name" onChange={onChange} />
        {props.validation.name && <label className="text-danger">{props.validation.name}</label>}
        <Separator title="Address" />
        <div className="row">
          <div className="col mt-3"> <Input value={data.country_code || 'ID'} sm name="country_code" label="Country" placeholder="Country" onChange={onChange} /> </div>
          <div className="col mt-3"> <Input value={data.state} sm name="state" label="State" placeholder="State" onChange={onChange} /> </div>
        </div>
        <div className="row">
          <div className="col mt-3"> <Input value={data.city} sm name="city" label="City" placeholder="City" onChange={onChange} /> </div>
          <div className="col mt-3"> <Input value={data.street} sm name="street" label="Street/Building" placeholder="Street/Building" onChange={onChange} /> </div>
          <div className="col mt-3"> <Input value={data.postcode} sm name="postcode" label="Postal Code/ZIP" placeholder="Postal Code/ZIP" onChange={onChange} /> </div>
        </div>
        <Separator title="Contact Detail" />
        <div className="row">
          <div className="col mt-3"> <Input value={data.contact_person} sm name="contact_person" label="Contact Person" placeholder="Contact Person" onChange={onChange} /> </div>
          <div className="col mt-3"> <Decimal value={data.contact_number && data.contact_number.toString().split(' ')[1]} sm name="contact_number" onChange={e => props.onChange({name: 'contact_number', value: e})} label="Contact Number" placeholder="0" icon={`+${data.contact_number ? data.contact_number.toString().split(' ')[0] : '62'}`} min="0" max="999999999999" decimal="0" thousandFalse /> </div>
          <div className="col mt-3"> <Decimal value={data.contact_number_alternate && data.contact_number_alternate.toString().split(' ')[1]} sm name="contact_number_alternate" onChange={e => props.onChange({name: 'contact_number_alternate', value: e})} label="Contact Number Alternate" placeholder="0" icon={`+${data.contact_number_alternate ? data.contact_number_alternate.toString().split(' ')[0] : '62'}`} min="0" max="999999999999" decimal="0" thousandFalse /> </div>
        </div>
        <div className="row">
          <div className="col mt-3"> <Input value={data.email} sm name="email" label="Email" placeholder="Email" onChange={onChange} /> </div>
          <div className="col mt-3"> <Input value={data.website} sm name="website" label="Website" placeholder="Website" onChange={onChange} /> </div>
          <div className="col mt-3"> <Input value={data.company_id} sm name="company_id" label="Company Registration ID" placeholder="Company Registration ID" disabled /> </div>
        </div>
      </div>
      <div className="modal-footer pb-0 px-0 mt-3">
        <button type="button" className="btn btn-sm text-muted text-10 mr-2" data-bs-dismiss="modal">Close</button>
        {
          props.validation.name ?
          <button type="button" className="btn btn-sm btn-primary text-10 width-md" onClick={() => props.onSubmit && props.onSubmit()} >Save changes</button>
          :
          <button type="button" className="btn btn-sm btn-primary text-10 width-md" data-bs-dismiss="modal" onClick={() => props.onSubmit && props.onSubmit()} >Save changes</button>
        }
      </div>
    </Modal>
  )
}
function Del(props){
  const [data, dataSet] = useState({})
  useEffect(() => {
    dataSet(props.data)
  }, [props.data])
  return(
    <Modal id={props.id || 'modal'} title="Delete Supplier">
      <div className="text-center text-dark text-10">
        Are you sure want to remove <span className="bold text-danger">{data.name}</span> ?
      </div>
      <div className="modal-footer pb-0 px-0 mt-3">
        <button type="button" className="btn btn-sm text-muted mr-2" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-sm btn-rounded btn-danger width-md" data-bs-dismiss="modal" onClick={() => props.onSubmit && props.onSubmit()} >Delete</button>
      </div>
    </Modal>
  )
}
function Index(){
  const [data, dataSet] = useState({})
  const [validation, validationSet] = useState({})
  const [page, pageSet] = useState(1)
  const [form, formSet] = useState({})
  const [modalType, modalTypeSet] = useState('add')
  // const [form, formSet] = useState({})
  // const [alert, alertSet] = useState({m: undefined, theme: 'success'})
  useMemo(() => {
    document.title = 'Supplier'
    axios.get(`/setting/supplier/filter?orderCol=created_at&orderDir=desc&limit=5&page=${page}`).then(res => {
      dataSet(res.data)
    })
  }, [page])
  function onChange(e){
    e.value ? validationSet({}) : validationSet({name: 'Nama Wajib Diisi'})
    formSet({...form, [e.name]: e.value})
  }
  function onAdd(e){
    modalTypeSet('add')
    formSet({})
    validationSet({name: 'Nama Wajib Diisi'})
  }
  function onEdit(e){
    modalTypeSet('edit')
    formSet(data.data.find(r => r.guid === e))
    validationSet({})
  }
  function onDelete(e){
    formSet(data.data.find(r => r.guid === e))
  }
  function onSubmit(){
    form.country_code = form.country_code || 'ID'
    if (form.name) {
      validationSet({})
      if (modalType === 'add') {
        axios.post(`/setting/supplier`, form).then(res => {
          axios.get(`/setting/supplier/filter?orderCol=created_at&orderDir=desc&limit=5&page=1`).then(res => {
            pageSet(1)
            dataSet(res.data)
          })
        })
      }else {
        axios.put(`/setting/supplier/${form.guid}`, form).then(res => {
          axios.get(`/setting/supplier/filter?orderCol=created_at&orderDir=desc&limit=5&page=${page}`).then(res => {
            dataSet(res.data)
          })
        })
      }
    }else {
      validationSet({name: 'Nama tidak boleh kosong'})
    }
  }
  function onSubmitDelete(){
    axios.delete(`/setting/supplier/${form.guid}`, form).then(res => {
      axios.get(`/setting/supplier/filter?orderCol=created_at&orderDir=desc&limit=5&page=1`).then(res => {
        dataSet(res.data)
      })
    })
  }
  return(
    <div className="container-fluid pt-4">
      <div className="row">
        {/*TABLE 1*/}
        <div className="col-md-10 offset-md-1">
          <div className="row border-bottom pb-1 mb-2 mx-0 center-left">
            <div className="col p-0"> <h5 className="card-title border-1 text-dark bold m-0">SUPLIERS</h5> </div>
            <div className="col-auto p-0"> <div className="btn btn-secondary btn-sm pointer center" onClick={onAdd} data-bs-toggle="modal" data-bs-target="#form"><i className="uil uil-plus lh-0 mr-1" />Add New Supplier</div> </div>
          </div>
          <Table onEdit={onEdit} onDelete={onDelete} {...data} />
        </div>
        <div className="col-12 text-center border-top border-2 pt-3">
          { data.meta && <Pagination currentPage={page} lastPage={data.meta.last_page} onClick={e => pageSet(e)} /> }
        </div>
      </div>
      <UpdateOrCreateModal id="form" data={form} validation={validation} onChange={onChange} onSubmit={onSubmit} type={modalType} />
      <Del id="del" data={form} onSubmit={onSubmitDelete} />
    </div>
  )
}

export default Index
