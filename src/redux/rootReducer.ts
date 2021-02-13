import React from 'react'
import { combineReducers } from 'redux'
import { listReducer } from '../list/listReducer'
import {cardReducer} from '../card/cardReducer'
import {commentReducer} from '../comment/commentReducer'
export const rootReducer = combineReducers({
    list: listReducer,
    card: cardReducer,
    comment: commentReducer
})