import React, {useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {ICard, IComment} from '../Interfaces'
import {Comments} from './Comments'
import {useSelector} from 'react-redux'

type ListProps  = {
  show:boolean, 
  onHide:any,
  changeCard(title:string, description:string): void
  card:ICard
  addComment(id:number, comment:string):void
  removeComment(id:number):void
  changeComment(id:number, comment:string):void
}

export const WindowCard: React.FC<ListProps> = (props) => {
  const commentsInCards = useSelector((state:any) => {
    return state.comment.comments
  })
  const refTitle = useRef<HTMLInputElement>(null)
  const refDescript = useRef<HTMLTextAreaElement>(null)
  const refComment = useRef<HTMLTextAreaElement>(null)
  const changeCard = () => {
      props.changeCard(refTitle.current!.value, refDescript.current!.value)
      refTitle.current!.value = ''
      refDescript.current!.value = ''
      props.onHide()
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
          <Button onClick={() => {
              if(refComment.current!.value.length > 0){
                console.log('Пытаюсь добавить комментарий: ' + refComment.current!.value)
                props.addComment(props.card.id, refComment.current!.value)
              }
          }}>Добавить комментарий</Button>
        </form>
        {
          props.card.comments.map(commentId => {
            return (
              <div key={commentId}>
              <Comments comment={commentsInCards.find((comment:IComment) => comment.id === commentId)} 
              removeComment={props.removeComment} changeComment={props.changeComment}/>
              </div>
            )
          })
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={changeCard}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default WindowCard