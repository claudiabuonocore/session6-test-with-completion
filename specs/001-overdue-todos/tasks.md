# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todos/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Test tasks are included as this is a quality-focused project with 80%+ coverage requirement per constitution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `packages/backend/src/`, `packages/frontend/src/`
- Tests colocated in `__tests__/` directories per constitution

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing project structure matches implementation plan requirements
- [x] T002 [P] Review existing Todo entity in packages/backend/src/services/todoService.js for due date support
- [x] T003 [P] Review existing TodoCard component in packages/frontend/src/components/TodoCard.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create date utility helper in packages/frontend/src/utils/dateUtils.js for overdue calculations
- [x] T005 [P] Add overdue status CSS variables to packages/frontend/src/styles/theme.css for light and dark modes
- [x] T006 [P] Create test fixtures for todos with various due dates in packages/frontend/src/__tests__/fixtures/todoFixtures.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visual Identification of Overdue Todos (Priority: P1) 🎯 MVP

**Goal**: Users can immediately identify overdue todos through visual indicators (danger color, warning icon, "OVERDUE" label)

**Independent Test**: Create todos with past due dates, view the list, verify overdue items display all three visual indicators (color, icon, label) and non-overdue items do not

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T007 [P] [US1] Unit test for isOverdue function in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [x] T008 [P] [US1] Unit test for overdue todo rendering in packages/frontend/src/components/__tests__/TodoCard.test.js
- [x] T009 [P] [US1] Integration test for overdue visual indicators in packages/frontend/src/__tests__/App.test.js

### Implementation for User Story 1

- [x] T010 [P] [US1] Implement isOverdue function in packages/frontend/src/utils/dateUtils.js (client timezone comparison)
- [x] T011 [P] [US1] Add overdue styling classes to packages/frontend/src/components/TodoCard.css
- [x] T012 [US1] Update TodoCard component in packages/frontend/src/components/TodoCard.js to calculate and display overdue status
- [x] T013 [US1] Add warning icon component/SVG to packages/frontend/src/components/TodoCard.js
- [x] T014 [US1] Add "OVERDUE" label display to packages/frontend/src/components/TodoCard.js
- [x] T015 [US1] Add aria-label for screen readers in packages/frontend/src/components/TodoCard.js
- [x] T016 [US1] Verify overdue status updates on todo completion in packages/frontend/src/components/TodoCard.js
- [x] T017 [US1] Verify overdue status updates on due date change in packages/frontend/src/components/TodoCard.js

**Checkpoint**: At this point, User Story 1 should be fully functional - overdue todos display with color, icon, and label

---

## Phase 4: User Story 2 - Clear Overdue Indicator (Priority: P2)

**Goal**: Overdue indicators are unmistakable and follow established design patterns, accessible in both themes and screen sizes

**Independent Test**: Show interface to users, verify they identify overdue items without explanation; test in light/dark modes and various screen sizes

### Tests for User Story 2

- [x] T018 [P] [US2] Visual regression test for overdue indicators in light mode in packages/frontend/src/components/__tests__/TodoCard.test.js
- [x] T019 [P] [US2] Visual regression test for overdue indicators in dark mode in packages/frontend/src/components/__tests__/TodoCard.test.js
- [x] T020 [P] [US2] Accessibility test for screen reader announcement in packages/frontend/src/components/__tests__/TodoCard.test.js

### Implementation for User Story 2

- [x] T021 [P] [US2] Define danger color variables for light mode in packages/frontend/src/styles/theme.css
- [x] T022 [P] [US2] Define danger color variables for dark mode in packages/frontend/src/styles/theme.css
- [x] T023 [US2] Update TodoCard styles to use theme danger colors in packages/frontend/src/components/TodoCard.css
- [x] T024 [US2] Ensure warning icon color adapts to theme in packages/frontend/src/components/TodoCard.js
- [x] T025 [US2] Add responsive styling for overdue indicators in packages/frontend/src/components/TodoCard.css
- [x] T026 [US2] Verify WCAG AA color contrast compliance for overdue indicators in both themes
- [x] T027 [US2] Test screen reader aria-label announcement with actual screen reader tools

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - overdue indicators are clear and accessible

---

## Phase 5: User Story 3 - Overdue Duration Context (Priority: P3)

**Goal**: Display how long a task has been overdue (e.g., "Overdue by 1 day") as secondary text near due date

**Independent Test**: Create todos with various past due dates, verify system displays correct duration text in human-readable format

### Tests for User Story 3

- [x] T028 [P] [US3] Unit test for calculateOverdueDuration function in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [x] T029 [P] [US3] Unit test for duration display formatting in packages/frontend/src/components/__tests__/TodoCard.test.js
- [x] T030 [P] [US3] Integration test for various overdue durations in packages/frontend/src/__tests__/App.test.js

### Implementation for User Story 3

