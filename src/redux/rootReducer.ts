import React from 'react'
import { combineReducers } from 'redux'
import { listReducer } from './Reducers'
export const rootReducer = combineReducers({
    lists: listReducer
})