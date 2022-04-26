import {Provider} from "react-redux";
import {AppRootStateType, store} from "./Store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer
})

const initialGlobalState = {
  todoLists: [
    {id: 'todoListId1', title: 'Monday', filter: 'all'},
    {id: 'todoListId2', title: 'Tuesday', filter: 'all'}
  ],
  tasks: {
    ['todoListId1']: [
      {id: v1(), title: 'Sass 👽', isDone: true},
      {id: v1(), title: 'HTML & CSS 🤖', isDone: false},
      {id: v1(), title: 'React ⚛️', isDone: true},
      {id: 'v1()', title: 'Git 🤟', isDone: true},
      {id: v1(), title: 'Redux 🎮', isDone: false},
    ],
    ['todoListId2']: [
      {id: v1(), title: 'Angular', isDone: true},
      {id: v1(), title: 'Python', isDone: false},
      {id: v1(), title: 'C#', isDone: true},
      {id: v1(), title: 'Xcode', isDone: true},
    ],
  }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}