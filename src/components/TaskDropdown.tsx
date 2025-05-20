
import React from 'react';
import { useTaskContext, Task, TaskStatus } from '../contexts/TaskContext';
import { Select } from '@/components/ui/select';
import { useTheme } from '../contexts/ThemeContext';

interface TaskDropdownProps {
  level: number;
  parentId: number | null;
  onSelect: (taskId: number | null) => void;
  selectedId: number | null;
  disabled?: boolean;
}

const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const statusClass = `status-${status.replace(' ', '-')}`;
  return (
    <span className={`status-badge ${statusClass}`}>
      {status}
    </span>
  );
};

const TaskDropdown: React.FC<TaskDropdownProps> = ({ 
  level, 
  parentId, 
  onSelect, 
  selectedId,
  disabled = false,
}) => {
  const { getTasksByLevel, getTaskById } = useTaskContext();
  const { isDarkMode } = useTheme();
  
  const tasks = getTasksByLevel(level, parentId);
  const selectedTask = selectedId ? getTaskById(selectedId) : null;

  const getLevelLabel = () => {
    switch(level) {
      case 0: return "Project";
      case 1: return "Task";
      case 2: return "Subtask";
      case 3: return "Action";
      case 4: return "Subaction";
      default: return "Item";
    }
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">{getLevelLabel()}</label>
        <div className="flex items-center gap-2">
          <select
            value={selectedId || ''}
            onChange={(e) => onSelect(e.target.value ? Number(e.target.value) : null)}
            disabled={disabled}
            className={`w-full p-2 rounded-md ${isDarkMode 
              ? 'bg-taskDropdown-bg text-taskDropdown-text' 
              : 'bg-taskDropdown-bg text-taskDropdown-text'}`}
          >
            <option value="">Select {getLevelLabel()}</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
          {selectedTask && (
            <StatusBadge status={selectedTask.status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDropdown;
