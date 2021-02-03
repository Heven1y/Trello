import React, {useState} from 'react'
import { ICard, IComment} from '../Interfaces'
import {WindowCard} from './WindowCard'
var card:ICard = {
    id: 0,
    title: '',
    description: '',
    auctor: '',
    comment: []
}

type CardProps = {
    cards: ICard[],
    onRemove(id:number):void,
    onChange(id:number, title:string, description:string):void,
    addComment(id: number, comment:string):void
    removeComment(id:number):void
}

export const Cards: React.FC<CardProps> = ({cards, onRemove, onChange, addComment, removeComment}) => {
    if(cards.length === 0){
        return (
            <h5>Колонка пуста</h5>
        )
    }
    const [modalShow, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = (id:number) => {
        setShow(true)
        cards.forEach((c, i, cards) => {
            if(id === c.id){
                card = c
            }
        })
    }
    const paramCard = (title:string, description:string) => {
        onChange(card.id, title, description)
    }
    return (
        <>
        {cards.map(card => {
            return (
                <div className="card" key={card.id}>
                    <div className="card-body trig" onClick={() => handleShow(card.id)}>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => onRemove(card.id)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="card-title">{card.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Автор: {card.auctor}</h6>
                        <p className="card-text">{card.description}</p>
                    </div>
                </div>
            )
        })}
        <WindowCard show={modalShow} onHide={handleClose} 
        addCard={paramCard} card={card!} addComment={addComment} removeComment={removeComment}/>
        </>
    );
}