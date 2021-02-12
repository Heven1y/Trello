import React from 'react'
import { combineReducers } from 'redux'
import { mainReducer } from './Reducers'
export const rootReducer = combineReducers({
    root: mainReducer
})