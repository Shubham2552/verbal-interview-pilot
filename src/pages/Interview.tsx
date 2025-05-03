
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";

const Interview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewInterview = id === "start";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showNextDialog, setShowNextDialog] = useState(false);
  
  // Sample interview questions for demonstration
  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and how do they help you in your professional life?",
    "Describe a challenging situation at work and how you handled it.",
    "Why are you interested in this position?",
    "Where do you see yourself in five years?"
  ];

  // Mock function to simulate AI analysis
  const analyzeResponse = async (question: string, response: string) => {
    setIsThinking(true);
    console.log(`Analyzing response for: ${question}`);
    console.log(`Response: ${response}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsThinking(false);
    return true;
  };
  
  const handleTranscript = (text: string) => {
    setTranscript(text);
  };
  
  const handleNext = async () => {
    if (!transcript.trim()) {
      // No response recorded
      setShowNextDialog(true);
      return;
    }
    
    // Process the current response
    await analyzeResponse(questions[currentQuestion], transcript);
    
    if (currentQuestion === questions.length - 1) {
      // Last question, navigate to results
      navigate("/results/new");
    } else {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setTranscript("");
      setIsListening(false);
    }
  };
  
  const handleExit = () => {
    setShowExitDialog(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>
          
          {/* Timer (just UI, not functional in this demo) */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <Clock className="h-3 w-3 mr-1" />
              <span>00:45</span>
            </div>
          </div>
          
          {/* Question card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-2">Question:</h2>
              <p className="text-lg">{questions[currentQuestion]}</p>
            </CardContent>
          </Card>
          
          {/* Voice recorder */}
          <div className="mb-8">
            <VoiceRecorder 
              onTranscript={handleTranscript}
              isListening={isListening}
              onListeningChange={setIsListening}
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleExit}>
              Exit Interview
            </Button>
            <Button 
              onClick={handleNext}
              disabled={isThinking}
              className="min-w-[120px]"
            >
              {isThinking ? (
                <span className="flex items-center">
                  Processing
                  <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                </span>
              ) : (
                <span className="flex items-center">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </main>
      
      {/* Exit confirmation dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be saved, but the interview will be marked as incomplete.
              Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/dashboard")}>
              Exit Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* No response dialog */}
      <AlertDialog open={showNextDialog} onOpenChange={setShowNextDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No Response Recorded</AlertDialogTitle>
            <AlertDialogDescription>
              You haven't provided a response to this question.
              Would you like to skip this question?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Answering</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowNextDialog(false);
              if (currentQuestion === questions.length - 1) {
                navigate("/results/new");
              } else {
                setCurrentQuestion(currentQuestion + 1);
                setTranscript("");
              }
            }}>
              Skip Question
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Interview;
