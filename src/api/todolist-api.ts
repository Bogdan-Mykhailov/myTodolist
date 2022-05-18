import axios from "axios";

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "a6fd3c52-771e-48f1-889b-ca7971295a84"
  },
})

export const todolistApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolists(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
  },
  deleteTodolists(todolistId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  updateTodolists(todolistId: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
  }
}




