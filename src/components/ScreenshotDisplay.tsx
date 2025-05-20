
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

const ScreenshotDisplay: React.FC = () => {
  const { lastScreenshotTime } = useTaskContext();
  const { isDarkMode } = useTheme();
  
  // In a real app, we would fetch the actual screenshot image
  // For now, we'll use a placeholder
  const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Latest Screenshot</h3>
        {lastScreenshotTime && (
          <span className="text-sm text-muted-foreground">
            {format(lastScreenshotTime, 'HH:mm:ss')}
          </span>
        )}
      </div>
      
      <ScrollArea className={`h-[140px] rounded-md ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-amber-50 border border-amber-200'
      }`}>
        {lastScreenshotTime ? (
          <div className="p-1">
            <img 
              src={placeholderImage} 
              alt="Screenshot" 
              className="w-full h-auto rounded" 
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Camera className="h-12 w-12 mb-2" />
            <p>No screenshots taken yet</p>
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default ScreenshotDisplay;
