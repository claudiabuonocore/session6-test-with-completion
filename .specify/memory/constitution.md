<!--
===================================================================================
SYNC IMPACT REPORT - Constitution Update
===================================================================================
Version Change: Initial Version → 1.0.0
Ratification Date: 2025-11-10
Last Amended: 2025-11-10

Principles Established:
- Code Quality & Maintainability (DRY, KISS, SOLID)
- Comprehensive Testing (TDD, 80%+ coverage)
- Consistent Code Style (formatting, naming, organization)
- Structured Architecture (monorepo, separation of concerns)
- Clear Documentation (meaningful comments, JSDoc)
- Robust Error Handling (graceful failures, user feedback)

Added Sections:
- Core Principles (6 principles)
- Development Standards (technical constraints)
- Quality Gates (pre-commit requirements)
- Governance (amendment process, compliance)

Templates Requiring Updates:
- ✅ plan-template.md - Constitution Check section aligns with all principles
- ✅ spec-template.md - User stories and requirements compatible with testing principle
- ✅ tasks-template.md - Task structure supports TDD workflow and parallel execution

Follow-up TODOs: None - all placeholders filled with concrete values from existing documentation

Source Documentation:
- docs/coding-guidelines.md
- docs/testing-guidelines.md
- docs/functional-requirements.md
- docs/ui-guidelines.md
- docs/project-overview.md

===================================================================================
-->

# Todo App Constitution

## Core Principles

### I. Code Quality & Maintainability

Every contribution MUST prioritize long-term maintainability over short-term convenience. Code quality is enforced through:

