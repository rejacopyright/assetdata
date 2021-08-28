import React, { useState, useEffect, useRef, forwardRef } from 'react'
import Number from 'react-number-format'
import PropTypes from 'prop-types'
// Input
function InputFunc(props, ref){
  return (
    <div className={props.rowClass}>
      {
        props.label ?
        <label htmlFor={props.name}>{props.label}</label>
        :
        props.title &&
        <small className="d-block">{props.title}</small>
      }
      <div className={`input-group ${props.sm && 'input-group-sm'} ${props.inputClass}`}>
        {
          props.icon && !props.right &&
          <div className={`input-group-prepend input-group-text ${props.iconClass}`} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            {props.icon}
          </div>
        }
        <input ref={ref} type={props.password ? 'password' : 'text'} name={props.name} value={props.value || props.defaultValue || ''} className={`form-control ${props.sm && 'form-control-sm'} ${props.className} ${props.right && 'border-right-none'} ${(props.icon && !props.right) && 'border-left-none'}`} placeholder={props.placeholder} onChange={props.onChange} onBlur={props.onBlur} spellCheck={false} autoFocus={props.autoFocus} readOnly={props.readOnly} disabled={props.disabled} />
        {
          props.icon && props.right &&
          <div className={`input-group-append input-group-text ${props.iconClass}`} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            {props.icon}
          </div>
        }
      </div>
    </div>
  )
}
// Search
function InputIcon(props, ref){
  const width = useRef()
  const [space, spaceSet] = useState(0)
  useEffect(() => {
    spaceSet(width.current.offsetWidth)
  }, [])
  return (
    <div className={props.rowClass}>
      {
        props.label ?
        <label htmlFor={props.name}>{props.label}</label>
        :
        props.title &&
        <small className="d-block">{props.title}</small>
      }
      <div className="position-relative">
        <input ref={ref} type={props.password ? 'password' : 'text'} name={props.name} defaultValue={props.defaultValue} className={`form-control ${props.sm && 'form-control-sm'} ${props.className} radius-5`} placeholder={props.placeholder} onChange={props.onChange} onBlur={props.onBlur} spellCheck={false} autoFocus={props.autoFocus} readOnly={props.readOnly} disabled={props.disabled} style={props.icon ? props.right ? {paddingRight: space} : {paddingLeft: space} : {}} />
        { props.icon && <div className={`absolute-center-v p-2 text-dark ${props.iconClass} ${props.right && 'r-0'}`} ref={width}>{props.icon}</div> }
      </div>
    </div>
  )
}
// Textarea
function TextareaFunc(props, ref){
  return (
    <div className={props.rowClass}>
      {
        props.label ?
        <label htmlFor={props.name}>{props.label}</label>
        :
        props.title &&
        <small className="d-block">{props.title}</small>
      }
      <textarea ref={ref} type="text" name={props.name} defaultValue={props.defaultValue} value={props.value} className={`form-control ${props.className} ${props.sm && 'text-9'}`} placeholder={props.placeholder} onChange={props.onChange} onBlur={props.onBlur} rows={props.rows} spellCheck={false} autoFocus={props.autoFocus} style={{resize: `${props.noResize ? 'none' : 'both'}`}} />
    </div>
  )
}
// Radio
function RadioFunc(props, ref){
  return (
    <div className={`custom-control custom-radio d-inline mr-2 ${props.theme && `radio-${props.theme}`}`}>
      <input type="radio" ref={ref} id={props.id} name={props.name} value={props.value} className="custom-control-input" defaultChecked={props.checked || false} />
      <label style={props.small && { lineHeight: 2.2 }} className={`custom-control-label ${props.small && 'small f-600'} ${props.labelClass}`} htmlFor={props.id}>{props.label}</label>
    </div>
  )
}
// Checkbox
function CheckboxFunc(props, ref){
  return (
    <div className={`center-left custom-control ${props.switch ? 'custom-switch' : 'custom-checkbox'} ${props.rowClass} ${props.theme && `checkbox-${props.theme}`} ${props.circle && `checkbox-circle`}`}>
      <input type="checkbox" ref={ref} id={props.id} name={props.name} value={props.value} defaultChecked={props.checked || false} className="custom-control-input" onChange={props.onChange} disabled={props.disabled} />
      <label className={`lh-1 custom-control-label ${props.small && 'small f-600'} ${props.labelClass}`} htmlFor={props.id}> {props.label} </label>
    </div>
  )
}
// Decimal
function DecimalFunc(props, ref) {
  const [value, valueSet] = useState(props.min && props.min >= props.value ? props.min : props.max && props.max <= props.value ? props.max : props.value)
  const [error] = useState(props.value ? '' : props.error)
  useEffect(() => {
    let val = parseFloat(props.value || 0)
    if (parseFloat(props.min) && parseFloat(props.min) >= val) {
      val = parseFloat(props.min)
    }else if (parseFloat(props.max) && parseFloat(props.max) <= val) {
      val = parseFloat(props.max)
    }else {
      val = parseFloat(props.value)
    }
    valueSet(val)
    return val
  }, [props.value, props.min, props.max, props.error])
  function onChange(e){
    valueSet(e.floatValue)
    props.onChange && props.onChange(e.floatValue || 0)
  }
  return (
    <div className={props.rowClass}>
      {
        props.label ?
        <label htmlFor={props.name}>{props.label}</label>
        :
        props.title &&
        <small className="d-block text-nowrap">{props.title}</small>
      }
      <div className="position-absolute r-1 bg-white radius-20 px-1 text-danger bold f-8 m-0" style={{top:'8px'}}>{ error }</div>
      <div className={`input-group ${props.sm && 'input-group-sm'}`}>
        {
          props.icon && !props.right &&
          <div className={`input-group-prepend input-group-text ${props.iconClass}`} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            {props.icon}
          </div>
        }
        <Number
          name={props.name}
          ref={ref}
          thousandSeparator={props.thousandFalse ? false : '.'}
          decimalSeparator=","
          decimalScale={props.decimal || false}
          allowEmptyFormatting={true}
          isAllowed={ val => {
            const {floatValue, value} = val
            if (props.min && props.max) {
              return (floatValue >= props.min && floatValue <= props.max) || floatValue === undefined
            }
            if (props.min && parseInt(props.min) !== 0) {
              return floatValue >= props.min
            }
            if (props.max) {
              return floatValue <= props.max || floatValue === undefined
            }
            if (parseInt(value[0]) === 0 && !isNaN(parseInt(value[1]))) {
              return false
            }
            return true
          }}
          onValueChange={onChange}
          value={parseFloat(value)}
          defaultValue={parseFloat(value)}
          className={`form-control ${props.sm && 'form-control-sm'} border border-gray ${props.right ? 'border-right-none' : 'border-left-none'} ${props.inputClass && props.inputClass}`}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          autoFocus={props.autoFocus} />
        {/* <input type="text" name={props.name} onChange={onChange} value={value} autoComplete="off" readOnly={props.readOnly} className={`form-control ${props.sm && 'form-control-sm'} border`} placeholder={props.placeholder} autoFocus={props.autoFocus} /> */}
        {
          props.icon && props.right &&
          <div className={`input-group-append input-group-text ${props.iconClass}`} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            {props.icon}
          </div>
        }
      </div>
      <sup className="text-success f-8">{props.note}</sup>
    </div>
  )
}

export const Input = forwardRef(InputFunc)
export const Inputicon = forwardRef(InputIcon)
export const Textarea = forwardRef(TextareaFunc)
export const Radio = forwardRef(RadioFunc)
export const Checkbox = forwardRef(CheckboxFunc)
export const Decimal = forwardRef(DecimalFunc)
// PropTypes
Input.propTypes = {
  name: PropTypes.any.isRequired,
}
Radio.propTypes = {
  name: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
}
Checkbox.propTypes = {
  id: PropTypes.any.isRequired,
}
Textarea.propTypes = {
  name: PropTypes.any.isRequired,
}
Decimal.propTypes = {
  name: PropTypes.any.isRequired,
}
