import {forwardRef} from 'react';

function ModalFunc(props, ref){
  return (
    <div className={`modal ${props.fade && 'fade'} z-99999 ${props.right && 'modal-right'} ${props.left && 'modal-left'} ${props.top && 'modal-top'} ${props.bottom && 'modal-bottom'}`} id={props.id} ref={ref} role="dialog" aria-hidden="true">
      <div className={`modal-dialog ${!props.top && 'modal-dialog-centered'} ${props.modalClass}`}>
        <div className={`modal-content ${props.contentClass}`}>
          {
            !(props.headerDisabled) &&
            <div className="modal-header p-2 bg-light center-left">
              <div className="text-9 f-700 text-center col">{props.title}</div>
              <div className="pointer ml-auto p-0" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true"><i className="uil uil-times text-10 lh-1 text-muted" /></span> </div>
            </div>
          }
          <div className={`modal-body ${props.bodyClass}`}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(ModalFunc)
