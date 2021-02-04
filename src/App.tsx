import React, {useState, useEffect} from 'react'
import { Board } from './component/Board'
import { Navbar } from './component/Navbar'
import { WindowUser } from './component/WindowUser'
import {ICard, IComment, ITable} from './Interfaces'
var userName:string = 'Admin'


const App: React.FC = () => {
  const [lists, setList] = useState<ITable[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lists') || '[]') as ITable[]
    setList(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])

  const newUser = (name:string) => {
      userName = name
  }

  const addBoard = (title:string) => {
    const newList: ITable = {
      title: title,
      id: Date.now(),
      cards: []
    }
    setList(prev => [newList, ...prev])
  }

  const addCard = (title:string, description:string, idTable:number) => {
    const newCard: ICard = {
      title: title,
      id: Date.now(),
      description: description,
      auctor: userName,
      comments: []
    }
    console.log(title)
    console.log(description)
    console.log(idTable)
    setList(prev => prev.map(list => {
      if(list.id === idTable){
        list.cards = [newCard, ...list.cards]
      }
      return list
    }))

  }

  const addComment = (idCard:number, comment:string) => {
    console.log('id: ' + idCard + " comment: " + comment)
    const newComment: IComment = {
      id: Date.now(),
      comment: comment,
      auctor: userName
    }
    setList(prev => prev.map(list => {
      return {
        ...list, 
        cards: list.cards.map(card => {
          if(card.id === idCard){
            return {
              ...card, 
              comments: [newComment, ...card.comments],
            }
          }
          return card
        })
      }
    }))
  }

  const changeHandler = (id:number, title:string) => {
      setList(prev => prev.map(list => {
        if(list.id === id){
          list.title = title
        }
        return list
      }))
  }

  const removeHandler = (id:number) => {
      setList(prev => prev.filter(list => list.id !== id))
  }

  const removeCard = (id:number) => {
    setList(prev => prev.map(list => {
      list.cards = list.cards.filter(card => {
        return card.id !== id
      })
      return list
    }))
  }
  const removeComment = (id:number) => {
    setList(prev => prev.map(list => {
      list.cards.map(card => {
        card.comments = card.comments.filter(comm => {
          return comm.id !== id
        })
      })
      return list
    }))
  }
  const changeCard = (id:number, title:string, description:string) => {
    setList(prev => prev.map(list => {
      list.cards.map(card => {
        if(card.id === id){
          card.title = title
          card.description = description
        }
      })
      return list
    }))
  }
  const changeComment = (id:number, newComment:string) => {
    setList(prev => prev.map(list => {
      list.cards.map(card => {
       card.comments.map(comment => {
         if(comment.id === id){
           comment.comment = newComment
         }
       })
      })
      return list
    }))
  }
  const [modalShow, setShow] = useState(true)
  return (
    <>
      <Navbar addTable={addBoard} user={userName}/>
      <Board lists={lists} onChange={changeHandler} onRemove={removeHandler} addCard={addCard} 
      removeCard={removeCard} changeCard={changeCard} addComment={addComment} 
      removeComment={removeComment} changeComment={changeComment}>
      </Board>
      <WindowUser show={modalShow} onHide={() => setShow(false)} newUser={newUser}/>
    </>
  );
}

export default App;
