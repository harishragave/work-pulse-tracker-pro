
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks } from '../utils/api';

export type TaskStatus = 'TODO' | 'IN PROGRESS' | 'COMPLETE' | 'REVIEW' | 'CLOSED' | 'BACKLOG' | 'CLARIFICATION';

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  level: number;
  parentId: number | null;
  projectId: number;
  estimatedTime?: number; // in minutes
  totalExpectedTime?: number; // in minutes
}

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  isBreak: boolean;
  startTime: number | null;
  elapsedTime: number;
  todayTime: number;
  totalTime: number;
  projectId: number | null;
  taskId: number | null;
}

export type TaskSelection = {
  projectId: number | null;
  level1Id: number | null;
  level2Id: number | null;
  level3Id: number | null;
  level4Id: number | null;
};

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  taskSelection: TaskSelection;
  timer: TimerState;
  setTaskSelection: (selection: Partial<TaskSelection>) => void;
  getTasksByLevel: (level: number, parentId: number | null) => Task[];
  getTaskById: (id: number) => Task | undefined;
  startTimer: (projectId: number, taskId: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  startBreak: () => void;
  stopTimer: () => void;
  isTaskSelected: () => boolean;
  keyboardCount: number;
  mouseCount: number;
  incrementKeyboardCount: () => void;
  incrementMouseCount: () => void;
  lastScreenshotTime: Date | null;
  updateLastScreenshotTime: () => void;
  selectedTaskDetails: Task | null;
  timeFormatted: string;
  canNavigateToTimer: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyboardCount, setKeyboardCount] = useState(0);
  const [mouseCount, setMouseCount] = useState(0);
  const [lastScreenshotTime, setLastScreenshotTime] = useState<Date | null>(null);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<Task | null>(null);
  const [canNavigateToTimer, setCanNavigateToTimer] = useState(false);

  const [taskSelection, setTaskSelectionState] = useState<TaskSelection>({
    projectId: null,
    level1Id: null,
    level2Id: null,
    level3Id: null,
    level4Id: null,
  });

  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    isBreak: false,
    startTime: null,
    elapsedTime: 0,
    todayTime: 0,
    totalTime: 0,
    projectId: null,
    taskId: null,
  });

  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [timeFormatted, setTimeFormatted] = useState("00:00:00");

  // Fetch tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Update time formatted whenever timer updates
  useEffect(() => {
    const formatTime = (timeInSeconds: number) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setTimeFormatted(formatTime(Math.floor(timer.elapsedTime / 1000)));
  }, [timer.elapsedTime]);

  // Timer interval logic
  useEffect(() => {
    if (timer.isRunning && !timer.isPaused && !timer.isBreak) {
      const id = window.setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          elapsedTime: prev.startTime ? prev.elapsedTime + 1000 : prev.elapsedTime,
        }));
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer.isRunning, timer.isPaused, timer.isBreak, timer.startTime]);

  // Random screenshot logic
  useEffect(() => {
    if (timer.isRunning && !timer.isPaused && !timer.isBreak) {
      const takeRandomScreenshot = () => {
        const randomDelay = Math.floor(Math.random() * 10 * 60 * 1000); // Random time within 10 minutes
        const timeoutId = setTimeout(() => {
          console.log("Taking screenshot...");
          updateLastScreenshotTime();
          
          // Schedule next screenshot after 10 minutes
          takeRandomScreenshot();
        }, randomDelay);
        
        return () => clearTimeout(timeoutId);
      };
      
      const cleanup = takeRandomScreenshot();
      return cleanup;
    }
  }, [timer.isRunning, timer.isPaused, timer.isBreak]);

  // Functions to modify task selection
  const setTaskSelection = (selection: Partial<TaskSelection>) => {
    setTaskSelectionState((prev) => {
      const newSelection = { ...prev, ...selection };
      
      // If changing higher level, reset lower levels
      if (selection.projectId !== undefined) {
        newSelection.level1Id = null;
        newSelection.level2Id = null;
        newSelection.level3Id = null;
        newSelection.level4Id = null;
      } else if (selection.level1Id !== undefined) {
        newSelection.level2Id = null;
        newSelection.level3Id = null;
        newSelection.level4Id = null;
      } else if (selection.level2Id !== undefined) {
        newSelection.level3Id = null;
        newSelection.level4Id = null;
      } else if (selection.level3Id !== undefined) {
        newSelection.level4Id = null;
      }

      // Update selected task details if we've fully drilled down
      if (newSelection.level4Id) {
        const task = tasks.find(t => t.id === newSelection.level4Id);
        setSelectedTaskDetails(task || null);
        setCanNavigateToTimer(true);
      } else if (newSelection.level3Id) {
        const task = tasks.find(t => t.id === newSelection.level3Id);
        setSelectedTaskDetails(task || null);
        setCanNavigateToTimer(true);
      } else if (newSelection.level2Id) {
        const task = tasks.find(t => t.id === newSelection.level2Id);
        setSelectedTaskDetails(task || null);
        setCanNavigateToTimer(true);
      } else if (newSelection.level1Id) {
        const task = tasks.find(t => t.id === newSelection.level1Id);
        setSelectedTaskDetails(task || null);
        setCanNavigateToTimer(true);
      } else {
        setSelectedTaskDetails(null);
        setCanNavigateToTimer(false);
      }
      
      return newSelection;
    });
  };

  const getTasksByLevel = (level: number, parentId: number | null) => {
    return tasks.filter(task => task.level === level && task.parentId === parentId);
  };

  const getTaskById = (id: number) => {
    return tasks.find(task => task.id === id);
  };

  const startTimer = (projectId: number, taskId: number) => {
    setTimer({
      isRunning: true,
      isPaused: false,
      isBreak: false,
      startTime: Date.now(),
      elapsedTime: 0,
      todayTime: 0,
      totalTime: 0,
      projectId,
      taskId,
    });
    setCanNavigateToTimer(false);
  };

  const pauseTimer = () => {
    setTimer(prev => ({
      ...prev,
      isPaused: true,
      isBreak: false
    }));
  };

  const resumeTimer = () => {
    setTimer(prev => ({
      ...prev,
      isPaused: false,
      isBreak: false
    }));
    setCanNavigateToTimer(true);
  };

  const startBreak = () => {
    setTimer(prev => ({
      ...prev,
      isPaused: true,
      isBreak: true
    }));
  };

  const stopTimer = () => {
    setTimer(prev => {
      const todayTime = prev.todayTime + Math.floor(prev.elapsedTime / 1000);
      return {
        isRunning: false,
        isPaused: false,
        isBreak: false,
        startTime: null,
        elapsedTime: 0,
        todayTime,
        totalTime: prev.totalTime + Math.floor(prev.elapsedTime / 1000),
        projectId: null,
        taskId: null,
      };
    });
    setCanNavigateToTimer(true);
  };

  const isTaskSelected = () => {
    return taskSelection.level1Id !== null;
  };

  const incrementKeyboardCount = () => {
    setKeyboardCount(prev => prev + 1);
  };

  const incrementMouseCount = () => {
    setMouseCount(prev => prev + 1);
  };

  const updateLastScreenshotTime = () => {
    setLastScreenshotTime(new Date());
  };

  useEffect(() => {
    // Simulate keyboard and mouse activity
    const keyboardInterval = setInterval(() => {
      if (timer.isRunning && !timer.isPaused) {
        incrementKeyboardCount();
      }
    }, 10000); // Every 10 seconds

    const mouseInterval = setInterval(() => {
      if (timer.isRunning && !timer.isPaused) {
        incrementMouseCount();
      }
    }, 5000); // Every 5 seconds

    return () => {
      clearInterval(keyboardInterval);
      clearInterval(mouseInterval);
    };
  }, [timer.isRunning, timer.isPaused]);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      taskSelection,
      timer,
      setTaskSelection,
      getTasksByLevel,
      getTaskById,
      startTimer,
      pauseTimer,
      resumeTimer,
      startBreak,
      stopTimer,
      isTaskSelected,
      keyboardCount,
      mouseCount,
      incrementKeyboardCount,
      incrementMouseCount,
      lastScreenshotTime,
      updateLastScreenshotTime,
      selectedTaskDetails,
      timeFormatted,
      canNavigateToTimer
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
