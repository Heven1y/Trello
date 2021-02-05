import React, {useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'

interface ListProps {
  show:boolean, 
  onHide:any,
  addCard(title:string, description:string): void
}

export const WindowNewCard: React.FC<ListProps> = (props) => {

  const refTitle = useRef<HTMLInputElement>(null)
  const refDescript = useRef<HTMLTextAreaElement>(null)
  const newCard = () => {
      if(refTitle.current!.value !== '') props.addCard(refTitle.current!.value, refDescript.current!.value)
      refTitle.current!.value = ''
      refDescript.current!.value = ''
      props.onHide()
  }

    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Создание новой карточки
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Заголовок:</label>
            <input ref={refTitle} type="text" className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Описание:</label>
            <textarea ref={refDescript} className="form-control" id="message-text"></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={newCard}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
    );
}