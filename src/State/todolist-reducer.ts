import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

type TodolistReducerType =
  RemoveTodolistACType |
  AddTodolistACType |
  ChangeTodolistTitleACType |
  ChangeTodolistFilterACType |
  SetTodosACType

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const SET_TODOS = 'SET-TODOS'


export type FilterValueType = 'all' | 'active' | 'completed'
const initialState: TodolistDomainType[] = []
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerType): TodolistDomainType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    case ADD_TODOLIST: {
      return [{
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    }
    case CHANGE_TODOLIST_TITLE: {
      return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
    }
    case CHANGE_TODOLIST_FILTER: {
      return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
    }
    case SET_TODOS: {
      return action.payload.todos.map((t) => {
        return {...t, filter: 'all'}
      })
    }

    default:
      return state;
  }
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoListId1: string) => {
  return {
    type: REMOVE_TODOLIST,
    payload: {
      id: todoListId1
    }
  } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistId: string) => {
  return {
    type: ADD_TODOLIST,
    payload: {
      title,
      todolistId
    }
  } as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoListId: string, title: string) => {
  return {
    type: CHANGE_TODOLIST_TITLE,
    payload: {
      todoListId,
      title
    }
  } as const
}

export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValueType) => {
  return {
    type: CHANGE_TODOLIST_FILTER,
    payload: {
      todoListId,
      filter
    }
  } as const
}

export type SetTodosACType = ReturnType<typeof setTodosAC>
export const setTodosAC = (todos: TodolistType[]) => {
  return {
    type: SET_TODOS,
    payload: {
      todos,
    }
  } as const
}

// thunk
export const fetchTodosTC = () => (dispatch: Dispatch) => {
  todolistApi.getTodolists()
    .then((res) => {
      dispatch(setTodosAC(res.data))
    })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
  todolistApi.deleteTodolists(todoListId)
    .then((res) => {
      dispatch(removeTodolistAC(todoListId))
    })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
  todolistApi.createTodolists(title)
    .then((res) => {
      dispatch(addTodolistAC(title, res.data.data.item.id))
    })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  todolistApi.updateTodolists(todoListId, title)
    .then((res) => {
      dispatch(changeTodolistTitleAC(todoListId, title))
    })
}

