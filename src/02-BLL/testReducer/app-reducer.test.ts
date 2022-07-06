import {appReducer, initialState, setAppErrorAC, setAppStatusAC} from "../app-reducer";

let startState: typeof initialState;

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle'
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC({error: 'Some error'}))

  expect(endState.error).toBe('Some error')
})

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

  expect(endState.status).toBe('loading')
})