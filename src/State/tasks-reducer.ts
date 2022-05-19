import {AddTodolistACType, RemoveTodolistACType, SetTodosACType} from "./todolist-reducer";
import {TasksStateType} from "../components/App/App";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./Store";

type ActionsType =
  RemoveTaskACType |
  AddTaskACType |
  UpdateTaskACType |
  AddTodolistACType |
  RemoveTodolistACType |
  SetTodosACType |
  SetTasksActionType

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const UPDATE_TASK = 'UPDATE-TASK'
const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const SET_TODOS = 'SET-TODOS'
const SET_TASKS = 'SET-TASKS'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case REMOVE_TASK: {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(task => task.id !== action.payload.taskId)
      }
    }
    case ADD_TASK: {
      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
      }
    }
    case UPDATE_TASK: {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId]
          .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
      }
    }
    case SET_TASKS: {
      const stateCopy = {...state}
      stateCopy[action.payload.todoId] = action.payload.tasks
      return stateCopy
    }
    case ADD_TODOLIST: {
      return {
        ...state,
        [action.payload.todolistId]: []
      }
    }
    case REMOVE_TODOLIST: {
      const newState = {...state}
      delete newState[action.payload.id]
      return newState
    }
    case SET_TODOS: {
      const stateCopy = {...state}
      action.payload.todos.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }

    default:
      return state;
  }
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: REMOVE_TASK,
    payload: {
      todoListId,
      taskId
    }
  } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
  return {
    type: ADD_TASK,
    payload: {
      task
    }
  } as const
}

export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
  return {
  type: UPDATE_TASK,
  payload: {
    todoListId,
    taskId,
    model,
    }
  } as const
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todoId: string, tasks: TaskType[]) => {
  return {
    type: SET_TASKS,
    payload: {
      todoId,
      tasks
    }
  } as const
}

//thunk
export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todoId)
    .then((res) => {
      dispatch(setTasksAC(todoId, res.data.items))
    })
}
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
  tasksApi.deleteTasks(todoListId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(todoListId, taskId))
    })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  tasksApi.createTasks(todoListId, title)
    .then((res) => {
      dispatch(addTaskAC(res.data.data.item))
    })
}
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const state = getState().tasks
  const task = state[todoListId].find(t => t.id === taskId)
  if (!task) {
    console.warn('Task not found in the state')
    return
  }
  const apiModel: UpdateTaskModelType = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    title: task.title,
    status: task.status,
    ...domainModel
  }
  tasksApi.updateTasks(todoListId, taskId, apiModel)
    .then((res) => {

      dispatch(updateTaskAC(todoListId, taskId, domainModel))
    })
}


