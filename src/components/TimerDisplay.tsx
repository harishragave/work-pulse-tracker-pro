
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

const TimerDisplay: React.FC = () => {
  const { 
    timer, 
    timeFormatted, 
    lastScreenshotTime, 
    selectedTaskDetails 
  } = useTaskContext();
  const [lastScreenshotAgo, setLastScreenshotAgo] = useState<string>('never');

  useEffect(() => {
    // Update the "ago" time every minute
    const updateScreenshotTime = () => {
      if (!lastScreenshotTime) {
        setLastScreenshotAgo('never');
        return;
      }

      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - lastScreenshotTime.getTime()) / 1000);
      
      if (diffInSeconds < 60) {
        setLastScreenshotAgo(`${diffInSeconds} seconds ago`);
      } else {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        setLastScreenshotAgo(`${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`);
      }
    };

    updateScreenshotTime();
    const intervalId = setInterval(updateScreenshotTime, 60000);

    return () => clearInterval(intervalId);
  }, [lastScreenshotTime]);

  // Format seconds to hours, minutes, seconds
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Current Session</h3>
          <span className="text-sm text-muted-foreground">
            {format(new Date(), 'MMM d, yyyy - HH:mm:ss (O)')}
          </span>
        </div>
        
        <div className="text-4xl font-mono font-bold text-center py-6">
          {timeFormatted}
        </div>
      </Card>

      <Card className="p-4 space-y-2">
        <h3 className="text-lg font-medium">Time Summary</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Today's Time:</div>
          <div className="text-sm font-medium">{formatTime(timer.todayTime)}</div>
          
          <div className="text-sm text-muted-foreground">Total Time:</div>
          <div className="text-sm font-medium">{formatTime(timer.totalTime)}</div>
          
          {selectedTaskDetails?.estimatedTime && (
            <>
              <div className="text-sm text-muted-foreground">Estimated Time:</div>
              <div className="text-sm font-medium">{formatTime(selectedTaskDetails.estimatedTime * 60)}</div>
            </>
          )}
          
          {selectedTaskDetails?.totalExpectedTime && (
            <>
              <div className="text-sm text-muted-foreground">Expected Time:</div>
              <div className="text-sm font-medium">{formatTime(selectedTaskDetails.totalExpectedTime * 60)}</div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-4 flex justify-between items-center">
        <div className="text-sm">Last screenshot</div>
        <div className="text-sm font-medium">{lastScreenshotAgo}</div>
      </Card>
    </div>
  );
};

export default TimerDisplay;
