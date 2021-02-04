import React, {useState} from 'react'
import { ICard} from '../Interfaces'
import {WindowCard} from './WindowCard'

type CardProps = {
    card: ICard,
    onRemove(id:number):void,
    onChange(id:number, title:string, description:string):void,
    addComment(id: number, comment:string):void
    removeComment(id:number):void
    changeComment(id:number, comment:string):void
}

export const Cards: React.FC<CardProps> = ({card, onRemove, onChange, addComment, removeComment, changeComment}) => {
    const [modalShow, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }
    const paramCard = (title:string, description:string) => {
        onChange(card.id, title, description)
    }
    return (
        <>
                <div className="card">
                    <button type="button" className="close close-cards" data-dismiss="alert" 
                    aria-label="Close" onClick={() => onRemove(card.id)}>
                            <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="card-body trig" onClick={() => setShow(true)}>
                        <h5 className="card-title">{card.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Автор: {card.auctor}</h6>
                        <p className="card-text">{card.description}</p>
                    </div>
                </div>
        <WindowCard show={modalShow} onHide={handleClose} 
        changeCard={paramCard} card={card} 
        addComment={addComment} removeComment={removeComment} changeComment={changeComment}/>
        </>
    );
}