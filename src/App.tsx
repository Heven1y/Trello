import React, {useState, useEffect} from 'react'
import { Navbar } from './component/Navbar'
import {Table} from './component/Table'
import { WindowUser } from './component/WindowUser'
import {ICard, IComment, ITable} from './Interfaces'
var userName:string = 'Admin'


const App: React.FC = () => {
  const [boards, setBoards] = useState<ITable[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('boards') || '[]') as ITable[]
    setBoards(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards))
  }, [boards])

  const newUser = (name:string) => {
      userName = name
  }

  const addBoard = (title:string) => {
    const newBoard: ITable = {
      title: title,
      id: Date.now(),
      card: []
    }
    setBoards(prev => [newBoard, ...boards])
  }

  const addCard = (title:string, description:string, idTable:number) => {
    const newCard: ICard = {
      title: title,
      id: Date.now(),
      description: description,
      auctor: userName,
      comment: []
    }
    console.log(title)
    console.log(description)
    console.log(idTable)
    setBoards(prev => prev.map(board => {
      if(board.id === idTable){
        board.card.push(newCard)
      }
      return board
    }))

  }

  const addComment = (idCard:number, comment:string) => {
    const newComment: IComment = {
      id: Date.now(),
      comment: comment,
      auctor: userName
    }
    setBoards(prev => prev.map(board => {
      board.card.map(card => {
        if(card.id === idCard){
          card.comment.push(newComment)
        }
        return card
      })
      return board
    }))

  }

  const changeHandler = (id:number, title:string) => {
      setBoards(prev => prev.map(board => {
        if(board.id === id){
          board.title = title
        }
        return board
      }))
  }

  const removeHandler = (id:number) => {
      setBoards(prev => prev.filter(board => board.id !== id))
  }

  const removeCard = (id:number) => {
    setBoards(prev => prev.map(board => {
      board.card = board.card.filter(card => {
        return card.id !== id
      })
      return board
    }))
  }
  const removeComment = (id:number) => {
    setBoards(prev => prev.map(board => {
      board.card.map(card => {
        card.comment = card.comment.filter(comm => {
          return comm.id !== id
        })
      })
      return board
    }))
  }
  const changeCard = (id:number, title:string, description:string) => {
    setBoards(prev => prev.map(board => {
      board.card.map(card => {
        if(card.id === id){
          card.title = title
          card.description = description
        }
        return card
      })
      return board
    }))
  }
  const [modalShow, setShow] = useState(true)
  return (
    <>
      <Navbar addTable={addBoard} user={userName}/>
      <Table boards={boards} onChange={changeHandler} onRemove={removeHandler} addCard={addCard} 
      removeCard={removeCard} changeCard={changeCard} addComment={addComment} removeComment={removeComment}/>
      <WindowUser show={modalShow} onHide={() => setShow(false)} newUser={newUser}/>
    </>
  );
}

export default App;
