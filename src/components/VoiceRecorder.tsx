
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader } from "lucide-react";

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  isListening?: boolean;
  onListeningChange?: (isListening: boolean) => void;
}

const VoiceRecorder = ({
  onTranscript,
  isListening: externalIsListening,
  onListeningChange
}: VoiceRecorderProps) => {
  const [isListening, setIsListening] = useState(externalIsListening || false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Control listening state from parent component if provided
  useEffect(() => {
    if (externalIsListening !== undefined && externalIsListening !== isListening) {
      setIsListening(externalIsListening);
      if (externalIsListening) {
        startListening();
      } else {
        stopListening();
      }
    }
  }, [externalIsListening]);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        onTranscript(currentTranscript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
        if (onListeningChange) onListeningChange(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // Try to restart if we're supposed to be listening
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.log("Could not restart recognition", e);
          }
        }
      };
    } else {
      setError('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        if (isListening) {
          recognitionRef.current.stop();
        }
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        if (onListeningChange) onListeningChange(true);
        setError(null);
      } catch (e) {
        console.error("Error starting speech recognition", e);
        setError('Could not start listening. Please try again.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (onListeningChange) onListeningChange(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col items-center">
        <Button
          onClick={toggleListening}
          variant={isListening ? "destructive" : "default"}
          size="lg"
          className="rounded-full h-16 w-16 flex items-center justify-center"
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          {isListening ? "Tap to stop" : "Tap to speak"}
        </p>
      </div>
      
      {isListening && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="listening-indicator"></div>
          <span className="text-sm text-accent animate-pulse">Listening...</span>
        </div>
      )}
      
      {error && (
        <div className="text-destructive text-sm mb-4">{error}</div>
      )}
      
      {transcript && (
        <div className="w-full max-w-lg mx-auto bg-muted rounded-lg p-4 mt-4">
          <h3 className="text-sm font-medium mb-2">Your response:</h3>
          <p className="text-foreground">{transcript}</p>
        </div>
      )}
    </div>
  );
};

// Add TypeScript type definitions
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default VoiceRecorder;
