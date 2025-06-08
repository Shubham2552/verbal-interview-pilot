
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
    <div className="min-h-screen bg-background p-6">
      {/* Single Large Interviewer View */}
      <div className="h-[70vh] mb-6">
        <Card className="relative overflow-hidden border shadow-lg h-full">
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
        <Card className="mb-4 bg-card border shadow-md">
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse mr-3" />
              <span className="text-primary text-sm font-semibold">You are speaking</span>
            </div>
            <p className="text-foreground text-xl leading-relaxed font-medium">{userTranscript}</p>
          </div>
        </Card>
      )}

      {/* Question Display */}
      <Card className="mb-6 bg-card border shadow-md">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-destructive rounded-full animate-pulse mr-3" />
            <span className="text-foreground font-semibold">Live Interview</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Current Question:</h2>
          <p className="text-muted-foreground text-xl leading-relaxed">{currentQuestion}</p>
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
        <div className="flex items-center space-x-6 bg-card backdrop-blur-md rounded-2xl px-8 py-5 border shadow-lg">
          <Button
            onClick={onMicToggle}
            variant={isMicOn ? "default" : "destructive"}
            size="lg"
            className="rounded-full w-16 h-16 shadow-md transition-all duration-300 hover:scale-105"
          >
            {isMicOn ? <Mic className="h-7 w-7" /> : <MicOff className="h-7 w-7" />}
          </Button>
          
          {isListening && (
            <div className="flex items-center space-x-3 text-primary">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Listening...</span>
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-6 bg-primary rounded-full animate-pulse"
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
            className="rounded-full w-16 h-16 shadow-md transition-all duration-300 hover:scale-105"
          >
            {isVolumeOn ? <Volume2 className="h-7 w-7" /> : <VolumeX className="h-7 w-7" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
