# Implementation Plan Example

This example shows how to break down a feature into stages.

## Feature: User Profile Page

### Overview
Build a user profile page where users can view and edit their information.

---

## Stage 1: Database & Models

**Goal**: Set up data storage for user profiles

**Success Criteria**:
- [ ] User profile table created
- [ ] Migration runs successfully
- [ ] User model has profile methods

**Files to Modify**:
- `db/migrations/001_add_profile_table.sql`
- `src/models/User.js`

**Tests**:
- [ ] Can create user profile
- [ ] Can retrieve user profile
- [ ] Required fields validated

**Status**: Complete ✅

**Notes**: Added fields: bio, avatar_url, location, website

---

## Stage 2: API Endpoints

**Goal**: Create endpoints for profile operations

**Success Criteria**:
- [ ] GET /api/users/:id/profile - Retrieve profile
- [ ] PUT /api/users/:id/profile - Update profile
- [ ] Returns proper error codes

**Files to Modify**:
- `src/routes/users.js`
- `src/controllers/profileController.js`

**Tests**:
- [ ] Can fetch own profile
- [ ] Can update own profile
- [ ] Cannot update others' profiles (403)
- [ ] Returns 404 for non-existent user

**Status**: Complete ✅

**Notes**: Added authentication middleware check

---

## Stage 3: Frontend - View Profile

**Goal**: Display user profile information

**Success Criteria**:
- [ ] Profile page component created
- [ ] Displays user info (bio, avatar, etc.)
- [ ] Responsive design
- [ ] Loading and error states

**Files to Modify**:
- `src/components/ProfilePage.tsx`
- `src/components/UserAvatar.tsx`
- `src/styles/profile.css`

**Tests**:
- [ ] Renders profile data correctly
- [ ] Shows loading state
- [ ] Shows error message on failure
- [ ] Avatar renders properly

**Status**: In Progress 🔄

**Current**: Working on responsive layout

---

## Stage 4: Frontend - Edit Profile

**Goal**: Allow users to edit their profile

**Success Criteria**:
- [ ] Edit mode toggle
- [ ] Form validation
- [ ] Save changes to API
- [ ] Success/error feedback

**Files to Modify**:
- `src/components/ProfilePage.tsx` (add edit mode)
- `src/components/ProfileEditForm.tsx` (new)

**Tests**:
- [ ] Can toggle edit mode
- [ ] Form validates input
- [ ] Saves successfully
- [ ] Shows validation errors

**Status**: Not Started 📋

---

## Stage 5: Avatar Upload

**Goal**: Allow users to upload profile pictures

**Success Criteria**:
- [ ] Image upload component
- [ ] Image resizing/optimization
- [ ] Upload to cloud storage
- [ ] Update avatar_url in profile

**Files to Modify**:
- `src/components/AvatarUpload.tsx` (new)
- `src/services/imageUpload.js` (new)
- `src/controllers/profileController.js` (add upload handler)

**Tests**:
- [ ] Can select image
- [ ] Image gets resized
- [ ] Upload succeeds
- [ ] Profile updates with new URL

**Status**: Not Started 📋

---

## Try It Yourself

### Create Your Own Plan

Feature to implement: [Your choice]

```markdown
# Feature: [Name]

## Overview
[What and why]

## Stage 1: [Name]
**Goal**: [Specific deliverable]

**Success Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**Files to Modify**:
- file1
- file2

**Tests**:
- [ ] Test 1
- [ ] Test 2

**Status**: Not Started

---

[Repeat for 3-5 stages]
```

### Tips for Good Stages

✅ Each stage is independently valuable
✅ Clear completion criteria
✅ Tests defined upfront
✅ 3-5 stages total (not too many)

❌ Too many stages (overwhelming)
❌ Vague success criteria
❌ Stages depend on all previous stages
❌ No tests defined

## Using with Codex

### Creating the Plan

```
"Help me create an implementation plan for: [feature description]

Break into 3-5 stages with:
- Clear goals
- Success criteria
- Files to modify
- Test requirements"
```

### Updating Status

As you work:

```
"I've completed Stage 2. Update the plan status and review what's next."
```

## Related Pattern

See: [docs/maintainers/patterns/planning/stage-based-planning.md](../../docs/maintainers/patterns/planning/stage-based-planning.md)
