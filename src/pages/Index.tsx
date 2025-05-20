
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { TaskProvider } from '../contexts/TaskContext';
import TaskSelectionPage from './TaskSelectionPage';
import TimerPage from './TimerPage';
import SettingsPage from './SettingsPage';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  const handleQuitClick = () => {
    toast({
      title: "Application Quit",
      description: "In a real Electron app, this would close the application.",
    });
  };
  
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app-container">
          <div className="app-content">
            <Routes>
              <Route 
                path="/" 
                element={<TaskSelectionPage 
                  onSettingsClick={handleSettingsClick}
                  onQuitClick={handleQuitClick}
                />} 
              />
              <Route 
                path="/timer" 
                element={<TimerPage 
                  onSettingsClick={handleSettingsClick}
                  onQuitClick={handleQuitClick}
                />} 
              />
              <Route 
                path="/settings" 
                element={<SettingsPage 
                  onQuitClick={handleQuitClick}
                />} 
              />
            </Routes>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default Index;
