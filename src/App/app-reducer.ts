export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case APP_SET_STATUS:
      return {...state, status: action.payload.status}
    case APP_SET_ERROR:
      return {...state, error: action.payload.error}

    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, payload: {status}}) as const
export const setAppErrorAC = (error: string | null) => ({type: APP_SET_ERROR, payload: {error}}) as const

//types
type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>