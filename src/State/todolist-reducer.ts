import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";


type TodolistReducerType =
  removeTodolistACType |
  addTodolistACType |
  changeTodolistTitleACType |
  changeTodolistFilterACType

export type FilterValueType = 'all' | 'active' | 'completed'
const initialState: TodolistDomainType[] = []
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
    }
    default:
      return state;
  }
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoListId1: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: todoListId1
    }
  } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title: newTodolistTitle,
      todolistId: v1()
    }
  } as const
}

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoListId2: string, newTodolistTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id: todoListId2,
      title: newTodolistTitle
    }
  } as const
}

export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todoListId2: string, newFilter: FilterValueType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id: todoListId2,
      filter: newFilter
    }
  } as const
}