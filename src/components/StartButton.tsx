
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface StartButtonProps {
  onStart: () => void;
  disabled?: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart, disabled = false }) => {
  return (
    <Button 
      onClick={onStart}
      disabled={disabled}
      className="w-full mt-4"
    >
      Start Task
    </Button>
  );
};

export default StartButton;
