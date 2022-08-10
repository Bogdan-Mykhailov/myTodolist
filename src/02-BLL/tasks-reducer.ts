import {addTodolistAC, removeTodolistAC, setTodosAC,} from "./todolist-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../03-DAL/tasks-api";
import {AppRootStateType, TypedDispatch} from "./Store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../07-utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', (todoId: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
  return tasksApi.getTasks(todoId)
    .then((res) => {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      return {todoId, tasks: res.data.items};
    })
    // .catch((err: AxiosError) => {
    //   handleServerNetworkError(err.message, thunkAPI.dispatch)
    // })
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', (param: {todoListId: string, taskId: string}, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
  return tasksApi.deleteTasks(param.todoListId, param.taskId)
    .then((res) => {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      return {todoListId: param.todoListId, taskId: param.taskId}
    })
    // .catch((err: AxiosError) => {
    //   handleServerNetworkError(err.message, thunkAPI.dispatch)
    // })
})

export const addTaskTC = createAsyncThunk('tasks/addTask', (param: {todoListId: string, title: string}, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
  return tasksApi.createTasks(param.todoListId, param.title)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {task: res.data.data.item}
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    })
    // .catch((err: AxiosError) => {
    //   handleServerNetworkError(err.message, thunkAPI.dispatch)
    // })
})

// export const addTaskTC = (todoListId: string, title: string) => (dispatch: TypedDispatch) => {
//   dispatch(setAppStatusAC({status: 'loading'}))
//   tasksApi.createTasks(todoListId, title)
//     .then((res) => {
//       if (res.data.resultCode === ResultCodeStatuses.success) {
//         dispatch(addTaskAC({task: res.data.data.item}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((err: AxiosError) => {
//       handleServerNetworkError(err.message, dispatch)
//     })
// }
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
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoId] = action.payload.tasks
    })
  }
})


export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC} = slice.actions



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