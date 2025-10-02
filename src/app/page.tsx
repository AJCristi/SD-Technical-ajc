import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tasks = [
  {
    id: "task-01",
    title: "UI Pattern Matching",
    description:
      "Study existing UI sections and build a new section that matches the established design patterns and visual style.",
    difficulty: "Medium",
    estimatedTime: "20-30 minutes",
    tags: ["CSS", "Tailwind", "Design Systems"],
  },
  {
    id: "task-02",
    title: "Performance Audit",
    description:
      "Identify and document performance issues in a product gallery page. Test your Next.js optimization knowledge.",
    difficulty: "Medium",
    estimatedTime: "15-20 minutes",
    tags: ["Next.js", "Performance", "Web Vitals"],
  },
  {
    id: "task-03",
    title: "Component Refactoring",
    description:
      "Refactor a complex card component with too many props into a cleaner, more maintainable structure.",
    difficulty: "Medium",
    estimatedTime: "30-45 minutes",
    tags: ["React", "TypeScript", "Component Design"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Full Stack Engineer Technical Test
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome! Complete the following tasks to demonstrate your skills
              in React, TypeScript, and modern web development practices.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Available Tasks</h2>
            <p className="text-muted-foreground">
              Each task includes a description, requirements, and success
              criteria. Click on any task to get started.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <Card className="group h-full transition-all hover:shadow-lg hover:border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {task.title}
                      </CardTitle>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Difficulty:{" "}
                        <span className="font-medium text-foreground">
                          {task.difficulty}
                        </span>
                      </span>
                      <span className="text-muted-foreground">
                        {task.estimatedTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border bg-muted/50 p-6">
          <h3 className="mb-2 text-lg font-semibold">Instructions</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Complete each task to the best of your ability</li>
            <li>Ensure all code passes linting and type checking</li>
            <li>Follow existing code conventions and patterns</li>
            <li>Test your implementation before submitting</li>
            <li>Feel free to ask questions if requirements are unclear</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
