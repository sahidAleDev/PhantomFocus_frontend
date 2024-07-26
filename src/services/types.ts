export interface PostPomodoroSession {
  breakDuration: number;
  createdAt: Date;
  currentCycle: number;
  cyclesBeforeLongBreak: number;
  endTime: Date;
  isActive: boolean;
  isCompleted: boolean;
  longBreakDuration: number;
  pauseTime: Date;
  resumeTime: Date;
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