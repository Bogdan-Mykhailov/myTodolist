import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as string | null
}

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
      state.error = action.payload.error
    },
  }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'