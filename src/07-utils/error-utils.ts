import {Dispatch} from 'redux';
import {ResponseType} from '../03-DAL/todolist-api';
import {setAppErrorAC, setAppStatusAC} from "../02-BLL/app-reducer";

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}))
  } else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC({error: message}))
  dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>>