import React from 'react'
import { ICard} from '../Interfaces'
import {ADD_CARD, CHANGE_CARD, REMOVE_CARD, ADD_COMMENT, REMOVE_COMMENT} from './types'

const initialState = { 
    cards: []
}
export const cardReducer = (state:any = initialState, action:any) => {
    switch (action.type){
        case ADD_CARD: return {
            ...state,
            cards: [action.payload.card, ...state.cards]
        }
        case REMOVE_CARD: return {
            ...state,
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
            })
        }
        default: return state
    }
}