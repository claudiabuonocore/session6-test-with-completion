/**
 * Date utility functions for todo date operations
 * All calculations use client's local timezone per specification
 */

/**
 * Check if a todo item is overdue
 * @param {string} dueDate - ISO date string (YYYY-MM-DD)
 * @param {boolean} completed - Whether the todo is completed
 * @returns {boolean} True if overdue (past due and not completed)
 */
export function isOverdue(dueDate, completed) {
  // Not overdue if no due date or already completed
  if (!dueDate || completed) {
    return false;
  }

  // Get current date in client's local timezone (date only, no time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse due date (assumes YYYY-MM-DD format from backend)
  const due = new Date(dueDate + 'T00:00:00');
  
  // Overdue if due date is before today
  return due < today;
}

/**
 * Calculate how many days a todo is overdue
 * @param {string} dueDate - ISO date string (YYYY-MM-DD)
 * @returns {number} Number of days overdue (0 if not overdue)
 */
export function calculateOverdueDuration(dueDate) {
  if (!dueDate) {
    return 0;
  }

  // Get current date in client's local timezone (date only, no time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse due date
  const due = new Date(dueDate + 'T00:00:00');

  // Calculate difference in milliseconds, then convert to days
  const diffMs = today - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Return 0 if not overdue (negative or zero difference)
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Format overdue duration into human-readable text
 * @param {number} days - Number of days overdue
 * @returns {string} Formatted duration text (e.g., "Overdue by 1 day", "Overdue by 2 weeks")
 */
export function formatOverdueDuration(days) {
  if (days === 0) {
    return '';
  }

  if (days === 1) {
    return 'Overdue by 1 day';
  }

  // Less than a week: show days
  if (days < 7) {
    return `Overdue by ${days} days`;
  }

  // 1-4 weeks: show weeks
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    if (weeks === 1) {
      return 'Overdue by 1 week';
    }
    return `Overdue by ${weeks} weeks`;
  }

  // 30+ days: show months
  const months = Math.floor(days / 30);
  if (months === 1) {
    return 'Overdue by 1 month';
  }
  return `Overdue by ${months} months`;
}
