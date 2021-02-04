import React, {useState} from 'react'
import {Table} from './Table'
import { ITable } from '../Interfaces';
import {Cards} from './Cards'

type BoardProps = {
    lists: ITable[]
    onChange(id:number, title:string):void
    onRemove(id:number):void
    addCard(title:string, description:string, idTable:number):void
    removeCard(id:number):void
    changeCard(id:number, title:string, description:string):void
    addComment(id:number, comment:string):void
    removeComment(id:number):void
    changeComment(id:number, comment:string):void
}

export const Board: React.FC<BoardProps> = (props) =>{
    if(props.lists.length === 0){
        return (<h5 className='pusto'>Данная доска пуста, нажмите "Добавить список" для создания колонки</h5>)
    }
    
    return (
        <ul className="list-group list-group-horizontal">
        {props.lists.map(list => {
            if(list.title.length >= 1)
            return (
                <li key={list.id}>
                <Table list={list} onChange={props.onChange} onRemove={props.onRemove} addCard={props.addCard}>
                    {list.cards.map(card => {
                        return (
                            <div key={card.id}>
                            <Cards card={card} onRemove={props.removeCard} onChange={props.changeCard} 
                            addComment={props.addComment} removeComment={props.removeComment} 
                            changeComment={props.changeComment}/>
                            </div>
                        )
                    })}
                </Table>
                </li>
            )
            else return (
                null
            )
        })}
        </ul>
    );
}