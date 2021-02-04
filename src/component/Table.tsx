import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { ITable } from '../Interfaces';
import { WindowNewCard } from './WindowNewCard';
import { WindowList } from './WindowList';

type ListProps = {
    list: ITable
    onChange(id:number, title:string):void
    onRemove(id:number):void
    addCard(title:string, description:string, idTable:number):void
}

export const Table: React.FC<ListProps> = (props) =>{
    const [modalShow, setShow] = useState(false)
    const [mShow, setName] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    const changeClose = () => {
        setName(false)
    }
    const changeTable = (title:string) => {
        props.onChange(props.list.id, title)
    }  
    const paramCard = (title:string, description:string) => {
        props.addCard(title, description, props.list.id)
    }
    return (
        <>
                <div className="row">
                <div className="card table">
                <div className="card-header">
                    {props.list.title}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={
                        () => props.onRemove(props.list.id)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div className="card-body">
                     {props.children}
                    </div>
                    <div className="card-footer">
                        <Button className="add-button" onClick={() => setShow(true)}>Добавить карточку</Button>
                        <Button className="change-button" onClick={() => setName(true)}>Изменить колонку</Button>
                    </div>
                </div>
                </div>
        
        <WindowNewCard show={modalShow} onHide={handleClose} addCard={paramCard}/>
        <WindowList show={mShow} onHide={changeClose} addTable={changeTable} oldTitle={props.list.title}/>
        </>
    );
}