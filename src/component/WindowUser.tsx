import React, {useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'

type WindowUserProps = {
  show:boolean, 
  onHide:any,
  newUser(name:string):void
}

export const WindowUser:React.FC<WindowUserProps> = (props) => {
  const refName = useRef<HTMLInputElement>(null)

    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Здравствуйте!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Введите Ваше имя:</label>
            <input ref={refName} type="text" className="form-control" id="recipient-name"/>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          props.newUser(refName.current!.value)
          props.onHide()
          }}>Подтвердить</Button>
      </Modal.Footer>
    </Modal>
    );
}