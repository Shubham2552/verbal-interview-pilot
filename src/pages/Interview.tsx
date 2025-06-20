import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import InterviewRoom from "@/components/InterviewRoom";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Button } from "@/components/ui/button";
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
import { ArrowRight, Home } from "lucide-react";
import { interviewTopics, difficultyLevels } from "./NewInterview";

// Define question banks based on topic and level
const questionBank = {
  javascript: {
    beginner: [
      "What is JavaScript and what is it used for?",
      "Explain the difference between let, const, and var.",
      "What are primitive data types in JavaScript?",
      "Explain how functions work in JavaScript.",
      "What is the DOM and how do you manipulate it with JavaScript?"
    ],
    intermediate: [
      "Explain closures in JavaScript and provide an example.",
      "What is the event loop in JavaScript and how does it work?",
      "Explain prototypal inheritance in JavaScript.",
      "What are promises and how do they work?",
      "Describe the differences between synchronous and asynchronous code."
    ],
    advanced: [
      "Explain JavaScript's garbage collection mechanism.",
      "What are WeakMap and WeakSet and when would you use them?",
      "Describe how to optimize JavaScript performance.",
      "Explain JavaScript decorators and their use cases.",
      "How would you implement a polyfill for a new JavaScript feature?"
    ]
  },
  react: {
    beginner: [
      "What is React and why would you use it?",
      "Explain the difference between props and state.",
      "What is JSX and how does it work?",
      "Describe the component lifecycle in React.",
      "What is the virtual DOM and why is it important?"
    ],
    intermediate: [
      "Explain React hooks and name some common ones.",
      "What are higher-order components and when would you use them?",
      "Describe the Context API and its use cases.",
      "How do you handle forms in React?",
      "Explain the concept of controlled and uncontrolled components."
    ],
    advanced: [
      "How does React's reconciliation algorithm work?",
      "Explain React Suspense and when to use it.",
      "How would you optimize performance in a React application?",
      "Explain server components in React.",
      "Describe advanced patterns like render props and compound components."
    ]
  },
  node: {
    beginner: [
      "What is Node.js and what are its key features?",
      "Explain the event-driven architecture of Node.js.",
      "What is npm and how do you use it?",
      "How do you create a simple HTTP server in Node.js?",
      "Explain the difference between Node.js and browser JavaScript."
    ],
    intermediate: [
      "How does the Node.js module system work?",
      "What is the purpose of middleware in Express.js?",
      "Explain how to handle asynchronous operations in Node.js.",
      "What are streams in Node.js and how are they used?",
      "How would you debug a Node.js application?"
    ],
    advanced: [
      "Explain Node.js clustering and when to use it.",
      "How does garbage collection work in Node.js?",
      "What are worker threads and when would you use them?",
      "Explain memory leaks in Node.js and how to prevent them.",
      "How would you implement authentication in a Node.js application?"
    ]
  },
  typescript: {
    beginner: [
      "What is TypeScript and why would you use it?",
      "Explain basic types in TypeScript.",
      "What are interfaces in TypeScript?",
      "How do you define and use functions in TypeScript?",
      "What is type inference in TypeScript?"
    ],
    intermediate: [
      "Explain generics in TypeScript.",
      "What are union and intersection types?",
      "How do you use enums in TypeScript?",
      "Explain the 'as' and 'unknown' type assertions.",
      "How do classes work in TypeScript?"
    ],
    advanced: [
      "Explain conditional types in TypeScript.",
      "What are mapped types and how do you use them?",
      "Describe the TypeScript compiler configuration options.",
      "How would you create and use declaration files?",
      "Explain advanced type inference techniques in TypeScript."
    ]
  },
  "html-css": {
    beginner: [
      "What is HTML5 and what new features does it offer?",
      "Explain the box model in CSS.",
      "What is responsive design and how do you implement it?",
      "Describe the difference between inline and block elements.",
      "What are semantic HTML tags and why are they important?"
    ],
    intermediate: [
      "Explain CSS positioning (relative, absolute, fixed, sticky).",
      "What are CSS preprocessors and why would you use them?",
      "How do CSS Grid and Flexbox differ?",
      "Describe CSS specificity and the cascade.",
      "What are media queries and how do you use them?"
    ],
    advanced: [
      "Explain CSS animations and transitions.",
      "What are CSS custom properties (variables)?",
      "How would you optimize website performance related to CSS?",
      "Describe advanced CSS selectors and their use cases.",
      "Explain CSS architecture methodologies (BEM, SMACSS, etc.)."
    ]
  },
  general: {
    beginner: [
      "Tell me about yourself and your background.",
      "What are your greatest strengths and how do they help you in your professional life?",
      "Describe a challenging situation at work and how you handled it.",
      "Why are you interested in this position?",
      "Where do you see yourself in five years?"
    ],
    intermediate: [
      "Describe your experience with version control systems.",
      "How do you approach learning new technologies?",
      "Explain your experience with agile development methodologies.",
      "How do you ensure code quality in your projects?",
      "Describe your experience working in cross-functional teams."
    ],
    advanced: [
      "Explain your approach to system design for a large-scale application.",
      "How do you make architectural decisions when facing tradeoffs?",
      "Describe how you've mentored junior developers.",
      "What strategies do you use for technical debt management?",
      "How do you balance technical excellence with business needs?"
    ]
  }
};

