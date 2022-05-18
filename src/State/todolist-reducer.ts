import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

type TodolistReducerType =
  RemoveTodolistACType |
  AddTodolistACType |
  ChangeTodolistTitleACType |
  ChangeTodolistFilterACType |
  SetTodosACType

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
    case "SET-TODOS": {
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
    type: 'REMOVE-TODOLIST',
    payload: {
      id: todoListId1
    }
  } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string, todoId: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title: newTodolistTitle,
      todolistId: todoId
    }
  } as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoListId2: string, newTodolistTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id: todoListId2,
      title: newTodolistTitle
    }
  } as const
}

export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todoListId2: string, newFilter: FilterValueType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id: todoListId2,
      filter: newFilter
    }
  } as const
}

export type SetTodosACType = ReturnType<typeof setTodosAC>
export const setTodosAC = (todos: TodolistType[]) => {
  return {
    type: 'SET-TODOS',
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

