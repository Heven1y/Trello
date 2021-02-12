import React from 'react'
import { ICard, IComment, IList} from '../Interfaces'
import {ADD_CARD, ADD_COMMENT, ADD_LIST, CHANGE_CARD, CHANGE_COMMENT, CHANGE_LIST, REMOVE_CARD, REMOVE_COMMENT, REMOVE_LIST} from './types'

const initialState = { 
    lists: [],
    cards: [],
    comments: []
}
export const mainReducer = (state:any = initialState, action:any) => {
    switch(action.type) {
        case ADD_LIST: return {...state, lists: [action.payload, ...state.lists]}
        case REMOVE_LIST: return {...state, lists: state.lists.filter((list:IList) => list.id !== action.payload)}
        case CHANGE_LIST: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                if(list.id === action.payload.id){
                    return {
                        ...list,
                        title: action.payload.title
                    }
                }
                return list
            })
        }
        case ADD_CARD: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                if(list.id === action.payload.idList){
                    return {
                        ...list,
                        cards: [action.payload.card.id, ...list.cards]
                    }
                }
                return list
            }),
            cards: [action.payload.card, ...state.cards]
        }
        case REMOVE_CARD: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                return {
                    ...list,
                    cards: list.cards.filter(card => {
                        return card !== action.payload
                    })
                }
            }),
            cards: state.cards.filter((card:ICard) => {
                return card.id !== action.payload
            })
        }
        case CHANGE_CARD: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                if(card.id === action.payload.id){
                    return {
                        ...card,
                        title: action.payload.title,
                        description: action.payload.description
                    }
                }
                return card
            })
        }
        case ADD_COMMENT: return {
            ...state,
            cards: state.cards.map((card:ICard) => {
                if(card.id === action.payload.idCard){
                    return {
                        ...card,
                        comments: [action.payload.comment.id, ...card.comments]
                    }
                }
                return card
            }),
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
            cards: state.cards.map((card:ICard) => {
                return {
                    ...card,
                    comments: card.comments.filter(card => {
                        return card !== action.payload
                    })
                }
            }),
            comments: state.comments.filter((comment:IComment) => {
                return comment.id !== action.payload
            })
        }
        default: return state
    }
}