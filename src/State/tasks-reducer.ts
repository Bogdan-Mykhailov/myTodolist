import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
  removeTaskACType |
  addTaskACType |
  changeTaskStatusACType |
  changeTaskTitleACType |
  addTodolistACType |
  removeTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.taskId)
      }
    }
    case 'ADD-TASK': {
      let newTask = {id: v1(), title: action.payload.title, isDone: false};
      return {
        ...state,
        [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
      }
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTitle} : task)
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST':
      let newState = {...state}
      delete newState[action.payload.id]
      return newState


    default:
      return state;
  }
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      taskId,
      todoListId
    }
  } as const
}

export const addTaskAC = (todoListId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title: title,
      todoListId,
    }
  } as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todoListId,
      taskId,
      isDone
    }
  } as const
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      todoListId,
      taskId,
      newTitle
    }
  } as const
}
