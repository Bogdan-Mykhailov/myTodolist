import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;