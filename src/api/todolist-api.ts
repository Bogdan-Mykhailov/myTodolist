import axios from "axios";


type CommonResponseType<T = {}> = {
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
  data: T
}
type GetTodoType = {
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

export const todolistApi = {
  getTodolists() {
    return instance.get<GetTodoType[]>('todo-lists')
  },
  createTodolists(title: string) {
    return instance.post<CommonResponseType<{item: GetTodoType}>>('todo-lists', {title})
  },
  deleteTodolists(todolistId: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolists(todolistId: string, title: string) {
    return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
  }
}
