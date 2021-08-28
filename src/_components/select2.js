import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import {axios} from '_utils/axios'
// import con from '../_con/api'
import ReactSelect, {components} from 'react-select'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import Skeleton from 'react-skeleton-loader'

const MultiValue = SortableElement(props => {
  const onMouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const innerProps = { onMouseDown }
  return <components.MultiValue {...props} innerProps={innerProps} />
})
const SortableSelect = SortableContainer(ReactSelect)

// -------------------------- Option --------------------------
// ----- Jika Menggunakan Data Statis -----

// <Select
//   data={ [{value: 'white', label: 'White'}, {value: 'black', label: 'Black'}] } // Wajib di isi, bentuk data Array Object
//   onChange={onChange}
//   defaultValue="black" // Opsional
// />


// ----- Jika Menggunakan Data Rest -----

// <Select
//   url="url" // Wajib di isi (API Endpoint)
//   param="users" // Nama parameter dari object (jangan dipakai jika respon langsung data yang dibutuhkan)
//   value="unique_id" // Wajib di isi (parameter unik dari objek / kolom tabel pada database)
//   label="name" // Wajib di isi (parameter dari objek / kolom tabel pada database yang akan ditampilkan di field seleksi)
//   onChange={onChange}
//   defaultValue="http://domain.com/api/user/123" // Opsional (** Untuk tipe rest, defaultValue adalah API endpoint)
// />

// ----- Global Optional Params -----
// rowClass="col"
// placeholder="Your placeholder"
// noOptionsMessage="Tidak ada data yang ditemukan"
// multiple={boolean} // Default false

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'black' : '#bbb',
    backgroundColor: state.isSelected ? '#fafafa' : 'unset',
    '&:hover':{
      backgroundColor: '#fafafa',
      color: 'black',
      cursor: 'pointer',
    },
    padding: '5px 10px',
    fontSize: '9pt',
    fontWeight: 700,
    border: 'unset',
  }),
  control: (provided, state) => ({
    ...provided,
    '&:hover, &:focus':{
      borderColor: '#eee',
      backgroundColor: '#fff',
    },
    borderRadius: 5,
    borderColor: '#eee',
    padding: 3,
    cursor: 'pointer',
    minHeight: 10,
    boxShadow: 'unset',
    backgroundColor: '#fafafa',
  }),
  noOptionsMessage: (provided, state) => ({
    ...provided,
    fontSize: '9pt',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0 0 0 5px',
    fontSize: '9pt',
    fontWeight: 700,
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: '150px',
  }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    borderRadius: 5,
    boxShadow: '0 1px hsla(0,0%,0%,0.1), 0 1px 5px hsla(0,0%,0%,0.1)',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '1px 5px',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#e6e9fe',
    color: '#5369f8',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: '#5369f8',
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    '&:hover, &:focus':{
      opacity: 1,
      color: 'inherit',
      backgroundColor: 'inherit',
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingLeft: 0,
    paddingRight: 2,
    opacity: .5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...provided, opacity, transition }
  },
}
const DropdownIndicator = ( props: ElementConfig<typeof components.DropdownIndicator> ) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className='uil uil-angle-down' />
    </components.DropdownIndicator>
  )
}
const ClearIndicator = ( props: ElementConfig<typeof components.ClearIndicator> ) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className='uil uil-times' />
    </components.DropdownIndicator>
  )
}
const MultiValueRemove = ( props: ElementConfig<typeof components.MultiValueRemove> ) => {
  return (
    <components.MultiValueRemove {...props}>
      <i className='uil uil-times' />
    </components.MultiValueRemove>
  )
}

