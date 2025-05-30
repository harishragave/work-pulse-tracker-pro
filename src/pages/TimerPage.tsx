
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import Navbar from '../components/Navbar';
import TimerControls from '../components/TimerControls';
import TimerDisplay from '../components/TimerDisplay';
import ScreenshotDisplay from '../components/ScreenshotDisplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface TimerPageProps {
  onSettingsClick: () => void;
  onQuitClick: () => void;
}

const TimerPage: React.FC<TimerPageProps> = ({ onSettingsClick, onQuitClick }) => {
  const navigate = useNavigate();
  const { 
    timer, 
    selectedTaskDetails
  } = useTaskContext();
  
  // If there's no active timer, redirect to the task selection page
  React.useEffect(() => {
    if (!timer.isRunning && !timer.isPaused) {
      navigate('/');
    }
  }, [timer.isRunning, timer.isPaused, navigate]);
  
  if (!selectedTaskDetails) {
    return null;
  }

  const handleBackToTaskSelection = () => {
    navigate('/');
  };

  return (
    <div className="h-full flex flex-col">
      <Navbar 
        title="Timer Running"
        onSettingsClick={onSettingsClick}
        onQuitClick={onQuitClick}
      />
      
      <div className="flex-grow p-4 overflow-y-auto">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4 flex items-center" 
          onClick={handleBackToTaskSelection}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to tasks
        </Button>
        
        <div className="mb-4">
          <h2 className="text-lg font-bold">{selectedTaskDetails.name}</h2>
          <div className="flex items-center mt-1 text-sm">
            <div className={`status-badge status-${selectedTaskDetails.status.replace(' ', '-')}`}>
              {selectedTaskDetails.status}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <TimerDisplay />
        </div>
        
        <div className="mb-4">
          <TimerControls />
        </div>
        
        <ScreenshotDisplay />
      </div>
    </div>
  );
};

export default TimerPage;
