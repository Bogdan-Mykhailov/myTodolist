import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../03-DAL/auth-api";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../07-utils/error-utils";
import {ResultCodeStatuses} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isInitialized: false
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setIsInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const authReducer = slice.reducer
export const {loginAC, setIsInitializedAC} = slice.actions

// thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(loginAC({isLoggedIn: true}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
}

export const initializeMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(loginAC({isLoggedIn: true}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(err.message, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC({isInitialized: true}))
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.logout()
    .then((res) => {
      if (res.data.resultCode === ResultCodeStatuses.success) {
        dispatch(loginAC({isLoggedIn: false}))
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
type AuthActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>