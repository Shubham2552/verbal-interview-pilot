
import React, { useState, useEffect } from 'react';
import AIInterviewer from './AIInterviewer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Interviewer {
  id: string;
  name: string;
  role: string;
  personality: 'professional' | 'friendly' | 'technical' | 'creative';
  isActive: boolean;
  isSpeaking: boolean;
  audioLevel: number;
}

interface InterviewRoomProps {
  interviewers: Interviewer[];
  currentQuestion: string;
  onMicToggle: () => void;
  onVolumeToggle: () => void;
  isMicOn: boolean;
  isVolumeOn: boolean;
  isListening: boolean;
}

const InterviewRoom: React.FC<InterviewRoomProps> = ({
  interviewers,
  currentQuestion,
  onMicToggle,
  onVolumeToggle,
  isMicOn,
  isVolumeOn,
  isListening
}) => {
  const [activeInterviewer, setActiveInterviewer] = useState<string | null>(null);

  // Simulate interviewer switching
  useEffect(() => {
    if (interviewers.length > 0) {
      const interval = setInterval(() => {
        const randomInterviewer = interviewers[Math.floor(Math.random() * interviewers.length)];
        setActiveInterviewer(randomInterviewer.id);
      }, 10000); // Switch every 10 seconds

      return () => clearInterval(interval);
    }
  }, [interviewers]);

  const getGridLayout = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 md:grid-cols-3';
      case 4:
        return 'grid-cols-2 md:grid-cols-2';
      default:
        return 'grid-cols-2 md:grid-cols-3';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Interview Grid */}
      <div className={`grid ${getGridLayout(interviewers.length)} gap-4 h-[70vh] mb-6`}>
        {interviewers.map((interviewer, index) => (
          <Card 
            key={interviewer.id} 
            className="relative overflow-hidden bg-slate-800/50 border-slate-700 backdrop-blur-sm"
          >
            <AIInterviewer
              name={interviewer.name}
              role={interviewer.role}
              isActive={interviewer.isActive || activeInterviewer === interviewer.id}
              isSpeaking={interviewer.isSpeaking}
              audioLevel={interviewer.audioLevel}
              personality={interviewer.personality}
              position={[0, 0, 0]}
            />
          </Card>
        ))}
      </div>

      {/* Question Display */}
      <Card className="mb-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3" />
            <span className="text-white font-medium">Live Interview</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Current Question:</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{currentQuestion}</p>
        </div>
      </Card>

      {/* Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-slate-800/80 backdrop-blur-sm rounded-full px-6 py-4 border border-slate-700">
          <Button
            onClick={onMicToggle}
            variant={isMicOn ? "default" : "destructive"}
            size="lg"
            className="rounded-full w-14 h-14"
          >
            {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>
          
          {isListening && (
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Listening...</span>
            </div>
          )}
          
          <Button
            onClick={onVolumeToggle}
            variant={isVolumeOn ? "secondary" : "outline"}
            size="lg"
            className="rounded-full w-14 h-14"
          >
            {isVolumeOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Ambient particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InterviewRoom;
