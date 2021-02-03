import React, {useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {ICard} from '../Interfaces'
import {Commentary} from './Comments'

type ListProps  = {
  show:boolean, 
  onHide:any,
  addCard(title:string, description:string): void
  card:ICard
  addComment(id:number, comment:string):void
  removeComment(id:number):void
}

export const WindowCard: React.FC<ListProps> = (props) => {

  const refTitle = useRef<HTMLInputElement>(null)
  const refDescript = useRef<HTMLTextAreaElement>(null)
  const refComment = useRef<HTMLTextAreaElement>(null)
  const newCard = () => {
      props.addCard(refTitle.current!.value, refDescript.current!.value)
      refTitle.current!.value = ''
      refDescript.current!.value = ''
      props.onHide()
  }
  const newComment = () => {
    if(refComment.current!.value.length > 0)
    props.addComment(props.card.id ,refComment.current!.value)
  }

    return (
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Карточка
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Заголовок:</label>
            <input ref={refTitle} type="text" className="form-control" id="recipient-name" defaultValue={props.card.title}/>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Описание:</label>
            <textarea ref={refDescript} className="form-control" id="message-text" defaultValue={props.card.description}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Комментарий:</label>
            <textarea ref={refComment} className="form-control" id="message-text"></textarea>
          </div>
          <Button onClick={newComment}>Добавить комментарий</Button>
        </form>
        <Commentary comments={props.card.comment} removeComment={props.removeComment}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={newCard}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
    );
}