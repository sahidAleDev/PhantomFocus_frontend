import axios from 'axios'
import type {
  PostConfiguration,
  Configuration,
  PomodoroSession
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

    getConfigurations: () => 
      $api.get('/configuration'),

    getPomodoroSessions: (userID: string) => 
      $api.get<PomodoroSession[]>('/pomodoSession'),

    postConfiguration: (data: PostConfiguration) =>
      $api.post<Configuration>('/configuration', data),

    validateToken: () =>
      $api.get('/token/validate'),
  }
}