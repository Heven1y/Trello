import React from 'react'
import { combineReducers } from 'redux'
import { listReducer } from './list/reducer'
import {cardReducer} from './card/reducer'
import {commentReducer} from './comment/reducer'
export const rootReducer = combineReducers({
    list: listReducer,
    card: cardReducer,
    comment: commentReducer
})