// Define interviewer profiles
const interviewerProfiles = {
  javascript: [
    { id: 'js-tech', name: 'Alex Chen', role: 'Senior JavaScript Developer', personality: 'technical' as const },
    { id: 'js-lead', name: 'Sarah Johnson', role: 'Tech Lead', personality: 'professional' as const }
  ],
  react: [
    { id: 'react-senior', name: 'Mike Rodriguez', role: 'React Specialist', personality: 'friendly' as const },
    { id: 'react-arch', name: 'Emily Zhang', role: 'Frontend Architect', personality: 'professional' as const }
  ],
  node: [
    { id: 'node-senior', name: 'David Kim', role: 'Backend Engineer', personality: 'technical' as const },
    { id: 'node-lead', name: 'Lisa Wang', role: 'Engineering Manager', personality: 'professional' as const }
  ],
  typescript: [
    { id: 'ts-expert', name: 'James Wilson', role: 'TypeScript Expert', personality: 'technical' as const },
    { id: 'ts-mentor', name: 'Anna Foster', role: 'Senior Developer', personality: 'friendly' as const }
  ],
  "html-css": [
    { id: 'ui-designer', name: 'Maya Patel', role: 'UI/UX Engineer', personality: 'creative' as const },
    { id: 'front-lead', name: 'Tom Anderson', role: 'Frontend Lead', personality: 'professional' as const }
  ],
  general: [
    { id: 'hr-lead', name: 'Jennifer Smith', role: 'HR Manager', personality: 'friendly' as const },
    { id: 'team-lead', name: 'Robert Brown', role: 'Team Lead', personality: 'professional' as const },
    { id: 'cto', name: 'Dr. Amanda Lee', role: 'CTO', personality: 'professional' as const }
  ]
};

const Interview = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNewInterview = id === "start";
  
  // Get topic and level from URL parameters
  const topic = searchParams.get("topic") || "general";
  const level = searchParams.get("level") || "beginner";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showNextDialog, setShowNextDialog] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [currentInterviewers, setCurrentInterviewers] = useState<any[]>([]);
  
  // Get questions based on topic and level
  const questions = questionBank[topic as keyof typeof questionBank]?.[level as keyof typeof questionBank.javascript] || 
                    questionBank.general.beginner;
  
  // Set up interviewers based on topic
  useEffect(() => {
    const profiles = interviewerProfiles[topic as keyof typeof interviewerProfiles] || interviewerProfiles.general;
    const interviewers = profiles.slice(0, level === 'advanced' ? 3 : 2).map((profile, index) => ({
      ...profile,
      isActive: index === 0,
      isSpeaking: index === 0 && isThinking,
      audioLevel: Math.random() * 0.8 + 0.2
    }));
    setCurrentInterviewers(interviewers);
  }, [topic, level, isThinking]);

  // Mock function to simulate AI analysis
  const analyzeResponse = async (question: string, response: string) => {
    setIsThinking(true);
    console.log(`Analyzing response for: ${question}`);
    console.log(`Response: ${response}`);
    
    // Simulate different interviewers speaking
    setCurrentInterviewers(prev => prev.map((interviewer, index) => ({
      ...interviewer,
      isSpeaking: index === Math.floor(Math.random() * prev.length),
      audioLevel: Math.random() * 0.8 + 0.2
    })));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsThinking(false);
    setCurrentInterviewers(prev => prev.map(interviewer => ({
      ...interviewer,
      isSpeaking: false
    })));
    return true;
  };
  
  const handleTranscript = (text: string) => {
    setTranscript(text);
  };
  
  const handleNext = async () => {
    if (!transcript.trim()) {
      setShowNextDialog(true);
      return;
    }
    
    await analyzeResponse(questions[currentQuestion], transcript);
    
    if (currentQuestion === questions.length - 1) {
      navigate(`/results/new?topic=${topic}&level=${level}`);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTranscript("");
      setIsListening(false);
    }
  };
  
  const handleExit = () => {
    setShowExitDialog(true);
  };

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
    setIsListening(!isMicOn);
  };

  const handleVolumeToggle = () => {
    setIsVolumeOn(!isVolumeOn);
  };
  
  return (
    <div className="min-h-screen bg-slate-900">
      <InterviewRoom
        interviewers={currentInterviewers}
        currentQuestion={questions[currentQuestion]}
        onMicToggle={handleMicToggle}
        onVolumeToggle={handleVolumeToggle}
        isMicOn={isMicOn}
        isVolumeOn={isVolumeOn}
        isListening={isListening}
      />

      {/* Progress bar overlay */}
      <div className="fixed top-4 left-4 right-4 z-10">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between text-sm mb-2 text-white">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>
      </div>

      {/* Action buttons overlay */}
      <div className="fixed top-4 right-4 z-10 flex space-x-2">
        <Button variant="outline" onClick={handleExit} className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <Home className="h-4 w-4 mr-2" />
          Exit
        </Button>
        <Button 
          onClick={handleNext}
          disabled={isThinking}
          className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
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

      {/* Hidden voice recorder for transcript capture */}
      <div className="hidden">
        <VoiceRecorder 
          onTranscript={handleTranscript}
          isListening={isListening && isMicOn}
          onListeningChange={setIsListening}
        />
      </div>
      
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
                navigate(`/results/new?topic=${topic}&level=${level}`);
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
