
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTaskContext } from '../contexts/TaskContext';
import Navbar from '../components/Navbar';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface SettingsPageProps {
  onQuitClick: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onQuitClick }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { keyboardCount, mouseCount, lastScreenshotTime } = useTaskContext();
  const [warnings] = useState([
    {
      id: 1,
      type: 'Screenshot Warning',
      message: 'Blank screenshot detected at 14:35.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'Activity Warning',
      message: 'No activity detected for more than 15 minutes.',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'Break Warning',
      message: 'Break time exceeded 1 hour limit.',
      time: '2 days ago',
    },
  ]);

  return (
    <div className="h-full flex flex-col">
      <Navbar 
        title="Settings"
        onSettingsClick={() => navigate('/')}
        onQuitClick={onQuitClick}
      />
      
      <div className="flex-grow p-4 overflow-y-auto">
        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Appearance</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={toggleTheme}
            />
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">User Account</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white">
                U
              </div>
              <div>
                <div className="font-medium">Demo User</div>
                <div className="text-sm text-muted-foreground">demo@example.com</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Sign Out
            </Button>
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Activity Monitoring</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Keyboard Count:</span>
              <span className="font-medium">{keyboardCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Mouse Movements:</span>
              <span className="font-medium">{mouseCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Screenshot:</span>
              <span className="font-medium">
                {lastScreenshotTime 
                  ? format(lastScreenshotTime, 'MMM d, yyyy HH:mm:ss')
                  : 'None taken yet'}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Warnings</h2>
          
          {warnings.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground">
              No warnings to display.
            </div>
          ) : (
            <div className="space-y-3">
              {warnings.map((warning) => (
                <div key={warning.id} className="border rounded-md p-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-amber-500">{warning.type}</span>
                    <span className="text-xs text-muted-foreground">{warning.time}</span>
                  </div>
                  <p className="text-sm mt-1">{warning.message}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
