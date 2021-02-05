import React, {useState, useEffect} from 'react'
import { Board } from './component/Board'
import { Navbar } from './component/Navbar'
import { WindowUser } from './component/WindowUser'
import {ICard, IComment, IList} from './Interfaces'
import {List} from './component/List'
import {Card} from './component/Card'
var userName:string = 'Admin'


const App: React.FC = () => {
  const [lists, setList] = useState<IList[]>([])
  const [modalShow, setShow] = useState(true)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lists') || '[]') as IList[]
    setList(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])

  const newUser = (name:string) => {
      userName = name
  }

  const addList = (title:string) => {
    const newList: IList = {
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
    setList(prev => prev.map(list => {
      if(idTable === list.id){
        return {
          ...list, 
          cards: [newCard, ...list.cards]
        }
      }
      return list
    }))

  }

  const addComment = (idCard:number, comment:string) => {
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

  const changeList = (id:number, title:string) => {
      setList(prev => prev.map(list => {
        if(list.id === id){
          return {
            ...list,
            title: title
          }
        }
        return list
      }))
  }

  const removeList = (id:number) => {
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
      return {
        ...list,
        cards: list.cards.map(card => {
          if(card.id === id){
            return {
              ...card, 
              title: title,
              description: description
            }
          }
          return card
        }) 
      }
    }))
  }
  const changeComment = (id:number, newComment:string) => {
    setList(prev => prev.map(list => {
      return {
        ...list,
        cards: list.cards.map(card => {
          return {
              ...card, 
              comments: card.comments.map(oldComment => {
                if(oldComment.id === id){
                  return {
                    ...oldComment,
                    comment: newComment
                  }
                }
                return oldComment
              })
          }
        }) 
      }
    }))
  }
  if(lists.length === 0){
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
        {lists.map(list => {
            return (
                <li key={list.id}>
                <List list={list} onChange={changeList} onRemove={removeList} addCard={addCard}>
                    {list.cards.map(card => {
                        return (
                            <div key={card.id}>
                            <Card card={card} onRemove={removeCard} onChange={changeCard} 
                            addComment={addComment} removeComment={removeComment} 
                            changeComment={changeComment}/>
                            </div>
                        )
                    })}
                </List>
                </li>
            )
        })}
      </Board>
      <WindowUser show={modalShow} onHide={() => setShow(false)} newUser={newUser}/>
    </>
  );
}

export default App;