- [x] T031 [P] [US3] Implement calculateOverdueDuration function in packages/frontend/src/utils/dateUtils.js
- [x] T032 [P] [US3] Implement formatOverdueDuration helper for human-readable text in packages/frontend/src/utils/dateUtils.js
- [x] T033 [US3] Add overdue duration display below due date in packages/frontend/src/components/TodoCard.js
- [x] T034 [US3] Style duration text as secondary text in packages/frontend/src/components/TodoCard.css
- [x] T035 [US3] Handle edge cases (leap years, month boundaries) in duration calculation
- [x] T036 [US3] Verify duration display updates when date changes in packages/frontend/src/components/TodoCard.js

**Checkpoint**: All user stories should now be independently functional - full overdue feature complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T037 [P] Update README.md with overdue feature documentation
- [x] T038 [P] Add JSDoc comments to dateUtils functions in packages/frontend/src/utils/dateUtils.js
- [x] T039 Code review for DRY violations across overdue implementation
- [x] T040 Performance testing with 1000+ todo items to verify SC-005 (instant calculation)
- [x] T041 [P] Verify ESLint passes with no warnings
- [x] T042 [P] Run full test suite and verify 80%+ coverage maintained
- [x] T043 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [x] T044 Manual accessibility testing with keyboard navigation
- [x] T045 Verify all edge cases from spec.md (timezone changes, midnight transitions, etc.)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories ✅ INDEPENDENT
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 but can be tested independently ✅ INDEPENDENT
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Adds to US1 but can be tested independently ✅ INDEPENDENT

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Utility functions before components
- Component logic before styling
- Core implementation before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 2 Foundational**: All tasks marked [P] can run in parallel
- T004 (dateUtils.js), T005 (theme.css), T006 (fixtures) are independent

**Phase 3 User Story 1 Tests**: All marked [P] can run in parallel
- T007 (dateUtils test), T008 (TodoCard test), T009 (App test)

**Phase 3 User Story 1 Implementation**: Tasks T010 and T011 can run in parallel
- T010 (dateUtils.js) and T011 (TodoCard.css) are independent files

**Phase 4 User Story 2 Tests**: All marked [P] can run in parallel
- T018, T019, T020 are independent tests

**Phase 4 User Story 2 Implementation**: T021 and T022 can run in parallel
- Light mode and dark mode color definitions

**Phase 5 User Story 3 Tests**: All marked [P] can run in parallel
- T028, T029, T030 are independent tests

**Phase 5 User Story 3 Implementation**: T031 and T032 can run in parallel
- Both utility functions in dateUtils.js (different functions)

**Phase 6 Polish**: Several tasks can run in parallel
- T037 (README), T038 (JSDoc), T041 (ESLint), T042 (coverage)

**Cross-Story Parallelism**: Once Phase 2 completes, US1, US2, and US3 can all proceed in parallel with different developers

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for isOverdue function in packages/frontend/src/utils/__tests__/dateUtils.test.js"
Task: "Unit test for overdue todo rendering in packages/frontend/src/components/__tests__/TodoCard.test.js"
Task: "Integration test for overdue visual indicators in packages/frontend/src/__tests__/App.test.js"

# After tests fail, launch these implementation tasks in parallel:
Task: "Implement isOverdue function in packages/frontend/src/utils/dateUtils.js"
Task: "Add overdue styling classes to packages/frontend/src/components/TodoCard.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T006) - CRITICAL
3. Complete Phase 3: User Story 1 (T007-T017)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo basic overdue detection with visual indicators

**MVP Delivers**: Users can see which todos are overdue with danger color, warning icon, and "OVERDUE" label

### Incremental Delivery

1. Complete Setup + Foundational → Date utilities and theme ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! Core overdue detection)
3. Add User Story 2 → Test independently → Deploy/Demo (Enhanced accessibility and theme support)
4. Add User Story 3 → Test independently → Deploy/Demo (Duration context for prioritization)
5. Complete Polish → Final production-ready release

### Parallel Team Strategy

With multiple developers after Foundational phase completes:

- **Developer A**: User Story 1 (T007-T017) - Core overdue detection
- **Developer B**: User Story 2 (T018-T027) - Accessibility and theming
- **Developer C**: User Story 3 (T028-T036) - Duration context

Stories complete and integrate independently without conflicts.

---

## Summary

- **Total Tasks**: 45 tasks
- **User Story 1 (P1)**: 11 tasks (3 tests + 8 implementation)
- **User Story 2 (P2)**: 10 tasks (3 tests + 7 implementation)
- **User Story 3 (P3)**: 9 tasks (3 tests + 6 implementation)
- **Setup/Foundation**: 6 tasks
- **Polish**: 9 tasks
- **Parallel Opportunities**: 24 tasks marked [P] can run in parallel within their phase
- **MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 20 tasks

---

## Notes

- [P] tasks = different files or different functions, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Tests written first (TDD approach) per constitution requirement
- All tasks follow coding guidelines: DRY, KISS, SOLID principles
- 80%+ test coverage target maintained per constitution
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
