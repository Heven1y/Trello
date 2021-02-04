import React, {useState} from 'react'
import {IComment} from '../Interfaces'
import {Edit} from './EditCommentForm'

type CommentProps = {
    comments: IComment[],
    removeComment(id:number):void
    changeComment(id:number, comment:string):void
}

export const Comments: React.FC<CommentProps> = ({comments, removeComment, changeComment}) => {
    const [show, setShow] = useState(false)
    const [idComment, setIdComment] = useState(0)
    const getIdComment = (id:number) => {
        setIdComment(id)
        setShow(true)
    }
    const changeSelectedComment = (newComment:string) => {
        changeComment(idComment, newComment)
    }
    const showInput = (show:boolean, comment:string) => {
        if(show) {
            return (
                <Edit show={show} close={setShow} comment={comment} editComment={changeSelectedComment}/>
            )
        }
        else return comment
    }
    return (
        <>
        {comments.map((comment) => {
            return (
                <div className="card comment" key={comment.id}>
                    <div className="card-header">
                    {'Автор: ' + comment.auctor}
                    <button type="button" className="close" data-dismiss="alert" 
                    aria-label="Close" onClick={() => removeComment(comment.id)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <a href="#" className='edit-comment' onClick={() => getIdComment(comment.id)}>Изменить</a>
                    <div className="card-body"><h6>{comment.id === idComment ? showInput(show, comment.comment) : comment.comment}</h6></div>
                </div>
                </div>
            )
        })}
        </>
    );
}