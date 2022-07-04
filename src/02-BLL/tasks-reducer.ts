import {addTodolistAC, removeTodolistAC, setTodosAC,} from "./todolist-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../03-DAL/tasks-api";
import {AppRootStateType, TypedDispatch} from "./Store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../07-utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    removeTaskAC: (state, action: PayloadAction<{ todoListId: string, taskId: string }>) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC: (state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    },
    setTasksAC: (state, action: PayloadAction<{ todoId: string, tasks: TaskType[] }>) => {
      state[action.payload.todoId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todoList.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todoListId]
    })
    builder.addCase(setTodosAC, (state, action) => {
      action.payload.todoList.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
  }
})


export const tasksReducer = slice.reducer
export const {removeTaskAC, setTasksAC, addTaskAC, updateTaskAC} = slice.actions

//thunk
export const fetchTasksTC = (todoId: string) => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  tasksApi.getTasks(todoId)
    .then((res) => {
      dispatch(setTasksAC({todoId, tasks: res.data.items}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  tasksApi.deleteTasks(todoListId, taskId)
    .then((res) => {
      dispatch(removeTaskAC({todoListId, taskId}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  tasksApi.createTasks(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(addTaskAC({task: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  const state = getState()
  const task = state.tasks[todoListId].find(t => t.id === taskId)
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
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(updateTaskAC({todoListId, taskId, model: domainModel}))
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
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TasksStateType = {
  [key: string]: TaskType[],
}

export enum ResultCodeStatuses {
  success = 0,
  error = 1,
  captcha = 10
}