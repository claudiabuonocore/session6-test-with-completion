import React, { useState } from 'react';
import { isOverdue, calculateOverdueDuration, formatOverdueDuration } from '../utils/dateUtils';
import './TodoCard.css';

/**
 * TodoCard Component
 * Displays a single todo item with editing capabilities and overdue indicators
 * 
 * Features:
 * - Visual overdue indicators (color, icon, label) for past due incomplete todos
 * - Overdue duration display (e.g., "Overdue by 3 days")
 * - Inline editing of title and due date
 * - Accessible with screen reader support (aria-labels)
 * - Theme-aware styling (light/dark mode)
 * - Responsive design (mobile/tablet/desktop)
 * 
 * @param {Object} props - Component props
 * @param {Object} props.todo - Todo object with id, title, dueDate, completed, createdAt
 * @param {Function} props.onToggle - Callback to toggle todo completion status
 * @param {Function} props.onEdit - Callback to edit todo (title, dueDate)
 * @param {Function} props.onDelete - Callback to delete todo
 * @param {boolean} props.isLoading - Whether an operation is in progress
 */
function TodoCard({ todo, onToggle, onEdit, onDelete, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editError, setEditError] = useState(null);

  const handleToggle = async () => {
    try {
      await onToggle(todo.id);
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditError(null);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDueDate(todo.dueDate || '');
    setEditError(null);
  };

  const handleEditSubmit = async () => {
    if (!editTitle.trim()) {
      setEditError('Title cannot be empty');
      return;
    }

    if (editTitle.length > 255) {
      setEditError('Title cannot exceed 255 characters');
      return;
    }

    try {
      await onEdit(todo.id, editTitle.trim(), editDueDate || null);
      setIsEditing(false);
      setEditError(null);
    } catch (err) {
      setEditError(err.message || 'Failed to update todo');
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this todo? This action cannot be undone.')) {
      onDelete(todo.id);
    }
  };

  /**
   * Format ISO date string to human-readable format
   * @param {string} dateString - ISO date string (YYYY-MM-DD)
   * @returns {string|null} Formatted date (e.g., "December 25, 2025") or null if no date
   */
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate overdue status
  const todoIsOverdue = isOverdue(todo.dueDate, todo.completed);
  const overdueDays = todoIsOverdue ? calculateOverdueDuration(todo.dueDate) : 0;
  const overdueDurationText = overdueDays > 0 ? formatOverdueDuration(overdueDays) : '';

  if (isEditing) {
    return (
      <div className="todo-card todo-card-edit">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            maxLength={255}
            className="form-input"
            placeholder="Todo title"
            disabled={isLoading}
            aria-label="Edit todo title"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="form-input"
            disabled={isLoading}
            aria-label="Edit due date"
          />
          <div className="edit-actions">
            <button
              onClick={handleEditSubmit}
              disabled={isLoading}
              className="btn btn-primary btn-sm"
            >
              Save
            </button>
            <button
              onClick={handleEditCancel}
              disabled={isLoading}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
          </div>
          {editError && <div className="form-error">{editError}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''} ${todoIsOverdue ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed === 1}
        onChange={handleToggle}
        disabled={isLoading}
        className="todo-checkbox"
        aria-label={
          todoIsOverdue
            ? `Overdue: "${todo.title}", due ${formatDate(todo.dueDate)}. Mark as ${todo.completed ? 'incomplete' : 'complete'}`
            : `Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`
        }
      />

      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.dueDate && (
          <div>
            <p className="todo-due-date">
              Due: {formatDate(todo.dueDate)}
            </p>
            {todoIsOverdue && (
              <div className="overdue-indicator">
                <span className="overdue-icon" data-testid="overdue-icon" aria-hidden="true">
                  ⚠
                </span>
                <span className="overdue-label">OVERDUE</span>
              </div>
            )}
            {overdueDurationText && (
              <p className="overdue-duration">{overdueDurationText}</p>
            )}
          </div>
        )}
      </div>

      <div className="todo-actions">
        <button
          onClick={handleEditClick}
          disabled={isLoading}
          className="btn-icon btn-edit"
          title="Edit todo"
          aria-label={`Edit "${todo.title}"`}
        >
          ✎
        </button>
        <button
          onClick={handleDeleteClick}
          disabled={isLoading}
          className="btn-icon btn-delete"
          title="Delete todo"
          aria-label={`Delete "${todo.title}"`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
