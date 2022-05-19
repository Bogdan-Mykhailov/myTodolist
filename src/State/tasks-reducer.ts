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
      const newTask = {
        id: action.payload.taskId,
        title: action.payload.title,
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: action.payload.todoListId,
        order: 0,
        addedDate: ''
      };
      return {
        ...state,
        [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
      }
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId]
          .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
      }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.payload.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const newState = {...state}
      delete newState[action.payload.id]
      return newState
    }
    case "SET-TODOS": {
      const stateCopy = {...state}
      action.payload.todos.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case "SET-TASKS": {
      const stateCopy = {...state}
      stateCopy[action.payload.todoId] = action.payload.tasks
      return stateCopy
    }

    default:
      return state;
  }
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todoListId,
      taskId
    }
  } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string, taskId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todoListId,
      title,
      taskId
    }
  } as const
}

export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
  return {
  type: 'UPDATE-TASK',
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
    type: 'SET-TASKS',
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
      dispatch(addTaskAC(todoListId, res.data.data.item.title, res.data.data.item.id))
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


