# Frontend Architecture

## Folder Structure Philosophy

This project follows a clean separation of concerns with distinct folders for different responsibilities:

### 📂 `/src/mutations/`
**Purpose:** Pure API mutation functions

- Contains async functions that make API calls
- **No React hooks** - just plain async functions
- Returns typed responses or throws errors
- Easy to test and reuse

**Example:**
```typescript
export const createShortUrlMutation = async (data: CreateShortUrl): Promise<ShortUrlResponse> => {
    const response = await fetch('/api/shorten', { method: 'POST', body: JSON.stringify(data) })
    if (!response.ok) throw new Error('Failed')
    return response.json()
}
```

### 📂 `/src/hooks/`
**Purpose:** Custom React hooks that wrap mutations

- Imports mutation functions from `/mutations`
- Wraps them with `useMutation` from TanStack Query
- Components use these hooks, not mutations directly
- Provides React-specific capabilities (loading states, error handling)

**Example:**
```typescript
export function useCreateShortUrl() {
    return useMutation({
        mutationFn: createShortUrlMutation,
        onSuccess: (data) => console.log('Success:', data),
    })
}
```

### 📂 `/src/types/`
**Purpose:** Shared TypeScript type definitions

- Request/Response types
- Error types
- Domain models

### 📂 `/src/pages/`
**Purpose:** Page-level components (route components)

- Imports hooks from `/hooks`
- Handles page-level logic and layout
- Uses Mantine UI components

### 📂 `/src/components/`
**Purpose:** Reusable UI components

- Small, focused components
- Can be used across multiple pages
- Presentational components

## Data Flow

```
Component (Page)
    ↓
  Hook (useCreateShortUrl)
    ↓
  Mutation (createShortUrlMutation)
    ↓
  API (fetch)
```

## Component Usage Example

```typescript
// ❌ WRONG - Don't import mutations directly
import { createShortUrlMutation } from '@/mutations/createShortUrl'

// ✅ CORRECT - Use the hook wrapper
import { useCreateShortUrl } from '@/hooks/useCreateShortUrl'

function MyComponent() {
    const { mutate, isPending } = useCreateShortUrl()
    
    const handleSubmit = () => {
        mutate(
            { longUrl: 'https://example.com' },
            {
                onSuccess: (data) => console.log('Short URL:', data.shortUrl),
                onError: (err) => console.error('Failed:', err),
            }
        )
    }
    
    return <button onClick={handleSubmit} disabled={isPending}>Shorten</button>
}
```

## Benefits of This Architecture

1. **Separation of Concerns**
   - API logic (mutations) separate from React logic (hooks)
   - Easy to understand what each file does

2. **Testability**
   - Mutations are pure functions - easy to test
   - Hooks can be mocked in component tests

3. **Reusability**
   - Same mutation can be used by different hooks
   - Same hook can be used by different components

4. **Type Safety**
   - Full TypeScript support throughout the chain
   - Request/response types defined once in `/types`

5. **Maintainability**
   - Clear file organization
   - Easy to find and update code
   - Follows React Query best practices

## Adding New Mutations

### Step 1: Define Types
```typescript
// src/types/types.ts
export type MyRequest = { /* ... */ }
export type MyResponse = { /* ... */ }
```

### Step 2: Create Mutation
```typescript
// src/mutations/myMutation.ts
export const myMutation = async (data: MyRequest): Promise<MyResponse> => {
    // API call logic
}
```

### Step 3: Create Hook
```typescript
// src/hooks/useMyMutation.ts
export function useMyMutation() {
    return useMutation({ mutationFn: myMutation })
}
```

### Step 4: Use in Component
```typescript
// src/pages/MyPage.tsx
const { mutate } = useMyMutation()
```

## Code Quality Tools

- **TypeScript** - Compile-time type checking
- **ESLint** - Code quality and best practices
- **Prettier** - Consistent code formatting
- **TanStack Query DevTools** - Debug API calls in development


