import React from 'react'
import { IComment} from '../Interfaces'
import { ADD_COMMENT, REMOVE_COMMENT, CHANGE_COMMENT } from './commentTypes'

export const addCommentAction = (idCard:number, comment:IComment) => {
    return {
        type: ADD_COMMENT,
        payload: {
            idCard: idCard,
            comment: comment
        }
    }
}
export const removeCommentAction = (id:number) => {
    return {
        type: REMOVE_COMMENT,
        payload: id
    }
}

export const changeCommentAction = (id:number, newComment:string) => {
    return {
        type: CHANGE_COMMENT,
        payload: {
            id: id,
            newComment: newComment
        }
    }
}