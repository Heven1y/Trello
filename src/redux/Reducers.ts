import React from 'react'
import { IList} from '../Interfaces'
import {ADD_CARD, ADD_COMMENT, ADD_LIST, CHANGE_CARD, CHANGE_COMMENT, CHANGE_LIST, REMOVE_CARD, REMOVE_COMMENT, REMOVE_LIST} from './types'

const initialState = { 
    lists: []
}
export const listReducer = (state:any = initialState, action:any) => {
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
                        cards: [action.payload.card, ...list.cards]
                    }
                }
                return list
            })
        }
        case REMOVE_CARD: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                return {
                    ...list,
                    cards: list.cards.filter(card => {
                        return card.id !== action.payload
                    })
                }
            })
        }
        case CHANGE_CARD: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                return {
                    ...list,
                    cards: list.cards.map(card => {
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
            })
        }
        case ADD_COMMENT: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                return {
                    ...list,
                    cards: list.cards.map(card => {
                        if(card.id === action.payload.idCard){
                            return {
                                ...card,
                                comments: [action.payload.comment, ...card.comments]
                            }
                        }
                        return card
                    })
                }
            })
        }
        case CHANGE_COMMENT: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                return {
                    ...list,
                    cards: list.cards.map(card => {
                        return {
                            ...card,
                            comments: card.comments.map(comment => {
                                if(comment.id === action.payload.id){
                                    return {
                                        ...comment,
                                        comment: action.payload.newComment
                                    }
                                }
                                return comment
                            })
                        } 
                    })
                }
            })
        }
        case REMOVE_COMMENT: return {
            ...state,
            lists: state.lists.map((list:IList) => {
                return {
                    ...list,
                    cards: list.cards.map(card => {
                        return {
                            ...card,
                            comments: card.comments.filter(comment => {
                                return comment.id !== action.payload
                            })
                        } 
                    })
                }
            })
        }
        default: return state
    }
}