import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const SET_TODOS = 'SET-TODOS'

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodoListsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.payload.id)
    case ADD_TODOLIST:
      return [{
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
    case SET_TODOS:
      return action.payload.todos.map((t) => {
        return {...t, filter: 'all'}
      })

    default:
      return state;
  }
}

export const removeTodolistAC = (todoListId1: string) => ({type: REMOVE_TODOLIST, payload: {id: todoListId1}}) as const
export const addTodolistAC = (title: string, todolistId: string) => ({type: ADD_TODOLIST, payload: {title, todolistId}}) as const
export const changeTodolistTitleAC = (todoListId: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, payload: {todoListId, title}}) as const
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValueType) => ({type: CHANGE_TODOLIST_FILTER, payload: {todoListId, filter}}) as const
export const setTodosAC = (todos: TodolistType[]) => ({type: SET_TODOS, payload: {todos}}) as const

// thunk
export const fetchTodosTC = () => (dispatch: Dispatch<TodoListsActionsType>) => {
  todolistApi.getTodolists()
    .then((res) => {
      dispatch(setTodosAC(res.data))
    })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
  todolistApi.deleteTodolists(todoListId)
    .then((res) => {
      dispatch(removeTodolistAC(todoListId))
    })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
  todolistApi.createTodolists(title)
    .then((res) => {
      dispatch(addTodolistAC(title, res.data.data.item.id))
    })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
  todolistApi.updateTodolists(todoListId, title)
    .then((res) => {
      dispatch(changeTodolistTitleAC(todoListId, title))
    })
}

//types
type TodoListsActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodosAC>

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}