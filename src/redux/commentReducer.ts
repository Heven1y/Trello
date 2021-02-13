import React from 'react'
import {IComment} from '../Interfaces'
import {ADD_COMMENT, CHANGE_COMMENT, REMOVE_COMMENT,} from './types'

const initialState = {
    comments: []
}

export const commentReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ADD_COMMENT: return {
            ...state,
            comments: [action.payload.comment, ...state.comments]
        }
        case CHANGE_COMMENT: return {
            ...state,
            comments: state.comments.map((comm:IComment) => {
                if(comm.id === action.payload.id){
                    return {
                        ...comm,
                        comment: action.payload.newComment
                    }
                }
                return comm
            })
        }
        case REMOVE_COMMENT: return {
            ...state,
            comments: state.comments.filter((comment:IComment) => {
                return comment.id !== action.payload
            })
        }
        default: return state
    }
}