- **DRY (Don't Repeat Yourself)**: Extract common code into shared functions or utilities. When the same code appears in multiple places, it MUST be refactored into a reusable component or utility function.

- **KISS (Keep It Simple, Stupid)**: Prefer simple, straightforward implementations over complex ones. Code MUST be easy to understand at first glance. Avoid premature optimization.

- **SOLID Principles**:
  - Single Responsibility: Each module/component has one reason to change
  - Open/Closed: Open for extension, closed for modification
  - Liskov Substitution: Subtypes must be substitutable for parent types
  - Interface Segregation: Don't pass unnecessary props to components
  - Dependency Inversion: Depend on abstractions, not concrete implementations

**Rationale**: Maintainable code reduces technical debt, accelerates future development, and enables team scalability. These principles ensure code remains readable and modifiable as the project evolves.

### II. Comprehensive Testing (NON-NEGOTIABLE)

Testing is mandatory and MUST achieve 80%+ code coverage across all packages. The testing strategy includes:

- **Test-Driven Development**: Tests MUST be written as part of the development process. Tests describe expected behavior before or alongside implementation.

- **Test Types Required**:
  - Unit tests for individual components and functions
  - Integration tests for component interactions and API communication
  - End-to-end tests for critical user workflows (future scope)

- **Test Quality Standards**:
  - Test behavior, not implementation details
  - Tests MUST be independent and not rely on other tests
  - Mock external dependencies (API calls, timers, etc.)
  - Use descriptive test names that explain what is being tested
  - Follow Arrange-Act-Assert (AAA) pattern

- **Test Organization**: Tests MUST be stored in `__tests__/` directories colocated with source files using `{filename}.test.js` naming convention.

**Rationale**: Comprehensive testing ensures code quality, catches regressions early, documents expected behavior, and enables confident refactoring. The 80% coverage target balances thoroughness with development velocity.

### III. Consistent Code Style

All code MUST follow consistent formatting and naming conventions to maintain readability across the codebase:

- **Formatting**:
  - 2 spaces for indentation (JavaScript, JSON, CSS, Markdown)
  - Lines under 100 characters for code
  - LF (Unix-style) line endings
  - No trailing whitespace

- **Naming Conventions**:
  - `camelCase` for variables and function names
  - `UPPER_SNAKE_CASE` for constants
  - `PascalCase` for React components and classes
  - File names MUST match component names

- **Import Organization** (in order):
  1. External libraries (Node.js, npm packages)
  2. Internal modules (project imports)
  3. Styles (CSS imports)
  - Separate groups with blank lines

- **Code Organization**:
  - Imports at the top
  - Constants
  - Utility functions
  - Main component/class
  - Helper functions
  - Exports at the bottom

- **Linting**: ESLint MUST pass with no errors or warnings before committing code.

**Rationale**: Consistent style eliminates cognitive overhead, enables faster code review, and prevents style-related conflicts in version control.

### IV. Structured Architecture

The project follows a monorepo structure with clear separation of concerns:

- **Monorepo Structure**:
  - `packages/frontend/`: React-based web application
  - `packages/backend/`: Express.js API server
  - npm workspaces manage dependencies

- **Frontend Organization**:
  - `components/`: Reusable UI components with colocated tests
  - `services/`: API services and business logic
  - `utils/`: Utility functions
  - `__tests__/`: Integration and setup tests

- **Backend Organization**:
  - `routes/`: Express route handlers
  - `controllers/`: Business logic
  - `services/`: Data access layer
  - `middleware/`: Express middleware
  - `__tests__/`: Tests

- **Single Responsibility**: Each module, component, or function MUST have a single, well-defined responsibility. A `TodoCard` component should only display a todo, not fetch or delete it.

**Rationale**: Clear architecture enables team scalability, parallel development, and maintainable separation between frontend, backend, and business logic layers.

### V. Clear Documentation

Code MUST be self-documenting with strategic use of comments and documentation:

- **Comment Guidelines**:
  - Comment "why", not "what" the code does
  - Avoid obvious comments that restate code
  - Keep comments updated when code changes (outdated comments are worse than no comments)
  - Use JSDoc for public functions and components

- **JSDoc Requirements**: Public functions MUST include:
  - Description of purpose
  - Parameter types and descriptions
  - Return type and description

- **Documentation Updates**: README files and documentation MUST be updated when functionality changes.

**Rationale**: Clear documentation reduces onboarding time, prevents misunderstandings, and preserves intent for future maintainers. Self-documenting code with strategic comments is more maintainable than over-commented code.

### VI. Robust Error Handling

All operations that can fail MUST handle errors gracefully:

- **Try-Catch Requirements**: Wrap operations that can fail (API calls, file operations, parsing) in try-catch blocks.

- **Error Messages**: Provide clear, actionable error messages to users. Include context about what failed and how to resolve it.

- **User Feedback**: Inform users when operations fail. Don't fail silently.

- **Logging**: Log errors with sufficient context for debugging (error message, stack trace, relevant data).

**Rationale**: Graceful error handling improves user experience, simplifies debugging, and prevents cascading failures. Users should never see unhandled exceptions or cryptic error messages.

## Development Standards

### Technology Stack

**Mandatory Technologies**:
- Frontend: React with React DOM
- Backend: Node.js with Express.js
- Testing: Jest (frontend and backend)
- Package Management: npm workspaces

**Language**: JavaScript (ES6+)

**Performance Targets**:
- Desktop-focused UI (no specific mobile optimization required)
- Reasonable component render times
- Efficient algorithms and data structures

**Constraints**:
- Single-user application (no authentication required)
- Backend persistence required for all data changes
- No database schema changes beyond basic todo storage

### File Organization Requirements

- Tests MUST be colocated with source files in `__tests__/` directories
- Components MUST have accompanying test files
- Related code MUST be grouped together
- Follow established directory structures for frontend and backend

## Quality Gates

### Pre-Commit Requirements

Before committing code, developers MUST verify:

1. **Linting**: No ESLint errors or warnings
2. **Testing**: All tests pass locally
3. **Formatting**: Code follows formatting standards
4. **Naming**: Variables, functions, and files follow naming conventions
5. **DRY**: No code duplication
6. **Single Responsibility**: Functions/components have clear, single purposes
7. **Error Handling**: Operations that can fail have try-catch blocks
8. **Comments**: Comments are clear, updated, and explain "why"
9. **Tests Written**: New functionality has accompanying tests
10. **Git Practices**: Commits are atomic with clear messages
11. **Console Statements**: No console.log statements in production code

### Pull Request Requirements

Pull requests MUST:

- Pass all automated tests
- Include tests for new functionality
- Follow the established coding guidelines
- Include clear description of changes
- Reference related issues or requirements
- Be reviewed by at least one other developer

## Governance

### Amendment Process

This constitution supersedes all other development practices. Amendments require:

1. **Proposal**: Document proposed changes with rationale
2. **Review**: Team review and approval
3. **Migration Plan**: Plan for updating existing code if needed
4. **Documentation Update**: Update this constitution and related templates
5. **Version Increment**: Follow semantic versioning for constitution changes:
   - MAJOR: Backward incompatible governance changes or principle removals
   - MINOR: New principle added or materially expanded guidance
   - PATCH: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Verification

All pull requests and code reviews MUST verify compliance with these principles. Complexity that violates principles MUST be justified with:

- Specific problem being solved
- Why simpler alternatives are insufficient
- Plan to simplify in the future if possible

### Version Control Integration

- Feature branches follow naming convention: `feature/[feature-name]`
- Commit messages follow conventional commit format
- Atomic commits represent single logical changes

### Documentation References

For detailed guidance during development, refer to:

- `docs/coding-guidelines.md`: Detailed coding standards and examples
- `docs/testing-guidelines.md`: Comprehensive testing strategy and practices
- `docs/functional-requirements.md`: Product requirements and features
- `docs/ui-guidelines.md`: Design system and UI specifications
- `docs/project-overview.md`: Architecture and project structure

---

**Version**: 1.0.0 | **Ratified**: 2025-11-10 | **Last Amended**: 2025-11-10
