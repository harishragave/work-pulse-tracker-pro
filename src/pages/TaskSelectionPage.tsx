
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import Navbar from '../components/Navbar';
import TaskDropdown from '../components/TaskDropdown';
import StartButton from '../components/StartButton';
import { Card } from '@/components/ui/card';

interface TaskSelectionPageProps {
  onSettingsClick: () => void;
  onQuitClick: () => void;
}

const TaskSelectionPage: React.FC<TaskSelectionPageProps> = ({ 
  onSettingsClick, 
  onQuitClick 
}) => {
  const navigate = useNavigate();
  const { 
    taskSelection, 
    setTaskSelection, 
    startTimer, 
    isTaskSelected,
    selectedTaskDetails,
    canNavigateToTimer
  } = useTaskContext();

  const handleStart = () => {
    // Find the most detailed level that is selected
    const taskId = taskSelection.level4Id || 
                  taskSelection.level3Id || 
                  taskSelection.level2Id || 
                  taskSelection.level1Id;
                  
    const projectId = taskSelection.projectId;
    
    if (taskId && projectId) {
      startTimer(projectId, taskId);
      navigate('/timer');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Navbar 
        title="Task Selection"
        onSettingsClick={onSettingsClick}
        onQuitClick={onQuitClick}
      />
      
      <div className="flex-grow overflow-y-auto p-4">
        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Select Task</h2>
          
          <TaskDropdown 
            level={0} 
            parentId={null} 
            onSelect={(id) => setTaskSelection({ projectId: id })}
            selectedId={taskSelection.projectId}
          />
          
          {taskSelection.projectId && (
            <TaskDropdown 
              level={1} 
              parentId={taskSelection.projectId} 
              onSelect={(id) => setTaskSelection({ level1Id: id })}
              selectedId={taskSelection.level1Id}
            />
          )}
          
          {taskSelection.level1Id && (
            <TaskDropdown 
              level={2} 
              parentId={taskSelection.level1Id} 
              onSelect={(id) => setTaskSelection({ level2Id: id })}
              selectedId={taskSelection.level2Id}
            />
          )}
          
          {taskSelection.level2Id && (
            <TaskDropdown 
              level={3} 
              parentId={taskSelection.level2Id} 
              onSelect={(id) => setTaskSelection({ level3Id: id })}
              selectedId={taskSelection.level3Id}
            />
          )}
          
          {taskSelection.level3Id && (
            <TaskDropdown 
              level={4} 
              parentId={taskSelection.level3Id} 
              onSelect={(id) => setTaskSelection({ level4Id: id })}
              selectedId={taskSelection.level4Id}
            />
          )}
          
          {isTaskSelected() && (
            <StartButton 
              onStart={handleStart}
              disabled={!canNavigateToTimer || (selectedTaskDetails?.status === 'COMPLETE')}
            />
          )}
        </Card>
        
        {selectedTaskDetails?.status === 'COMPLETE' && (
          <div className="p-3 bg-yellow-100 dark:bg-amber-900 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
            This task is marked as complete and cannot be started again.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSelectionPage;
