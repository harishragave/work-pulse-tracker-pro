import { Task, TaskStatus } from '../contexts/TaskContext';

// Sample mock data
const mockTasks: Task[] = [
  // Projects (Level 0)
  { id: 1, name: 'Frontend Development', status: 'IN PROGRESS', level: 0, parentId: null, projectId: 1 },
  { id: 2, name: 'Backend Development', status: 'TODO', level: 0, parentId: null, projectId: 2 },
  { id: 3, name: 'Mobile App', status: 'BACKLOG', level: 0, parentId: null, projectId: 3 },
  
  // Level 1 Tasks
  { id: 101, name: 'UI Components', status: 'IN PROGRESS', level: 1, parentId: 1, projectId: 1, estimatedTime: 480, totalExpectedTime: 960 },
  { id: 102, name: 'Authentication', status: 'COMPLETE', level: 1, parentId: 1, projectId: 1, estimatedTime: 240, totalExpectedTime: 240 },
  { id: 103, name: 'Dashboard', status: 'TODO', level: 1, parentId: 1, projectId: 1, estimatedTime: 360, totalExpectedTime: 720 },
  
  { id: 201, name: 'API Development', status: 'TODO', level: 1, parentId: 2, projectId: 2, estimatedTime: 480, totalExpectedTime: 720 },
  { id: 202, name: 'Database Setup', status: 'REVIEW', level: 1, parentId: 2, projectId: 2, estimatedTime: 180, totalExpectedTime: 240 },
  
  { id: 301, name: 'iOS App', status: 'BACKLOG', level: 1, parentId: 3, projectId: 3, estimatedTime: 1440, totalExpectedTime: 2880 },
  { id: 302, name: 'Android App', status: 'CLARIFICATION', level: 1, parentId: 3, projectId: 3, estimatedTime: 1440, totalExpectedTime: 2880 },
  
  // Level 2 Tasks (Subtasks)
  { id: 1011, name: 'Button Component', status: 'COMPLETE', level: 2, parentId: 101, projectId: 1, estimatedTime: 120, totalExpectedTime: 120 },
  { id: 1012, name: 'Form Component', status: 'IN PROGRESS', level: 2, parentId: 101, projectId: 1, estimatedTime: 180, totalExpectedTime: 360 },
  { id: 1013, name: 'Card Component', status: 'TODO', level: 2, parentId: 101, projectId: 1, estimatedTime: 120, totalExpectedTime: 240 },
  
  { id: 2011, name: 'User API', status: 'TODO', level: 2, parentId: 201, projectId: 2, estimatedTime: 240, totalExpectedTime: 360 },
  { id: 2012, name: 'Product API', status: 'TODO', level: 2, parentId: 201, projectId: 2, estimatedTime: 240, totalExpectedTime: 360 },
  
  // Level 3 Tasks (Action Items)
  { id: 10121, name: 'Create Form Layout', status: 'COMPLETE', level: 3, parentId: 1012, projectId: 1, estimatedTime: 60, totalExpectedTime: 120 },
  { id: 10122, name: 'Add Form Validation', status: 'IN PROGRESS', level: 3, parentId: 1012, projectId: 1, estimatedTime: 120, totalExpectedTime: 240 },
  
  { id: 20111, name: 'User Authentication', status: 'TODO', level: 3, parentId: 2011, projectId: 2, estimatedTime: 120, totalExpectedTime: 180 },
  { id: 20112, name: 'User Profile', status: 'TODO', level: 3, parentId: 2011, projectId: 2, estimatedTime: 120, totalExpectedTime: 180 },
  
  // Level 4 Tasks (Subaction Items)
  { id: 101221, name: 'Client-side Validation', status: 'IN PROGRESS', level: 4, parentId: 10122, projectId: 1, estimatedTime: 60, totalExpectedTime: 120 },
  { id: 101222, name: 'Server-side Validation', status: 'TODO', level: 4, parentId: 10122, projectId: 1, estimatedTime: 60, totalExpectedTime: 120 },
];

// Simulated API call to fetch tasks
export const fetchTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Store in localStorage for persistence
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        resolve(JSON.parse(storedTasks));
      } else {
        localStorage.setItem('tasks', JSON.stringify(mockTasks));
        resolve(mockTasks);
      }
    }, 500);
  });
};

// Update task status
export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (!storedTasks) {
          reject(new Error('No tasks found'));
          return;
        }

        const tasks = JSON.parse(storedTasks);
        const taskIndex = tasks.findIndex((t: Task) => t.id === taskId);
        
        if (taskIndex === -1) {
          reject(new Error('Task not found'));
          return;
        }

        tasks[taskIndex].status = status;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        resolve(tasks[taskIndex]);
      } catch (error) {
        reject(error);
      }
    }, 300);
  });
};

// Save timer data
export const saveTimerData = async (
  projectId: number, 
  taskId: number, 
  elapsedTime: number,
  todayTime: number,
  totalTime: number
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timerData = localStorage.getItem('timerData') ? 
        JSON.parse(localStorage.getItem('timerData')!) : {};
      
      const key = `${projectId}_${taskId}`;
      timerData[key] = {
        projectId,
        taskId,
        elapsedTime,
        todayTime,
        totalTime,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem('timerData', JSON.stringify(timerData));
      resolve();
    }, 300);
  });
};

// Save activity data
export const saveActivityData = async (
  keyboardCount: number,
  mouseCount: number,
  lastScreenshotTime: Date | null
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activityData = {
        keyboardCount,
        mouseCount,
        lastScreenshotTime: lastScreenshotTime?.toISOString(),
        timestamp: new Date().toISOString()
      };

      // Store latest activity data
      localStorage.setItem('activityData', JSON.stringify(activityData));
      
      // Also keep a history
      const activityHistory = localStorage.getItem('activityHistory') ? 
        JSON.parse(localStorage.getItem('activityHistory')!) : [];
      
      activityHistory.push(activityData);
      if (activityHistory.length > 100) {
        activityHistory.shift(); // Keep history size manageable
      }
      
      localStorage.setItem('activityHistory', JSON.stringify(activityHistory));
      resolve();
    }, 300);
  });
};

// Mock function to simulate taking a screenshot
export const takeScreenshot = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would use Electron's desktopCapturer
      // Here we just return a placeholder base64 string
      resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==');
    }, 500);
  });
};
