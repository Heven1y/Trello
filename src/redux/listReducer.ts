import React from 'react'
import { IList} from '../Interfaces'
import {ADD_CARD, ADD_LIST, CHANGE_LIST, REMOVE_CARD, REMOVE_LIST} from './types'

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
                        cards: [action.payload.card.id, ...list.cards]
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
                        return card !== action.payload
                    })
                }
            })
        }
        default: return state
    }
}