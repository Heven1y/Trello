import React from 'react'
import { IList } from '../../Interfaces'
import { ADD_LIST, REMOVE_LIST, CHANGE_LIST } from './types'
export const addListAction = (list:IList) => {
    return {
        type: ADD_LIST,
        payload: list
    }
}
export const removeListAction = (id:number) => {
    return {
        type: REMOVE_LIST,
        payload: id
    }
}
export const changeListAction = (id: number, title: string) => {
    return {
        type: CHANGE_LIST,
        payload: {
            id: id,
            title: title
        }
    }
}