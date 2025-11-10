# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Created**: November 10, 2025  
**Status**: Draft  
**Input**: User description: "Support for Overdue Todo Items - Users need a clear, visual way to identify which todos have not been completed by their due date."

## Clarifications

### Session 2025-11-10

- Q: Visual Treatment for Overdue Todos → A: All Three - Color + Icon + "OVERDUE" label for maximum clarity
- Q: Timezone Handling for Overdue Calculation → A: Use client's local date/time for all comparisons (user's timezone)
- Q: Overdue Duration Display Location → A: Display duration below/near the due date field as secondary text
- Q: Large List Performance Behavior → A: Calculate on render per item
- Q: Accessibility - Screen Reader Announcement → A: aria-label with overdue status

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Identification of Overdue Todos (Priority: P1)

Users need to immediately identify which todo items are overdue when viewing their todo list. The application should automatically compare each todo's due date against the current date and visually distinguish overdue items without requiring manual date comparison.

**Why this priority**: This is the core functionality that delivers immediate user value. Without visual distinction, users cannot quickly prioritize overdue tasks, defeating the purpose of having due dates.

**Independent Test**: Can be fully tested by creating todos with past due dates, viewing the list, and verifying that overdue items are visually distinct from non-overdue items. Delivers value by enabling instant recognition of past-due tasks.

**Acceptance Scenarios**:

1. **Given** I have a todo with a due date of yesterday and the todo is not completed, **When** I view my todo list, **Then** the overdue todo displays danger color styling, a warning icon, and an "OVERDUE" label

2. **Given** I have a todo with a due date of today, **When** I view my todo list, **Then** the todo is NOT marked as overdue

3. **Given** I have a todo with a due date in the future, **When** I view my todo list, **Then** the todo is NOT marked as overdue

4. **Given** I have a todo that was overdue but I just marked it as completed, **When** I view my todo list, **Then** the completed todo is NOT visually marked as overdue

5. **Given** I have a todo without a due date, **When** I view my todo list, **Then** the todo is NOT marked as overdue

---

### User Story 2 - Clear Overdue Indicator (Priority: P2)

Users should understand at a glance what "overdue" means through intuitive visual design. The overdue indicator should be unmistakable and follow established design patterns.

**Why this priority**: While P1 establishes the core functionality, P2 ensures usability and user experience. Users need to understand the meaning of the visual distinction without confusion.

**Independent Test**: Can be tested by showing the interface to users unfamiliar with the application and verifying they can identify overdue items without explanation. Delivers value through intuitive, accessible design.

**Acceptance Scenarios**:

1. **Given** I am viewing my todo list with overdue items, **When** I look at an overdue todo, **Then** I can clearly see danger color styling, a warning icon, AND an "OVERDUE" label that together distinguish it from other todos

2. **Given** I have both light and dark mode enabled at different times, **When** I view overdue todos, **Then** the overdue visual treatment remains clearly visible and distinguishable in both themes

3. **Given** I am viewing the todo list on different screen sizes, **When** I see overdue items, **Then** the overdue indicator is consistently visible and clear on all device sizes

4. **Given** I am using a screen reader, **When** I navigate to an overdue todo item, **Then** the screen reader announces the overdue status along with the task title and due date

---

### User Story 3 - Overdue Duration Context (Priority: P3)

Users may want to understand how long a task has been overdue to better prioritize their work. Showing "how many days overdue" provides additional context for decision-making.

**Why this priority**: This enhances the basic overdue feature with helpful context but is not essential for the core functionality. Users can still identify and act on overdue items without knowing the exact duration.

**Independent Test**: Can be tested by creating todos with various past due dates and verifying the system displays the number of days/weeks/months overdue. Delivers value through enhanced prioritization context.

**Acceptance Scenarios**:

1. **Given** I have an overdue todo that was due 1 day ago, **When** I view the todo, **Then** I see "Overdue by 1 day" displayed as secondary text below or near the due date field

2. **Given** I have an overdue todo that was due 7 days ago, **When** I view the todo, **Then** I see "Overdue by 7 days" or "Overdue by 1 week" displayed as secondary text below or near the due date field

3. **Given** I have an overdue todo that was due 45 days ago, **When** I view the todo, **Then** I see "Overdue by 45 days" or "Overdue by 1 month" displayed as secondary text below or near the due date field

---

### Edge Cases

- System clock changes (daylight saving time, timezone changes): Overdue status recalculates using the current client local time on each page load/refresh
- Todos created with a due date already in the past: Immediately display as overdue when list is viewed
- User views todo list exactly at midnight when a todo becomes overdue: Status reflects current client local date at time of viewing
- Leap years and month-end dates: Duration calculations use standard date arithmetic in client's timezone
- Todo edited to change due date from future to past (or vice versa): Overdue status updates immediately upon save

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST automatically determine if a todo item is overdue by comparing its due date to the current date using the client's local timezone
- **FR-002**: System MUST mark a todo as overdue if its due date is before the current date AND the todo is not marked as completed
- **FR-003**: System MUST NOT mark a todo as overdue if the due date is today or in the future
- **FR-004**: System MUST NOT mark completed todos as overdue, regardless of their due date
- **FR-005**: System MUST NOT mark todos without a due date as overdue
- **FR-006**: System MUST apply three distinct visual indicators to overdue todos: danger color styling (red/orange), a warning icon, and an "OVERDUE" text label
- **FR-007**: System MUST ensure overdue visual indicators are visible and distinguishable in both light and dark mode themes
- **FR-007a**: System MUST include aria-label attributes on overdue todo items to announce overdue status to screen readers (e.g., "Overdue: [Task title], due [date]")
- **FR-008**: System MUST calculate overdue status for each todo item at render time by comparing the due date to the current date
- **FR-009**: System MUST remove overdue visual indicators immediately when a todo is marked as completed
- **FR-010**: System MUST remove overdue visual indicators immediately when a todo's due date is updated to a future date
- **FR-011**: System MUST display overdue duration text (e.g., "Overdue by X days") as secondary text positioned below or near the due date field when applicable

### Key Entities

- **Todo Item**: Represents a task with attributes including title, due date (optional), completion status, and creation date. The overdue status is derived by comparing due date to current date when the todo is incomplete.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify overdue todos within 2 seconds of viewing the todo list without needing to manually check dates
- **SC-002**: 95% of users correctly identify which todos are overdue in usability testing without explanation
- **SC-003**: Overdue visual indicators render consistently across all supported browsers and screen sizes
- **SC-004**: System accurately calculates overdue status for 100% of todos based on current date comparison
- **SC-005**: Overdue status calculates instantly during render for lists up to 1000 items without perceptible delay

## Assumptions

- The system has access to the current date and time from the client's device in the user's local timezone
- Due dates are stored with sufficient precision to determine if they are in the past (date-level precision is sufficient)
- Overdue calculations are performed client-side using the browser's local date/time
- Typical todo lists contain fewer than 1000 items; performance optimization beyond simple date comparison per item is not required
- The existing todo application already supports due dates on todo items
- Users understand the concept of "due dates" and "overdue" in the context of task management
- The application's light and dark mode themes are already implemented
- Standard web accessibility guidelines will be followed for color contrast and visual indicators
- Screen reader compatibility is required; overdue status must be programmatically accessible via ARIA attributes
