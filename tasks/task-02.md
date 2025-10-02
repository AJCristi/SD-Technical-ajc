# Task 02: Performance Audit

## Problem

You'll find a product gallery page at `/tasks/task-02` that has serious performance issues. This page was built quickly without optimization, and now it's slow, janky, and hurting conversion rates.

Your client (a D2C e-commerce brand) is complaining about:
- Slow page loads
- Poor Lighthouse scores
- High bounce rates on mobile
- Layout shifts during load

## Your Task

**Audit the page and identify performance issues** - you don't need to fix them, just document what's wrong and how you'd improve it.

### What to Do:

1. Visit `/tasks/task-02` and review the implementation in `/src/app/tasks/task-02/page.tsx`
2. Document your findings in this file (see template below)
3. For each issue, explain:
   - What's wrong
   - Why it's a problem
   - How you'd fix it (specific Next.js/React patterns)

### What We're Looking For:

- Deep understanding of Next.js optimization capabilities
- Knowledge of modern React performance patterns
- Awareness of Core Web Vitals and their impact on user experience
- Ability to articulate why performance matters for e-commerce

## File to Review

- `/src/app/tasks/task-02/page.tsx` - The slow product gallery page

## Time Estimate

15-20 minutes

## Bonus Challenges (Optional)

If you finish early or want to demonstrate additional skills:

- Estimate the performance impact in metrics (e.g., "Could improve LCP by ~2s")
- Prioritize fixes by effort vs. impact (quick wins vs. major improvements)
- Suggest monitoring/testing strategies to catch these issues earlier in development

---

# Your Performance Audit

**Your Name:** Alex Cristi

**Date:** 10/2/2025

---

## Instructions

Document each performance issue you find in `/src/app/tasks/task-02/page.tsx`. For each issue:

1. **What's Wrong**: Describe the specific problem
2. **Why It Matters**: Explain the performance impact (metrics, UX, etc.)
3. **How to Fix**: Provide specific Next.js/React solution

Try to find **at least 8 issues**. Prioritize them by impact if you can.

---

## Issue #1

**What's Wrong:**
Using native `<img>` elements instead of Next.js Image component.

**Why It Matters:**
This can cause poor LCP. Without optimization, images load at original size, thus delaying users from seeing the actual product and clicking off.

**How to Fix:**
Replace all `<img>` with `next/image`, specifying `width`, `height`, and `priority`. We can also implement `loading="lazy"` for the images that are not being rendered and use the `placeholder` prop. We can use `preload` for images that catches the user's eye.

---

## Issue #2

**What's Wrong:**
Entire page is marked as `"use client"` (line 1) for a mostly static product gallery page.

**Why It Matters:**
This prevents static rendering and server-side optimizations, increasing TTFB. Eliminates benefits of Next.js caching, causing every visit to require full client-side Javascript execution.

**How to Fix:**
Convert to a Server Component by removing `use client`. Fetch data in a parent server component using `getStaticProps` or `async` component. Move interactive elements (filters, buttons) to separate Client Components with dynamic imports if needed.

---

## Issue #3

**What's Wrong:**
Continuous product tracking in `useEffect` (line 11) without debouncing or cleanup.

**Why It Matters:**
This creates infinite logging intervals that persist across all component re-renders. While the overhead seems minimal for one product, it scales linearly with the number of products displayed. On lower-performance devices, this can significantly increase Total Blocking Time when users interact with the page.

**How to Fix:**
Implement debounced tracking for product views that only activates when a product card enters the viewport:
```jsx
import { useEffectOnce } from "usehooks-ts";

useEffectOnce(() => {
  console.log(`Product ${product.id} viewed - tracked once`)
}, []);
```
Alternatively, implement this tracking logic server-side when the product details page is accessed.


---

## Issue #4

**What's Wrong:**
Full Lodash library import for simple operations: `_.uniq`, `_.mean`, `_.sum`.

**Why It Matters:**
Importing the entire library adds significant weight to the Javascript bundle for very limited functionality. This increases parsing and execution time, especially on low-end devices, delaying interactivity.

**How to Fix:**
Replace with native Javascript methods:
```jsx
// Instead of _.uniq
const categories = [...new Set(PRODUCTS.map(p => p.category))];

// Instead of _.mean
const averagePrice = filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length;

// Instead of _.sum
const totalValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
```

---

## Issue #5

**What's Wrong:**
Font loading via `<link>` in the `Task02Page` component with `display=block` which blocks rendering until the font download completes.

