
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Share2 } from "lucide-react";

// Sample result data for demonstration
const sampleResult = {
  id: "new",
  title: "Software Engineer Interview",
  date: new Date().toLocaleDateString(),
  duration: "28 minutes",
  overallScore: 85,
  feedback: {
    strengths: [
      "Strong technical knowledge demonstrated in answers about system design",
      "Clear and concise communication style",
      "Good examples provided to back up claims"
    ],
    improvements: [
      "Consider providing more metrics and quantifiable achievements",
      "Work on reducing filler words like 'um' and 'basically'",
      "Some answers could benefit from more structure (STAR method)"
    ]
  },
  questions: [
    {
      question: "Tell me about yourself and your background.",
      answer: "I am a software engineer with 5 years of experience specializing in full-stack development. I've worked primarily with React, Node.js, and AWS cloud services. Most recently, I led a team that rebuilt our company's customer portal, which improved user engagement by 40%.",
      score: 88,
      feedback: "Strong introduction with good structure. Consider adding more specific technical skills and quantifiable achievements."
    },
    {
      question: "What are your greatest strengths and how do they help you in your professional life?",
      answer: "My greatest strength is my problem-solving ability. I enjoy breaking down complex issues into manageable parts. This has helped me debug difficult production issues and architect scalable solutions. I'm also a strong communicator, which helps when explaining technical concepts to non-technical stakeholders.",
      score: 92,
      feedback: "Excellent answer with specific examples. Good balance between technical and soft skills."
    },
    {
      question: "Describe a challenging situation at work and how you handled it.",
      answer: "We once had a major production outage right before an important client demo. I quickly organized the team, identified that a recent deployment had caused a database connection issue, and implemented a rollback while developing a proper fix. We managed to get everything stable just 10 minutes before the demo.",
      score: 85,
      feedback: "Good example with clear problem and resolution. Consider using the STAR method more explicitly: Situation, Task, Action, Result."
    },
    {
      question: "Why are you interested in this position?",
      answer: "I'm attracted to this role because it aligns with my passion for building user-focused products. I'm particularly excited about your company's mission to improve healthcare access through technology, as that's something I care deeply about. The tech stack you use also matches my experience perfectly.",
      score: 78,
      feedback: "Solid answer showing alignment with company values. Could be strengthened by researching more specific details about the company's products."
    },
    {
      question: "Where do you see yourself in five years?",
      answer: "In five years, I hope to have grown into a senior or lead engineer role where I can mentor others while still maintaining hands-on development work. I'm also interested in deepening my expertise in distributed systems and cloud architecture.",
      score: 82,
      feedback: "Good balance between ambition and realism. Consider connecting your goals more explicitly to how they would benefit the company."
    }
  ]
};

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const result = sampleResult; // In a real app, you'd fetch this based on the ID
  
  // Calculate averages and stats
  const averageScore = result.questions.reduce((acc, q) => acc + q.score, 0) / result.questions.length;
  
  const strengthCount = result.feedback.strengths.length;
  const improvementCount = result.feedback.improvements.length;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/dashboard" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{result.title} Results</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share Results
            </Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Overall Score</CardDescription>
              <CardTitle className="text-3xl font-bold">{result.overallScore}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-muted rounded-full mb-1">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ width: `${result.overallScore}%` }} 
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Interview Date</CardDescription>
              <CardTitle>{result.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Duration: {result.duration}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Response Analysis</CardDescription>
              <CardTitle>{result.questions.length} Questions Answered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {strengthCount} strengths identified • {improvementCount} areas for improvement
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Summary Feedback */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Summary Feedback</CardTitle>
            <CardDescription>
              Overall assessment of your interview performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-600">Strengths</h3>
                <ul className="space-y-2">
                  {result.feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-amber-600">Areas for Improvement</h3>
                <ul className="space-y-2">
                  {result.feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-amber-100 text-amber-600 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Detailed Responses */}
        <h2 className="text-2xl font-bold mb-4">Question Responses</h2>
        <div className="space-y-6 mb-8">
          {result.questions.map((q, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>Question {index + 1}</CardDescription>
                    <CardTitle className="text-lg">{q.question}</CardTitle>
                  </div>
                  <div className="bg-muted rounded-full px-2 py-1 text-sm font-medium">
                    Score: {q.score}%
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="response">
                  <TabsList>
                    <TabsTrigger value="response">Your Response</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  </TabsList>
                  <TabsContent value="response" className="mt-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p>{q.answer}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="feedback" className="mt-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p>{q.feedback}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Link to="/interview/start">
            <Button variant="default" size="lg">
              Practice Again
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
