# Full Stack Engineer Technical Test

A hands-on technical assessment for full-stack engineering candidates. This project contains practical coding tasks to evaluate React, TypeScript, and modern web development skills.

## Overview

This repository contains a series of tasks designed to assess:
- Component architecture and refactoring skills
- TypeScript proficiency
- React best practices
- Code quality and maintainability

## Getting Started

### Prerequisites
- Node.js 20+ or Bun
- Basic familiarity with Next.js, React, and TypeScript

### Installation

```bash
# Install dependencies
bun install

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the task list.

## Getting Started

1. Run `bun dev` and visit [http://localhost:3000](http://localhost:3000)
2. Review all three task descriptions
3. Plan your approach and time allocation
4. Start coding!

## Tasks

### Task 01: UI Pattern Matching
**Difficulty:** Medium | **Time:** 20-30 minutes

Study an e-commerce landing page with three pre-built sections and build a fourth section (newsletter signup) that matches the established design patterns, spacing, and visual style.

**Location:** `/tasks/task-01.md`
**Files:**
- `/src/app/tasks/task-01/page.tsx` (add your section here)
- `/src/app/tasks/task-01/newsletter-requirements.md` (requirements)

### Task 02: Performance Audit
**Difficulty:** Medium | **Time:** 15-20 minutes

Audit a product gallery page with multiple performance issues. Identify problems and document how to fix them using Next.js optimization patterns. This is a documentation task - no coding required.

**Location:** `/tasks/task-02.md` (review code, document findings in this file)
**File to Review:**
- `/src/app/tasks/task-02/page.tsx`

### Task 03: Component Refactoring
**Difficulty:** Medium | **Time:** 30-45 minutes

Refactor a complex card component that suffers from prop explosion and mixed concerns. The component handles both user and admin cards through a growing list of props and conditional logic.

**Location:** `/tasks/task-03.md`
**Files:**
- `/src/components/task-03/bad-card.tsx`
- `/src/app/tasks/task-03/page.tsx`

## How to Approach This Test

**Task Order:** Complete tasks in whatever order makes sense to you. There's no required sequence.

**Time Management:** This test is designed for 1-2 hours (including setup, reading requirements, and implementation). You may not finish everything—that's completely okay.

**What We Value:** We want to see your process, decision-making, and code quality over sheer completion. One well-executed task is better than three rushed ones.

**Do Your Best:** Prioritize what you think demonstrates your skills most effectively. Show us how you work.

## What We're Looking For

This is a realistic time-boxed assessment. Here's what matters to us:

**Process Over Perfection**
- We'd rather see one task done thoughtfully than three done rushed
- Your git commits tell a story—show us how you work
- Comments explaining "why" are valuable when decisions aren't obvious

**Real-World Skills**
- How you approach problems matters as much as the solution
- Working code is better than theoretical perfection
- Knowing when to look things up is a skill, not a weakness

**Communication Through Code**
- Clean, readable code that others can maintain
- Meaningful variable names and component structure
- Following established patterns in the codebase

**Don't Stress**
- Not finishing everything is completely normal
- We'll discuss your solutions in the interview
- Show us your best work in the time you have

## Evaluation Criteria

Your solutions will be evaluated on:
- **Code Quality:** Clean, readable, and maintainable code
- **TypeScript Usage:** Proper typing and type safety
- **React Patterns:** Appropriate use of React patterns and best practices
- **Problem Solving:** Understanding of the problem and effectiveness of the solution
- **Linting:** All code must pass linting (`bun run lint`)

## Using AI Tools

**You are allowed to use AI tools** (ChatGPT, Claude, Cursor, GitHub Copilot, etc.) to complete these tasks.

However, be aware:
- **You will be asked detailed questions** about your solutions in the final interview
- You must be able to **explain every decision** you made and why
- You should **understand the trade-offs** of your approach
- We'll ask you to **defend your architectural choices** and discuss alternatives

Think of this as real work: AI is a tool, but you need to understand what you're building. If you can't explain it, you didn't really build it.

## Commands

```bash
# Run development server
bun dev

# Run linting
bun run lint

# Fix auto-fixable linting issues
bun run format

# Build for production
bun run build
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui + Radix UI
- **Linting:** Biome
- **Package Manager:** Bun

## Submission Guidelines

1. Complete the tasks to the best of your ability
2. Your solutions must not introduce new linting errors (`bun run lint`)
3. Test your implementation thoroughly
4. Follow the git conventions you see in the existing commit history (clean, descriptive commits)
5. Submit your solution as instructed by the hiring team

## Need Help?

If any requirements are unclear or you encounter issues with the setup, please reach out to the hiring team for clarification.

Good luck! 🚀
