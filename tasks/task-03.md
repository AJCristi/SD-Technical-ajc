# Task 03: Component Refactoring

## Problem

You'll find a `BadCard` component in `/src/components/task-03/bad-card.tsx` that has become difficult to maintain. It handles both user cards and admin cards through a growing list of props and conditional logic.

## Current Issues

- Too many props (10+ different properties)
- Mixed concerns (user vs admin functionality in one component)
- Difficult to test and maintain
- Prone to prop-drilling and errors

## Your Task

Refactor the `BadCard` component to improve its maintainability while keeping both variants functional.

**Requirements:**
1. The two existing cards (user and admin) on the page must continue to work
2. Improve the component structure using better React patterns
3. Reduce complexity and improve readability
4. Ensure type safety

**What to keep:**
- Both card variants should remain visible on the page
- All existing functionality must be preserved

## Files to Review

- `/src/components/task-03/bad-card.tsx` - The component to refactor
- `/src/app/tasks/task-03/page.tsx` - Example usage

## Time Estimate

30-45 minutes

## Bonus Challenges (Optional)

If you finish early or want to demonstrate additional skills:

- Add comprehensive JSDoc comments explaining your design decisions
- Create a third variant (e.g., "Moderator Card") using your new pattern
- Write a brief explanation of why your approach is better than the original
