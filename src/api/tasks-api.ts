import axios from "axios";

type CommonResponseType<T = {}> = {
  fieldsErrors: string[]
  resultCode: number
  messages: string[]
  data: T
}
type GetTasksType = {
  id: string
  title: string
  addedDate: string
  order: number
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "a6fd3c52-771e-48f1-889b-ca7971295a84"
  },
})

export const tasksApi = {

  getTasks(todolistId: string) {
    return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  createTasks(todolistId: string, title: string) {
    return instance.post<CommonResponseType>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTasks(todolistId: string, taskId: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTasks(todolistId: string, taskId: string, title: string) {
    return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}