
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { Camera, Keyboard, MousePointerClick } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

const ScreenshotDisplay: React.FC = () => {
  const { lastScreenshotTime, keyboardCount, mouseCount } = useTaskContext();
  const { isDarkMode } = useTheme();
  
  // In a real app, we would fetch the actual screenshot image
  // For now, we'll use a placeholder
  const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==";
  
  return (
    <div className="space-y-4">
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
      
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-3">Activity Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className={`flex items-center rounded-md p-3 ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-100'}`}>
            <div className={`p-2 rounded-full mr-3 ${isDarkMode ? 'bg-purple-800' : 'bg-purple-200'}`}>
              <Keyboard className={`h-5 w-5 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Keystrokes</p>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                {keyboardCount}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center rounded-md p-3 ${isDarkMode ? 'bg-amber-900/20' : 'bg-amber-100'}`}>
            <div className={`p-2 rounded-full mr-3 ${isDarkMode ? 'bg-amber-800' : 'bg-amber-200'}`}>
              <MousePointerClick className={`h-5 w-5 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Mouse Clicks</p>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                {mouseCount}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScreenshotDisplay;
