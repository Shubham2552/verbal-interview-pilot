
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface InterviewCardProps {
  id: string;
  title: string;
  description: string;
  date?: string;
  duration?: string;
  status: "completed" | "scheduled" | "in-progress";
  score?: number;
  topic?: string;
  level?: string;
}

const InterviewCard = ({
  id,
  title,
  description,
  date,
  duration,
  status,
  score,
  topic = "general",
  level = "beginner"
}: InterviewCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <StatusBadge status={status} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {topic && topic !== "general" && (
          <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </Badge>
        )}
        {level && (
          <Badge variant="outline" className="ml-2 mb-2 bg-secondary/10 text-secondary border-secondary/20">
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
        )}
        {date && (
          <div className="flex items-center text-sm mb-2">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{date}</span>
          </div>
        )}
        {duration && (
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{duration}</span>
          </div>
        )}
        {status === "completed" && score !== undefined && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-1">Score</p>
            <div className="bg-muted rounded-full h-2 w-full">
              <div
                className="bg-primary rounded-full h-2"
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex justify-end mt-1">
              <p className="text-sm font-medium">{score}%</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {status === "completed" && (
          <Link to={`/results/${id}`} className="w-full">
            <Button variant="outline" className="w-full">View Results</Button>
          </Link>
        )}
        {status === "scheduled" && (
          <Link to={`/interview/${id}?topic=${topic}&level=${level}`} className="w-full">
            <Button className="w-full">Start Interview</Button>
          </Link>
        )}
        {status === "in-progress" && (
          <Link to={`/interview/${id}?topic=${topic}&level=${level}`} className="w-full">
            <Button className="w-full">Continue Interview</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: InterviewCardProps["status"] }) => {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "scheduled":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
    default:
      return null;
  }
};

export default InterviewCard;
