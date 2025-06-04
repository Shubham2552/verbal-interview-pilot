import React, { useState, useEffect } from 'react';
import AIInterviewer from './AIInterviewer';
import VoiceRecorder from './VoiceRecorder';
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
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // Handle transcript from voice recorder
  const handleTranscript = (transcript: string) => {
    setUserTranscript(transcript);
    setShowTranscript(true);
    
    // Hide transcript after 5 seconds if user stops speaking
    setTimeout(() => {
      if (!isListening) {
        setShowTranscript(false);
      }
    }, 5000);
  };

  // Hide transcript when not listening
  useEffect(() => {
    if (!isListening) {
      setTimeout(() => setShowTranscript(false), 2000);
    }
  }, [isListening]);

  // Get Robert (the team lead) as the main interviewer
  const mainInterviewer = interviewers.find(interviewer => 
    interviewer.role.includes('Team Lead') || interviewer.name.includes('Robert')
  ) || interviewers[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Single Large Interviewer View */}
      <div className="h-[70vh] mb-6">
        <Card className="relative overflow-hidden bg-slate-800/30 border-slate-600 backdrop-blur-sm shadow-2xl h-full">
          {mainInterviewer && (
            <AIInterviewer
              name="Robert Brown"
              role="Team Lead"
              isActive={mainInterviewer.isActive}
              isSpeaking={mainInterviewer.isSpeaking}
              audioLevel={mainInterviewer.audioLevel}
              personality="professional"
              position={[0, 0, 0]}
            />
          )}
        </Card>
      </div>

      {/* Speech-to-text display when user is speaking */}
      {showTranscript && userTranscript && (
        <Card className="mb-4 bg-gradient-to-r from-blue-900/90 to-purple-900/90 border-blue-400/60 backdrop-blur-md shadow-2xl">
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mr-3 shadow-lg shadow-blue-400/50" />
              <span className="text-blue-200 text-sm font-semibold">You are speaking</span>
            </div>
            <p className="text-white text-xl leading-relaxed font-medium">{userTranscript}</p>
          </div>
        </Card>
      )}

      {/* Question Display */}
      <Card className="mb-6 bg-slate-800/40 border-slate-600 backdrop-blur-md shadow-xl">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3 shadow-lg shadow-red-500/50" />
            <span className="text-white font-semibold">Live Interview</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Current Question:</h2>
          <p className="text-gray-200 text-xl leading-relaxed">{currentQuestion}</p>
        </div>
      </Card>

      {/* Hidden voice recorder for transcript functionality */}
      <div className="hidden">
        <VoiceRecorder
          onTranscript={handleTranscript}
          isListening={isListening}
        />
      </div>

      {/* Enhanced Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-6 bg-slate-900/95 backdrop-blur-md rounded-2xl px-8 py-5 border border-slate-700/50 shadow-2xl">
          <Button
            onClick={onMicToggle}
            variant={isMicOn ? "default" : "destructive"}
            size="lg"
            className="rounded-full w-16 h-16 shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isMicOn ? <Mic className="h-7 w-7" /> : <MicOff className="h-7 w-7" />}
          </Button>
          
          {isListening && (
            <div className="flex items-center space-x-3 text-green-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-sm font-medium">Listening...</span>
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-6 bg-green-400 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1.2s'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          
          <Button
            onClick={onVolumeToggle}
            variant={isVolumeOn ? "secondary" : "outline"}
            size="lg"
            className="rounded-full w-16 h-16 shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isVolumeOn ? <Volume2 className="h-7 w-7" /> : <VolumeX className="h-7 w-7" />}
          </Button>
        </div>
      </div>

      {/* Professional ambient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              background: `linear-gradient(45deg, ${
                ['#3B82F6', '#1E40AF', '#1D4ED8'][Math.floor(Math.random() * 3)]
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InterviewRoom;
