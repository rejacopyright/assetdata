import {useEffect, useRef} from 'react'
import $ from 'jquery'

function Tooltip(props){
  const tooltip = useRef()
  useEffect(() => {
    $(tooltip.current).tooltip()
  }, [])
  return(
    <span ref={tooltip} className={props.className}
      data-placement={
        (props.top && 'top') || (props.bottom && 'bottom') || (props.left && 'left') || (props.right && 'right') || 'top'
      }
      data-original-title={props.title || 'title'} >
      {props.children}
    </span>
  )
}

function Popover(props){
  const popover = useRef()
  useEffect(() => {
    $(popover.current).popover()
  }, [])
  return(
    <span ref={popover} className={props.className}
      data-trigger={(props.hover && 'hover') || (props.click && 'click') || 'focus'}
      tabIndex="0"
      data-placement={
        (props.top && 'top') || (props.bottom && 'bottom') || (props.left && 'left') || (props.right && 'right') || 'top'
      }
      data-content={props.content || 'content'}
      data-original-title={props.title} >
      {props.children}
    </span>
  )
}

export {
  Tooltip,
  Popover,
}
