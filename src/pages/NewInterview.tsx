
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Define interview topics and levels
export const interviewTopics = [
  { id: "javascript", name: "JavaScript", icon: "💻" },
  { id: "react", name: "React", icon: "⚛️" },
  { id: "node", name: "Node.js", icon: "🟢" },
  { id: "typescript", name: "TypeScript", icon: "🔷" },
  { id: "html-css", name: "HTML & CSS", icon: "🎨" },
  { id: "general", name: "General", icon: "🔄" },
];

export const difficultyLevels = [
  { id: "beginner", name: "Beginner", description: "Basic concepts and fundamentals" },
  { id: "intermediate", name: "Intermediate", description: "Advanced concepts and practical applications" },
  { id: "advanced", name: "Advanced", description: "Complex concepts and expert knowledge" },
];

// Form schema
const formSchema = z.object({
  topic: z.string().min(1, { message: "Please select a topic" }),
  level: z.string().min(1, { message: "Please select a difficulty level" }),
});

const NewInterview = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      level: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Starting interview with:", values);
    // Navigate to interview page with topic and level as query parameters
    navigate(`/interview/start?topic=${values.topic}&level=${values.level}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Start New Interview</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Topic Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Interview Topic</CardTitle>
                  <CardDescription>
                    Choose a programming topic for your interview questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {interviewTopics.map((topic) => (
                            <div 
                              key={topic.id}
                              className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted ${
                                field.value === topic.id ? "bg-primary/10 border-primary" : "border-border"
                              }`}
                              onClick={() => {
                                field.onChange(topic.id);
                                setSelectedTopic(topic.id);
                              }}
                            >
                              <div className="text-3xl mb-2">{topic.icon}</div>
                              <div className="font-medium">{topic.name}</div>
                            </div>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Difficulty Level */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Difficulty Level</CardTitle>
                  <CardDescription>
                    Choose the difficulty level for your interview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            {difficultyLevels.map((level) => (
                              <div key={level.id} className="flex">
                                <FormItem className="flex items-center space-x-3 space-y-0 w-full">
                                  <FormControl>
                                    <RadioGroupItem value={level.id} />
                                  </FormControl>
                                  <div className={`p-4 border rounded-lg w-full ${
                                    field.value === level.id ? "bg-primary/10 border-primary" : "border-border"
                                  }`}>
                                    <div className="font-medium">{level.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {level.description}
                                    </div>
                                  </div>
                                </FormItem>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!form.formState.isValid}
                  >
                    Start Interview
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default NewInterview;
