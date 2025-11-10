/**
 * Unit tests for date utility functions
 */

import { isOverdue, calculateOverdueDuration, formatOverdueDuration } from '../dateUtils';

describe('dateUtils', () => {
  describe('isOverdue', () => {
    test('should return true for todo with past due date and not completed', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dueDate = yesterday.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, false)).toBe(true);
      expect(isOverdue(dueDate, 0)).toBe(true);
    });

    test('should return false for todo with due date today', () => {
      const today = new Date();
      const dueDate = today.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, false)).toBe(false);
    });

    test('should return false for todo with future due date', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dueDate = tomorrow.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, false)).toBe(false);
    });

    test('should return false for completed todo even with past due date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dueDate = yesterday.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, true)).toBe(false);
      expect(isOverdue(dueDate, 1)).toBe(false);
    });

    test('should return false for todo without due date', () => {
      expect(isOverdue(null, false)).toBe(false);
      expect(isOverdue(undefined, false)).toBe(false);
      expect(isOverdue('', false)).toBe(false);
    });

    test('should handle edge case of midnight transition', () => {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      const dueDate = today.toISOString().split('T')[0];
      
      // Today's date should not be overdue
      expect(isOverdue(dueDate, false)).toBe(false);
    });
  });

  describe('calculateOverdueDuration', () => {
    test('should return correct number of days for overdue todo', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const dueDate = threeDaysAgo.toISOString().split('T')[0];
      
      expect(calculateOverdueDuration(dueDate)).toBe(3);
    });

    test('should return 0 for todo due today', () => {
      const today = new Date();
      const dueDate = today.toISOString().split('T')[0];
      
      expect(calculateOverdueDuration(dueDate)).toBe(0);
    });

    test('should return 0 for todo due in future', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dueDate = tomorrow.toISOString().split('T')[0];
      
      expect(calculateOverdueDuration(dueDate)).toBe(0);
    });

    test('should return 0 for todo without due date', () => {
      expect(calculateOverdueDuration(null)).toBe(0);
      expect(calculateOverdueDuration(undefined)).toBe(0);
      expect(calculateOverdueDuration('')).toBe(0);
    });
  });

  describe('formatOverdueDuration', () => {
    test('should return empty string for 0 days', () => {
      expect(formatOverdueDuration(0)).toBe('');
    });

    test('should format 1 day correctly', () => {
      expect(formatOverdueDuration(1)).toBe('Overdue by 1 day');
    });

    test('should format multiple days correctly', () => {
      expect(formatOverdueDuration(2)).toBe('Overdue by 2 days');
      expect(formatOverdueDuration(5)).toBe('Overdue by 5 days');
    });

    test('should format 1 week correctly', () => {
      expect(formatOverdueDuration(7)).toBe('Overdue by 1 week');
    });

    test('should format multiple weeks correctly', () => {
      expect(formatOverdueDuration(14)).toBe('Overdue by 2 weeks');
      expect(formatOverdueDuration(21)).toBe('Overdue by 3 weeks');
    });

    test('should format 1 month correctly', () => {
      expect(formatOverdueDuration(30)).toBe('Overdue by 1 month');
      expect(formatOverdueDuration(35)).toBe('Overdue by 1 month');
    });

    test('should format multiple months correctly', () => {
      expect(formatOverdueDuration(60)).toBe('Overdue by 2 months');
      expect(formatOverdueDuration(90)).toBe('Overdue by 3 months');
    });
  });
});
