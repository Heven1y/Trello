import React from 'react'
import { combineReducers } from 'redux'
import { listReducer } from './listReducer'
import {cardReducer} from './cardReducer'
import {commentReducer} from './commentReducer'
export const rootReducer = combineReducers({
    list: listReducer,
    card: cardReducer,
    comment: commentReducer
})