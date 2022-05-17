import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


// Types
export type AppDispatch = typeof store.dispatch;

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType,
  AppRootStateType,
  unknown,
  AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;