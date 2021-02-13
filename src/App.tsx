import React, {useState, useEffect} from 'react'
import { Board } from './component/Board'
import { Navbar } from './component/Navbar'
import { WindowUser } from './component/WindowUser'
import {ICard, IComment, IList} from './Interfaces'
import List from './component/List'
import {Card} from './component/Card'
import {connect, ConnectedProps} from 'react-redux'
import {addListAction, removeListAction, changeListAction, 
  addCardAction, changeCardAction, removeCardAction,
  addCommentAction, changeCommentAction, removeCommentAction} from './redux/actions'
var userName:string = 'Admin'
type PropsFromRedux = ConnectedProps<typeof connector>

const mapDispatchToProps = {
  addListAction,
  removeListAction,
  changeListAction,
  addCardAction,
  changeCardAction,
  removeCardAction,
  addCommentAction,
  changeCommentAction,
  removeCommentAction
}

const mapStateToProps = (state:any) => {
  return {
    listsRedux: state.list.lists,
    cardsRedux: state.card.cards
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

const App: React.FC<PropsFromRedux> = (props) => {
  const [modalShow, setShow] = useState(true)

  const newUser = (name:string) => {
      userName = name
  }

  const addList = (title:string) => {
    const newList: IList = {
      title: title,
      id: Date.now(),
      cards: []
    }
    props.addListAction(newList)
  }

  const addCard = (title:string, description:string, idTable:number) => {
    const newCard: ICard = {
      title: title,
      id: Date.now(),
      description: description,
      auctor: userName,
      comments: []
    }
    props.addCardAction(newCard, idTable)
  }

  const addComment = (idCard:number, comment:string) => {
    const newComment: IComment = {
      id: Date.now(),
      comment: comment,
      auctor: userName
    }
    props.addCommentAction(idCard, newComment)
  }

  const changeList = (id:number, title:string) => {
    props.changeListAction(id, title)
  }

  const removeList = (id:number) => {
      props.removeListAction(id)
  }

  const removeCard = (id:number) => {
    props.removeCardAction(id)
  }
  const removeComment = (id:number) => {
    props.removeCommentAction(id)
  }
  const changeCard = (id:number, title:string, description:string) => {
    props.changeCardAction(id, title, description)
  }
  const changeComment = (id:number, newComment:string) => {
    props.changeCommentAction(id, newComment)
  }
  if(props.listsRedux.length === 0){
    return (
      <>
      <Navbar addTable={addList} user={userName}/>
      <Board>
      <h5 className='pusto'>Данная доска пуста, нажмите "Добавить список" для создания колонки</h5>
      </Board>
      <WindowUser show={modalShow} onHide={() => setShow(false)} newUser={newUser}/>
    </>
    )
  }
  return (
    <>
      <Navbar addTable={addList} user={userName}/>
      <Board>
        {props.listsRedux.map((list:IList) => {
            const propsList = {
              list:list,
              onChange:changeList,
              onRemove:removeList,
              addCard:addCard,
            }
            return (
                <li key={list.id}>
                <List {...propsList}>
                    {
                    list.cards.map((cardId:number) => {
                        return (
                            <div key={cardId}>
                            <Card card={props.cardsRedux.find((card:ICard) => card.id === cardId)} 
                            onRemove={removeCard} onChange={changeCard} 
                            addComment={addComment} removeComment={removeComment} 
                            changeComment={changeComment}/>
                            </div>
                        )
                    })
                    }
                </List>
                </li>
            )
        })}
      </Board>
      <WindowUser show={modalShow} onHide={() => setShow(false)} newUser={newUser}/>
    </>
  );
}

export default connector(App)
