import axios from 'axios'
import type {
  PostConfiguration,
  Configuration,
  PomodoroSession
} from './types'

const $api = axios.create({
  baseURL: 'http://localhost:3002'
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

    getConfigurations: () => 
      $api.get('/configuration'),

    getPomodoroSessions: (userID: string) => 
      $api.get<PomodoroSession[]>('/pomodoSession'),

    postConfiguration: (data: PostConfiguration) =>
      $api.post<Configuration>('/configuration', data),
  }
}