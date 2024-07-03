import axios from 'axios'

const $api = axios.create({
  baseURL: 'http://localhost:3002'
})

import type {
  PomodoroSession
} from './types'

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
      $api.get<PomodoroSession[]>('/pomodoSession')
  }
}