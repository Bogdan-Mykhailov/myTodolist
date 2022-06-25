import axios from'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "a6fd3c52-771e-48f1-889b-ca7971295a84"
  },
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{userId: number}>>('auth/login', data)
  },
  me() {
    return instance.get<ResponseType<MeResponseType>>('auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  }
}

// types
export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

type MeResponseType = {
  id: number
  email: string
  login: string
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

