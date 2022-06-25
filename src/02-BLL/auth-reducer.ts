import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../03-DAL/auth-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../07-utils/error-utils";
import {ResultCodeStatuses} from "./tasks-reducer";

const LOGIN = 'LOGIN'
const SET_IS_INITIALIZED = 'SET-IS-INITIALIZED'

const initialState = {
  isLoggedIn: false,
  isInitialized: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case LOGIN:
      return {...state, isLoggedIn: action.payload.isLoggedIn}
    case SET_IS_INITIALIZED:
      return {...state, isInitialized: action.payload.isInitialized}

    default:
      return state
  }
}

// action
export const loginAC = (isLoggedIn: boolean) => ({type: LOGIN, payload: {isLoggedIn}}) as const
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, payload: {isInitialized}}) as const

// thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(loginAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}

export const initializeMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(loginAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout()
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(loginAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}


//types
type AuthActionsType =
  | ReturnType<typeof loginAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setIsInitializedAC>