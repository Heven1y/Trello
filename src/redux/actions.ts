import React from 'react'
import { ICard, IComment, IList } from '../Interfaces'
import { ADD_LIST, REMOVE_LIST, CHANGE_LIST, ADD_CARD, REMOVE_CARD, CHANGE_CARD, ADD_COMMENT, REMOVE_COMMENT, CHANGE_COMMENT } from './types'
export const addListAction = (list:IList) => {
    return {
        type: ADD_LIST,
        payload: list
    }
}
export const removeListAction = (id:number) => {
    return {
        type: REMOVE_LIST,
        payload: id
    }
}
export const changeListAction = (id: number, title: string) => {
    return {
        type: CHANGE_LIST,
        payload: {
            id: id,
            title: title
        }
    }
}
export const addCardAction = (card:ICard, idList:number) => {
    return {
        type: ADD_CARD,
        payload: {
            card: card,
            idList: idList
        }
    }
}
export const removeCardAction = (id :number) => {
    return {
        type: REMOVE_CARD,
        payload: id
    }
}
export const changeCardAction = (id:number, title:string, description:string) => {
    return {
        type: CHANGE_CARD,
        payload: {
            id: id,
            title: title,
            description: description
        }
    }
}
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