import axios from 'axios'
import type {
  PostConfiguration,
  PostPomodoroSession,
  GetConfiguration,
  GetPomodoroSession
} from './types'
import type { User } from '@/types'

const $api = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true,
})


export function useService() {
  return {
    $api,

    /**
     * 
     *
     * @param params
     * @returns
     */

    login: (user: User) => 
      $api.post('/user/login', user),

    logout: () =>
      $api.post('/user/logout'),

    getConfigurations: () => 
      $api.get('/configuration'),

    getPomodoroSessions: (userID: string) => 
      $api.get<GetPomodoroSession[]>('/pomodoSession'),

    postPomodoroSession: (data: PostPomodoroSession) => 
      $api.post('/pomodoSession', data),

    postConfiguration: (data: PostConfiguration) =>
      $api.post<GetConfiguration>('/configuration', data),

    validateToken: () =>
      $api.get('/token/validate'),
  }
}