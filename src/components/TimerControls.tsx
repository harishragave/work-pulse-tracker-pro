
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Button } from '@/components/ui/button';

const TimerControls: React.FC = () => {
  const { timer, pauseTimer, resumeTimer, startBreak, stopTimer } = useTaskContext();
  
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between space-x-3">
        {timer.isRunning && !timer.isPaused && (
          <>
            <Button
              onClick={pauseTimer}
              variant="outline"
              className="flex-1"
            >
              Pause
            </Button>
            <Button
              onClick={startBreak}
              variant="outline"
              className="flex-1"
            >
              Break
            </Button>
          </>
        )}
        
        {timer.isPaused && (
          <Button
            onClick={resumeTimer}
            variant="outline"
            className="flex-1"
          >
            Resume
          </Button>
        )}
        
        <Button
          onClick={stopTimer}
          variant="destructive"
          className="flex-1"
        >
          Stop
        </Button>
      </div>
    </div>
  );
};

export default TimerControls;
