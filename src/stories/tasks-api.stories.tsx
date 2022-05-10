import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/tasks-api";

export default {
  title: 'Tasks/API'
}

export const GetTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '5398871a-e1df-4d5b-a724-568da7f0ae7c'
    tasksApi.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '5398871a-e1df-4d5b-a724-568da7f0ae7c'
    const title = 'New Task from Bogdan'
    tasksApi.createTasks(todolistId, title)
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '5398871a-e1df-4d5b-a724-568da7f0ae7c'
    const taskId = '730a1b55-01c5-489c-99c2-f07be7514a0f'
    tasksApi.deleteTasks(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })

  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '5398871a-e1df-4d5b-a724-568da7f0ae7c'
    const taskId = 'da959100-ac75-497b-a3fe-f9923b8c084f'
    const title = 'Friday is best day'
    tasksApi.updateTasks(todolistId, taskId, title)
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}