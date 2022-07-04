import {todolistApi, TodolistType} from "../03-DAL/todolist-api";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {ResultCodeStatuses} from "./tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../07-utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypedDispatch} from "./Store";

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: 'todoLists',
  initialState: initialState,
  reducers: {
    removeTodolistAC: (state, action: PayloadAction<{ todoListId: string }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC: (state, action: PayloadAction<{ todoList: TodolistType }>) => {
      state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistTitleAC: (state, action: PayloadAction<{ todoListId: string, title: string }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].title = action.payload.title
    },
    changeTodolistFilterAC: (state, action: PayloadAction<{ todoListId: string, filter: FilterValueType }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].filter = action.payload.filter
    },
    setTodosAC: (state, action: PayloadAction<{ todoList: TodolistType[] }>) => {
      return action.payload.todoList.map((t) => ({...t, filter: 'all', entityStatus: 'idle'}))
    },
    changeTodolistEntityStatusAC: (state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].entityStatus = action.payload.entityStatus
    },
  }
})

export const todolistReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  setTodosAC,
  changeTodolistEntityStatusAC
} = slice.actions

// thunk
export const fetchTodosTC = () => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistApi.getTodolists()
    .then((res) => {
      dispatch(setTodosAC({todoList: res.data}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistEntityStatusAC({todoListId, entityStatus: 'loading'}))
  todolistApi.deleteTodolists(todoListId)
    .then((res) => {
      dispatch(removeTodolistAC({todoListId: todoListId}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const addTodoListTC = (title: string) => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistApi.createTodolists(title)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(addTodolistAC({todoList: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  todolistApi.updateTodolists(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(changeTodolistTitleAC({title, todoListId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}

//types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType,
  entityStatus: RequestStatusType
}