function Index(props){
  /*eslint-disable*/
  const [data, dataSet] = useState([])
  const [isLoading, isLoadingSet] = useState(false)
  const [page, pageSet] = useState(1)
  const [query, querySet] = useState('')
  const [defaultValue, defaultValueSet] = useState(null)
  const [loading, loadingSet] = useState(true)
  const [value, valueSet] = useState(null)
  function setdata(pg, query = ''){
    return axios.get(props.url, {params:{page: pg, q:query}}).then(res => {
      const data = props.param ? res.data[props.param].data : res.data
      const r = data.map(i => {
        const rj = {}
        rj['value'] = i[props.value]
        rj['label'] = i[props.label]
        return rj
      })
      isLoadingSet(false)
      loadingSet(false)
      return {data: r, params: res.config.params}
    })
  }
  function arrayMove(array, from, to) {
    array = array.slice()
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0])
    return array
  }
  function onInputChange(e, ev){
    if (ev.action === 'input-change') {
      pageSet(1)
      isLoadingSet(true)
      querySet(q => {
        setdata(1, e).then(r => dataSet(r.data))
        return e
      })
    }
  }
  function scrollToBottom(){
    if (data.length) {
      isLoadingSet(true)
      pageSet(p => {
        ++p
        setdata(p, query).then(r => r.data.length && dataSet(dt => [...dt, ...r.data]))
        return p
      })
    }
  }
  function onSortEnd({ oldIndex, newIndex }){
    const e = arrayMove(value, oldIndex, newIndex)
    valueSet(e)
    props.onChange(e)
  }
  function onChange(e){
    valueSet(v => {
      querySet('')
      return e
    })
    props.onChange(e || {value: null})
  }
  useEffect(() => {
    if (props.data) {
      if (props.defaultValue) {
        /*eslint-disable*/
        const val = props.data.find(i => i.value == props.defaultValue)
        defaultValueSet(val)
        valueSet(val)
        loadingSet(false)
      }else {
        dataSet(props.data)
        isLoadingSet(false)
        loadingSet(false)
      }
    }else {
      if (props.defaultValue && props.multiple) {
        const uri = new URL(props.defaultValue)
        const href = uri.origin+uri.pathname
        const params = {}
        params[uri.search.replace('?', '').split('=')[0]] = JSON.parse(uri.search.replace('?', '').split('=')[1])
        props.defaultValue && axios.get(href, {params}).then(res => {
          if (res.data[props.param].data.length) {
            const rj = []
            for (let item of res.data[props.param].data) {
              const i = {}
              i['value'] = item[props.value]
              i['label'] = item[props.label]
              rj.push(i)
            }
            defaultValueSet(rj)
            valueSet(rj)
          }
        }).then(() => loadingSet(false))
      }else {
        props.defaultValue && axios.get(props.defaultValue).then(res => {
          if (res.data[props.param].data) {
            const rj = {}
            rj['value'] = res.data[props.param][props.value]
            rj['label'] = res.data[props.param][props.label]
            defaultValueSet(rj)
            valueSet(rj)
          }
        }).then(() => loadingSet(false))
        setdata(1).then(r => dataSet(r.data))
      }
    }
    return () => {
      pageSet(1)
      dataSet([])
      querySet('')
      isLoadingSet(false)
      loadingSet(false)
    }
  }, [])
  return(
    <div className={props.rowClass}>
      {props.bold && props.title ? <label>{props.title}</label> : props.title && <p className="mb-1 bold">{props.title}</p>}
      {
        loading ?
        <div className="d-block oh" style={{height:'30px'}}>
          <Skeleton width="100%" height="30px" count={1} widthRandomness={0} color="#f5f5f5" borderRadius="5px" />
        </div>
        :
        props.multiple ?
        <SortableSelect
          defaultValue={ props.defaultValue ? defaultValue : null }
          value={ value }
          axis="xy"
          onSortEnd={onSortEnd}
          distance={4}
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          isMulti
          styles={customStyles}
          components={{ DropdownIndicator, ClearIndicator, MultiValueRemove, MultiValue: MultiValue }}
          name={props.name}
          placeholder={props.placeholder}
          noOptionsMessage={(e) => e.inputValue = props.noOptionsMessage || 'No Data...'}
          cacheOptions
          isLoading={isLoading}
          closeMenuOnSelect={(props.multiple && props.dontClose) ? false : true}
          isClearable={props.isClearable}
          inputValue={query}
          options={props.data || data}
          onInputChange={onInputChange}
          onChange={onChange}
          onMenuScrollToBottom={!props.data && scrollToBottom}
        />
        :
        <ReactSelect
          defaultValue={
            props.defaultValue && defaultValue
          }
          styles={customStyles}
          components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
          name={props.name}
          placeholder={props.placeholder}
          noOptionsMessage={(e) => e.inputValue = props.noOptionsMessage || 'No Data...'}
          cacheOptions
          isLoading={isLoading}
          isMulti={false}
          closeMenuOnSelect
          controlShouldRenderValue
          isClearable={props.isClearable}
          inputValue={query}
          options={props.data || data}
          onInputChange={onInputChange}
          onChange={onChange}
          onMenuScrollToBottom={!props.data && scrollToBottom}
        />
      }
    </div>
  )
}

// Props Validation
// Select.propTypes = {
//   url: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
//   label: PropTypes.any.isRequired,
// }

export default Index
