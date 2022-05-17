import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
  title: 'Api/Todolists'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistApi.getTodolists()
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'Thursday'
    todolistApi.createTodolists(title)
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '3ad4352d-1081-4677-924f-f516f34153bd'
    todolistApi.deleteTodolists(todolistId)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'bb083a24-ab74-43ea-a709-b982a783c734'
    const title = 'Friday'
    todolistApi.updateTodolists(todolistId, title)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