**Why It Matters:**
This approach causes FOIT (Flash of Invisible Text) while the font is loading and may trigger layout shifts once the font is applied (Flash of Unstyled Text). It prevents the browser from rendering fallback text immediately, leading to a slower and less stable user experience especially if the user has a weaker connection.

**How to Fix:**
Use Next.js built-in font optimization, which self-hosts fonts and applies font-display: swap automatically:
```jsx
import { Playfair_Display } from 'next/font/google'
const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' })

// Apply in Layout

<html lang="en" className={playfair.className}>
```
This ensures fonts don’t block rendering and reduces layout shifts on load.

---

## Issue #6

**What's Wrong:**
Inline styles are used instead of CSS classes for image dimensions. This prevents the browser from knowing the intrinsic size of the images before they load.

**Why It Matters:**
Without explicit width and height attributes (or an aspect ratio), the browser cannot reserve space for images. As a result, content shifts when images load, thus may contribute to a higher CLS score. This negatively impacts visual stability and Core Web Vitals.

**How to Fix:**
For ProductCard: 
```jsx
<img 
  src={product.image} 
  alt={product.name} 
  className="w-full aspect-[3/2] object-cover" 
/>
```
For Why Shop section: Use Next.js Image with specified dimensions and CSS Grid for uniform sizing.

---

## Issue #7

**What's Wrong:**
No memoization of computed values namely: `filteredProducts`, `totalProducts`, `averagePrice`, `totalValue`.

**Why It Matters:**
These values are recalculated on every keystroke or filter change, even when the results don’t change. While the overhead is small with only a few items, the cost grows significantly as the product list scales. This leads to unnecessary re-renders and visual jank during user interactions.

**How to Fix:**
Use useMemo to cache derived values and only recompute when dependencies change:
```jsx
const filteredProducts = useMemo(() => {
  return PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}, [selectedCategory, searchTerm]);

const totalValue = useMemo(() => {
  return filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
}, [filteredProducts]);
```

---

## Issue #8

**What's Wrong:**
There are no loading or transition states when filtering products

**Why It Matters:**
When filters are applied, the UI immediately re-renders all cards, causing noticeable layout shifts as elements reposition or appear/disappear. On lower-end devices, this can feel sluggish and give the impression of poor performance.

**How to Fix:**
Introduce a lightweight loading state or skeleton UI to smooth out the transition during filtering:
```jsx
const [isFiltering, setIsFiltering] = useState(false);

useEffect(() => {
  const handler = setTimeout(() => setIsFiltering(true), 100);
  return () => clearTimeout(handler);
}, [searchTerm, selectedCategory]);

if (isFiltering && filteredProducts.length === 0) {
  return <SkeletonGallery />;
}
```

---

## Priority Ranking (Optional Bonus)

If you had to fix these issues in order of impact, what would your priority be? List the issue numbers in order:

1. Issue #2 - Critical because server-side rendering would eliminate half the client JS and improve TTFB - impacts all users regardless of device
2. Issue #1 - Most visible to users as fixing images would reduce CLS and improve LCP - this could addresses bounce rate complaints
3. Issue #4 - Quick win, that reduces JS bundle significantly and can be replaced by regular Javascript, improving responsiveness on low to mid-tier devices

---

## Overall Assessment

**Estimated Performance Impact:**
**HIGH** - Current implementation shows $$LCP = 7.4s$$, $$CLS = 0$$, $$FCP = 3.1s$$, $$SI = 19.7s$$ on Lighthouse mobile. All metrics except CLS are below Web Vital thresholds. Google Chrome used

**Key Metrics Affected:**
1. **LCP**: Current $$7.4s$$ (Poor) vs potential $$2.1s$$ (Good)
2. **FCP**: Current $$3.1s$$ (Poor) vs potential $$1.8s$$ (Good)
3. **SI**: Current $$19.7s$$ (Poor) vs potential $$5.8s$$ (Good)
4. **CLS**: Current $$0$$ (Good) - no improvement needed
5. **TBT**: Current $$120ms$$ (Poor) vs potential $$20ms$$ (Good)

**Quick Wins:**
1. Convert to server component (issue #2) - $$~2 hours$$ for $$1.3s$$ FCP improvement
2. Add Next.js Image component (issue #1) - $$~3 hours$$ for $$5.3s$$ LCP improvement
3. Replace Lodash with native JS (issue #4) - $$~1 hour$$ for $$120ms$$ TBT reduction
