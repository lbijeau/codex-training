# Root Cause Tracing

## Context

Error occurs deep in the call stack and you need to find where the problem originates.

## Problem

Errors manifest far from their source. Fixing symptoms doesn't prevent recurrence.

## Solution

Trace execution backwards from the error to find where invalid data or incorrect state originates.

**Principle**: Fix the source, not where it manifests.

## Trade-offs

**Pros**:
- Fixes root cause (prevents recurrence)
- Improves understanding of system
- Often reveals related issues
- Prevents symptom whack-a-mole

**Cons**:
- Takes longer than symptom fix
- May require code changes to trace
- Need to understand execution flow

**Alternatives**:
- Fix symptom (quick but wrong)
- Add defensive checks (bandaid)

## The Tracing Process

### 1. Start at the Error

```
Error: "Cannot read property 'id' of undefined"
Location: src/api/orders.ts:156
  at processOrder (orders.ts:156)
  at handleRequest (handler.ts:89)
  at router (routes.ts:42)
```

**Start Here**: orders.ts:156

### 2. Work Backwards

```
At orders.ts:156:
  const userId = order.user.id;

Question: Why is order.user undefined?

Check the caller (handler.ts:89):
  const order = await getOrder(orderId);
  await processOrder(order);

Question: Why does getOrder return order with undefined user?

Check getOrder implementation:
  const order = await db.orders.findById(id);
  return order;

Question: Why isn't user populated?

ROOT CAUSE FOUND: Missing .populate('user') in query
```

### 3. Identify the Fix Point

```
Symptom Fix (WRONG):
  const userId = order.user?.id; // Defensive check

Root Cause Fix (RIGHT):
  const order = await db.orders.findById(id).populate('user');
```

## Examples

### Example 1: Null Pointer Deep in Stack

```
Error Stack:
  at renderUserProfile (Profile.tsx:45)
  at UserDashboard (Dashboard.tsx:112)
  at App (App.tsx:89)

Error: Cannot read property 'name' of null

Tracing Backwards:

Profile.tsx:45
  <h1>{user.name}</h1>

  Why is user null?
  Check caller...

Dashboard.tsx:112
  const user = getUserFromState(userId);
  return <Profile user={user} />

  Why does getUserFromState return null?
  Check implementation...

state/selectors.ts:34
  return state.users[userId];

  Why is state.users[userId] undefined?
  Check how users are loaded...

state/actions.ts:67
  dispatch({ type: 'SET_USERS', users: data.users });

  Why isn't this user in the array?
  Check API response...

ROOT CAUSE: API returns users array, not indexed by ID
FIX: Transform array to object indexed by ID before storing
```

### Example 2: Validation Failing Unexpectedly

```
Error: "Validation failed: email is required"
But email IS provided!

Tracing:

validators.ts:23
  if (!data.email) throw new Error('email is required');

  Why is data.email falsy when it was provided?
  Check transformation...

api/middleware.ts:45
  req.body = sanitizeInput(req.body);

  Why does sanitize remove email?
  Check sanitizer...

utils/sanitize.ts:12
  Object.keys(input).forEach(key => {
    if (key.includes('@')) delete input[key]; // BUG!
  });

ROOT CAUSE: Sanitizer removes keys containing '@' (meant for values)
FIX: Check values, not keys
```

### Example 3: Performance Degradation

```
Issue: API suddenly slow (was 50ms, now 2000ms)

Tracing Performance:

Add timing at each layer:

api/handler.ts
  Start: 0ms
  After auth: 5ms
  After validation: 10ms
  After DB query: 1995ms ← BOTTLENECK
  After serialization: 2000ms

Database is the issue. Trace further:

db/queries.ts
  Query execution: 1990ms

Enable query logging:

SELECT * FROM orders
  WHERE user_id = 123
  AND status IN (...)

No index on user_id!

Check when index was removed:
  git log db/migrations/

Found: Migration 0042 dropped index accidentally

ROOT CAUSE: Migration removed necessary index
FIX: Restore index
```

## Tracing Techniques

### Technique 1: Binary Search

If error is in complex function:

```
1. Add logging at midpoint
2. Error before or after midpoint?
3. Add logging at midpoint of problem half
4. Repeat until found
```

### Technique 2: Value Tracking

Track a value's transformation:

```
Input: { email: "user@example.com", name: "Bob" }

After parse: { email: "user@example.com", name: "Bob" }
After validate: { email: "user@example.com", name: "Bob" }
After sanitize: { name: "Bob" } ← email removed!
After transform: { name: "Bob" }

Problem found at sanitize step
```

### Technique 3: Stack Trace Analysis

```
Error: User not found

Stack:
  sendEmail (email.ts:45)
  notifyUser (notifications.ts:23)
  createOrder (orders.ts:156)

Work backwards:
1. sendEmail expects valid user
2. notifyUser should fetch user
3. createOrder passes userId

Check notifyUser:
  function notifyUser(userId) {
    sendEmail(userId); // BUG: passing ID not user
  }

ROOT CAUSE: Passing ID instead of user object
```

## Adding Instrumentation

When path is unclear, add strategic logging:

```typescript
function processOrder(order) {
  console.log('[processOrder] start', { orderId: order.id });

  const user = order.user;
  console.log('[processOrder] user', { user });

  if (!user) {
    console.log('[processOrder] ERROR: user is undefined');
    console.log('[processOrder] order object:', order);
  }

  const userId = user.id;
  console.log('[processOrder] userId', { userId });

  // ... rest of function
}
```

Run with instrumentation → See exactly where it fails

## The 5 Whys

Alternative tracing technique:

```
Problem: User can't login

Why? → Token validation fails
Why? → Token is expired
Why? → Token refresh didn't run
Why? → Refresh logic has bug
Why? → Edge case not handled (concurrent refresh)

ROOT CAUSE: Race condition in token refresh
```

## Checklist

When tracing root cause:
- [ ] Start at error location
- [ ] Work backwards through call stack
- [ ] Check each transformation/decision point
- [ ] Add logging if path unclear
- [ ] Identify where data becomes invalid
- [ ] Fix at source, not symptom
- [ ] Add test to prevent regression
- [ ] Check for similar issues

## Related Patterns

- [Systematic Debugging](systematic-approach.md)
- [Test-Driven Development](../quality/tdd-workflow.md)
