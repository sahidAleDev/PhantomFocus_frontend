export interface PostPomodoroSession {
  breakDuration: number;
  createdAt: Date;
  currentCycle: number;
  cyclesBeforeLongBreak: number;
  endTime: Date;
  isActive: boolean;
  isCompleted: boolean;
  longBreakDuration: number;
  pauseRemainingTime: number;
  startTime: Date;
  title: string;
  userId: string;
  workDuration: number;
}

export interface GetPomodoroSession extends PostPomodoroSession {
  _id: string;
}

export interface PostConfiguration {
  breakDuration: number;
  cyclesBeforeLongBreak: number;
  longBreakDuration: number;
  name: string;
  userId: string;
  workDuration: number;
}

export interface GetConfiguration extends PostConfiguration {
  _id: string;
  createdAt: Date;
}