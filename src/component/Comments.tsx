import React, {useState, useEffect} from 'react'
import {IComment} from '../Interfaces'
import {Edit} from './EditCommentForm'
var idComment:number

type CommentProps = {
    comments: IComment[],
    removeComment(id:number):void
}

export const Commentary: React.FC<CommentProps> = ({comments, removeComment}) => {
    const [show, setShow] = useState(false)
    const getIdComment = (id:number) => {
        idComment = id
        setShow(true)
    }
    const changeComment = (newComment:string) => {
        comments.map(comment => {
            if(comment.id === idComment){
                comment.comment = newComment
            }
        })
    }
    const showInput = (show:boolean, comment:string) => {
        if(show) {
            return (
                <Edit show={show} close={setShow} comment={comment} editComment={changeComment}/>
            )
        }
        else return comment
    }
    return (
        <>
        {comments.map(comment => {
            return (
                <div className="card comment" key={comment.id}>
                    <div className="card-header">
                    {'Автор: ' + comment.auctor}
                    <button type="button" className="close" data-dismiss="alert" 
                    aria-label="Close" onClick={() => removeComment(comment.id)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <a href="#" className='edit-comment' onClick={() => getIdComment(comment.id)}>Изменить</a>
                    <div className="card-body">{comment.id === idComment ? showInput(show, comment.comment) : comment.comment}</div>
                </div>
                </div>
            )
        })}
        </>
    );
}