import {Provider} from "react-redux";
import {AppRootStateType} from "./Store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistList/tasks-reducer";
import {todolistReducer} from "../features/TodolistList/todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer
})

const initialGlobalState = {
  todoLists: [
    {id: 'todoListId1', title: 'Monday', filter: 'all', addedDate: '', order: 0},
    {id: 'todoListId2', title: 'Tuesday', filter: 'all', addedDate: '', order: 0}
  ],
  tasks: {
    ['todoListId1']: [
      {id: v1(), title: 'Sass 👽', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId1', order: 0, addedDate: ''},
      {id: v1(), title: 'HTML & CSS 🤖', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId1', order: 0, addedDate: ''},
      {id: v1(), title: 'React ⚛️', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId1', order: 0, addedDate: ''},
      {id: 'v1()', title: 'Git 🤟', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId1', order: 0, addedDate: ''},
      {id: v1(), title: 'Redux 🎮', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId1', order: 0, addedDate: ''},
    ],
    ['todoListId2']: [
      {id: v1(), title: 'Angular', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId2', order: 0, addedDate: ''},
      {id: v1(), title: 'Python', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId2', order: 0, addedDate: ''},
      {id: v1(), title: 'C#', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId2', order: 0, addedDate: ''},
      {id: v1(), title: 'Xcode', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',  todoListId: 'todoListId2', order: 0, addedDate: ''},
    ],
  }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}