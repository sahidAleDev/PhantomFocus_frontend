export interface PomodoroSession {
  _id?: string;
  breakDuration: number;
  createdAt: Date;
  currentCycle: number;
  endTime: Date;
  isActive: boolean;
  isCompleted: boolean;
  pauseTime: Date;
  resumeTime: Date;
  startTime: Date;
  title: string;
  totalCycles: number;
  userId: string;
  workDuration: number;
}

export interface PostConfiguration {
  breakDuration: number;
  cyclesBeforeLongBreak: number;
  longBreakDuration: number;
  userId: string;
  workDuration: number;
}

export interface Configuration {
  _id: string;
  breakDuration: number;
  createdAt: Date;
  cyclesBeforeLongBreak: number;
  longBreakDuration: number;
  userId: string;
  workDuration: number;
}