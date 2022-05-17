import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, SetTodosACType} from "./todolist-reducer";
import {TasksStateType} from "../components/App/App";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";

type ActionsType =
  RemoveTaskACType |
  AddTaskACType |
  ChangeTaskStatusACType |
  ChangeTaskTitleACType |
  AddTodolistACType |
  RemoveTodolistACType |
  SetTodosACType |
  SetTasksActionType

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
      let newTask = {
        id: v1(),
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
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
          ...task,
          status: action.payload.status
        } : task)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
          ...task,
          title: action.payload.newTitle
        } : task)
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
      taskId,
      todoListId
    }
  } as const
}

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title: title,
      todoListId,
    }
  } as const
}

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todoListId,
      taskId,
      status
    }
  } as const
}

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
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
      const tasks = res.data.items
      dispatch(setTasksAC(todoId, tasks))
    })
}