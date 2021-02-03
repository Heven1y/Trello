import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { ITable } from '../Interfaces';
import {Cards} from './Cards'
import { WindowNewCard } from './WindowNewCard';
import { WindowList } from './WindowList';
var idTable = {
    id: 0,
    title: ''
}

type BoardProps = {
    boards: ITable[]
    onChange(id:number, title:string):void
    onRemove(id:number):void
    addCard(title:string, description:string, idTable:number):void
    removeCard(id:number):void
    changeCard(id:number, title:string, description:string):void
    addComment(id:number, comment:string):void
    removeComment(id:number):void
}

export const Table: React.FC<BoardProps> = ({boards, onChange, onRemove, addCard, removeCard, 
    changeCard, addComment, removeComment}) =>{

    if(boards.length === 0){
        return (<h5 className='pusto'>Данная доска пуста, нажмите "Добавить список" для создания колонки</h5>)
    }
    const [modalShow, setShow] = useState(false)
    const [mShow, setName] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = (id:number) => {
        idTable.id = id
        setShow(true)
    }
    const changeClose = () => {
        setName(false)
    }
    const changeShow = (id:number, title:string) => {
        idTable.id = id
        idTable.title = title
        setName(true)
    }
    const changeTable = (title:string) => {
        onChange(idTable.id, title)
    }  
    const paramCard = (title:string, description:string) => {
        addCard(title, description, idTable.id)
    }
    return (
        <>
        <ul className="list-group list-group-horizontal">
        {boards.map(board => {
            if(board.title.length >= 1)
            return (
                <li key={board.id}>
                <div className="row">
                <div className="card table">
                <div className="card-header">
                    {board.title}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={
                        () => onRemove(board.id)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div className="card-body">
                    <Cards cards={board.card} onRemove={removeCard} onChange={changeCard} 
                    addComment={addComment} removeComment={removeComment}/>
                    </div>
                    <div className="card-footer">
                        <Button className="add-button" onClick={() => handleShow(board.id)}>Добавить карточку</Button>
                        <Button className="change-button" onClick={
                            () => changeShow(board.id, board.title)}>Изменить колонку</Button>
                    </div>
                </div>
                </div>
                </li>
            )
            else return (
                null
            )
        })}
        </ul>
        <WindowNewCard show={modalShow} onHide={handleClose} addCard={paramCard}/>
        <WindowList show={mShow} onHide={changeClose} addTable={changeTable} oldTitle={idTable.title}/>
        </>
    );
}