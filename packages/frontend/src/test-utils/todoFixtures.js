/**
 * Test fixtures for todos with various due dates
 * Used across test files for consistent test data
 */

/**
 * Get date string for N days from today
 * @param {number} daysOffset - Positive for future, negative for past
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
function getDateOffset(daysOffset) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

/**
 * Todo with due date yesterday (overdue, not completed)
 */
export const overdueYesterday = {
  id: 1,
  title: 'Overdue todo from yesterday',
  dueDate: getDateOffset(-1),
  completed: 0,
  createdAt: getDateOffset(-7),
};

/**
 * Todo with due date 7 days ago (overdue, not completed)
 */
export const overdueWeek = {
  id: 2,
  title: 'Overdue todo from last week',
  dueDate: getDateOffset(-7),
  completed: 0,
  createdAt: getDateOffset(-14),
};

/**
 * Todo with due date 45 days ago (overdue, not completed)
 */
export const overdueMonth = {
  id: 3,
  title: 'Overdue todo from over a month ago',
  dueDate: getDateOffset(-45),
  completed: 0,
  createdAt: getDateOffset(-60),
};

/**
 * Todo with due date today (NOT overdue)
 */
export const dueToday = {
  id: 4,
  title: 'Todo due today',
  dueDate: getDateOffset(0),
  completed: 0,
  createdAt: getDateOffset(-2),
};

/**
 * Todo with due date tomorrow (NOT overdue)
 */
export const dueTomorrow = {
  id: 5,
  title: 'Todo due tomorrow',
  dueDate: getDateOffset(1),
  completed: 0,
  createdAt: getDateOffset(-1),
};

/**
 * Todo with due date next week (NOT overdue)
 */
export const dueNextWeek = {
  id: 6,
  title: 'Todo due next week',
  dueDate: getDateOffset(7),
  completed: 0,
  createdAt: getDateOffset(-3),
};

/**
 * Todo with no due date (NOT overdue)
 */
export const noDueDate = {
  id: 7,
  title: 'Todo with no due date',
  dueDate: null,
  completed: 0,
  createdAt: getDateOffset(-5),
};

/**
 * Completed todo with past due date (NOT overdue - completed)
 */
export const completedOverdue = {
  id: 8,
  title: 'Completed todo that was overdue',
  dueDate: getDateOffset(-3),
  completed: 1,
  createdAt: getDateOffset(-10),
};

/**
 * All test todos in an array
 */
export const allTestTodos = [
  overdueYesterday,
  overdueWeek,
  overdueMonth,
  dueToday,
  dueTomorrow,
  dueNextWeek,
  noDueDate,
  completedOverdue,
];

/**
 * Only overdue todos (past due and not completed)
 */
export const overdueTodos = [
  overdueYesterday,
  overdueWeek,
  overdueMonth,
];

/**
 * Only non-overdue todos
 */
export const notOverdueTodos = [
  dueToday,
  dueTomorrow,
  dueNextWeek,
  noDueDate,
  completedOverdue,
];
