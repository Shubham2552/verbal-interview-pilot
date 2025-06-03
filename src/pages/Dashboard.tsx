import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InterviewCard from "@/components/InterviewCard";
import InterviewCardSkeleton from "@/components/skeletons/InterviewCardSkeleton";
import PageSkeleton from "@/components/skeletons/PageSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLoading } from "@/hooks/useLoading";

// Sample data for demonstration
const sampleInterviews = [
  {
    id: "1",
    title: "Software Engineer Interview",
    description: "Technical interview focusing on algorithms and system design",
    date: "May 5, 2023",
    duration: "30 minutes",
    status: "completed" as const,
    score: 85,
  },
  {
    id: "2", 
    title: "Product Manager Interview",
    description: "Behavioral and product strategy questions",
    date: "May 3, 2023",
    duration: "45 minutes",
    status: "completed" as const,
    score: 78,
  },
  {
    id: "3",
    title: "Data Analyst Interview",
    description: "SQL, data modeling, and analytics case study",
    date: "May 8, 2023",
    duration: "40 minutes",
    status: "scheduled" as const,
  },
  {
    id: "4",
    title: "Marketing Specialist Interview",
    description: "Digital marketing strategies and campaign analysis",
    date: "May 7, 2023",
    duration: "35 minutes",
    status: "in-progress" as const,
  },
  {
    id: "5",
    title: "UX Designer Interview",
    description: "Portfolio review and design challenges",
    date: "May 10, 2023",
    duration: "50 minutes",
    status: "scheduled" as const,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const showSkeleton = useLoading(isLoading, { minDuration: 800 });
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  const completedInterviews = sampleInterviews.filter(
    (interview) => interview.status === "completed"
  );
  
  const upcomingInterviews = sampleInterviews.filter(
    (interview) => interview.status === "scheduled"
  );
  
  const inProgressInterviews = sampleInterviews.filter(
    (interview) => interview.status === "in-progress"
  );

  // Calculate stats
  const totalInterviews = completedInterviews.length;
  const averageScore = totalInterviews > 0
    ? Math.round(completedInterviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalInterviews)
    : 0;

  if (showSkeleton) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <PageSkeleton showStats={true} showTabs={true} cardCount={5} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your interview practice sessions and progress
            </p>
          </div>
          <Link to="/interview/start" className="mt-4 md:mt-0">
            <Button>
              <Plus className="mr-1 h-4 w-4" /> New Interview
            </Button>
          </Link>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <p className="text-sm text-muted-foreground mb-1">Total Interviews</p>
            <h3 className="text-3xl font-bold">{totalInterviews}</h3>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <p className="text-sm text-muted-foreground mb-1">Average Score</p>
            <h3 className="text-3xl font-bold">{averageScore}%</h3>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <p className="text-sm text-muted-foreground mb-1">Scheduled Interviews</p>
            <h3 className="text-3xl font-bold">{upcomingInterviews.length}</h3>
          </div>
        </div>
        
        {/* Interview List */}
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Interviews</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleInterviews.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
            {sampleInterviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  You haven't scheduled any interviews yet.
                </p>
                <Link to="/interview/start">
                  <Button>Schedule Your First Interview</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingInterviews.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
            {upcomingInterviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  You haven't scheduled any upcoming interviews.
                </p>
                <Link to="/interview/start">
                  <Button>Schedule an Interview</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressInterviews.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
            {inProgressInterviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No interviews in progress.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedInterviews.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
            {completedInterviews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No completed interviews yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
