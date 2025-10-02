"use client";

import { BadCard } from "@/components/task-03/bad-card";

export default function Task03Page() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Task 03: Component Refactoring</h1>
          <p className="mt-2 text-muted-foreground">
            Refactor the BadCard component to improve maintainability
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">
              Current Implementation
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Below are two card variants using the same component. Your task is
              to refactor this while maintaining both functionalities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Card */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">User Card</h3>
              <BadCard
                name="Sarah Johnson"
                email="sarah.johnson@example.com"
                avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                isUser={true}
                memberSince="January 2023"
                points={15420}
                level="Gold Member"
                onViewProfile={() => alert("Viewing Sarah's profile")}
                onMessage={() => alert("Opening message to Sarah")}
              />
            </div>

            {/* Admin Card */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Admin Card</h3>
              <BadCard
                name="Michael Chen"
                email="michael.chen@company.com"
                avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                isAdmin={true}
                role="Senior Administrator"
                department="Engineering"
                employeeId="ENG-2024-001"
                permissions={[
                  "users.manage",
                  "content.edit",
                  "system.configure",
                ]}
                onEdit={() => alert("Editing Michael's details")}
                onPromote={() => alert("Promoting Michael")}
                onDelete={() => alert("Deleting Michael's account")}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-6">
          <h3 className="mb-2 text-lg font-semibold">Instructions</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>
              Review the BadCard component in{" "}
              <code>/src/components/task-03/bad-card.tsx</code>
            </li>
            <li>Identify the issues with the current implementation</li>
            <li>Refactor the component using better React patterns</li>
            <li>Ensure both cards continue to work after your refactoring</li>
            <li>Maintain type safety and avoid linting errors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
