import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {ResultCodeStatuses} from "./tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const SET_TODOS = 'SET-TODOS'
const CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE-TODOLIST-ENTITY-STATUS'

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodoListActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.payload.id)
    case ADD_TODOLIST:
      return [{
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus: 'idle'
      }, ...state]
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
    case SET_TODOS:
      return action.payload.todos.map((t) => {
        return {...t, filter: 'all', entityStatus: 'idle'}
      })
    case CHANGE_TODOLIST_ENTITY_STATUS:
      return state.map(tl => tl.id === action.payload.todoListId ? {
        ...tl,
        entityStatus: action.payload.entityStatus
      } : tl)

    default:
      return state;
  }
}

export const removeTodolistAC = (todoListId1: string) => ({
  type: REMOVE_TODOLIST,
  payload: {id: todoListId1}
}) as const
export const addTodolistAC = (title: string, todolistId: string) => ({
  type: ADD_TODOLIST,
  payload: {title, todolistId}
}) as const
export const changeTodolistTitleAC = (todoListId: string, title: string) => ({
  type: CHANGE_TODOLIST_TITLE,
  payload: {todoListId, title}
}) as const
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValueType) => ({
  type: CHANGE_TODOLIST_FILTER,
  payload: {todoListId, filter}
}) as const
export const setTodosAC = (todos: TodolistType[]) => ({
  type: SET_TODOS,
  payload: {todos}
}) as const
export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => ({
  type: CHANGE_TODOLIST_ENTITY_STATUS,
  payload: {todoListId, entityStatus}
}) as const

// thunk
export const fetchTodosTC = () => (dispatch: Dispatch<TodoListActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistApi.getTodolists()
    .then((res) => {
      dispatch(setTodosAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<TodoListActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
  todolistApi.deleteTodolists(todoListId)
    .then((res) => {
      dispatch(removeTodolistAC(todoListId))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<TodoListActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistApi.createTodolists(title)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(addTodolistAC(title, res.data.data.item.id))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<TodoListActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistApi.updateTodolists(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(changeTodolistTitleAC(todoListId, title))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}

//types
type TodoListActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodosAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType,
  entityStatus: RequestStatusType
}