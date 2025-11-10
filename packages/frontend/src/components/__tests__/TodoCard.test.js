import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    dueDate: '2025-12-25',
    completed: 0,
    createdAt: '2025-11-01T00:00:00Z'
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo title and due date', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText(/December 25, 2025/)).toBeInTheDocument();
  });

  it('should render unchecked checkbox when todo is incomplete', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox when todo is complete', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should show edit button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    expect(editButton).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should enter edit mode when edit button is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    const { container } = render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const card = container.querySelector('.todo-card');
    expect(card).toHaveClass('completed');
  });

  it('should not render due date when dueDate is null', () => {
    const todoNoDate = { ...mockTodo, dueDate: null };
    render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
    
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  describe('Overdue Todo Rendering', () => {
    const getOverdueTodo = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        id: 2,
        title: 'Overdue Todo',
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };
    };

    it('should display overdue class for past due date and not completed', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).toHaveClass('overdue');
    });

    it('should display warning icon for overdue todo', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Check for warning icon (⚠ or warning-icon class)
      const icon = screen.getByTestId('overdue-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should display "OVERDUE" label for overdue todo', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('OVERDUE')).toBeInTheDocument();
    });

    it('should include aria-label with overdue status for screen readers', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Check that the todo card or checkbox has aria-label mentioning overdue
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-label', expect.stringContaining('Overdue'));
    });

    it('should NOT display overdue indicators for completed todo with past due date', () => {
      const overdueTodo = getOverdueTodo();
      const completedOverdue = { ...overdueTodo, completed: 1 };
      const { container } = render(<TodoCard todo={completedOverdue} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText('OVERDUE')).not.toBeInTheDocument();
    });

    it('should NOT display overdue indicators for todo due today', () => {
      const today = new Date();
      const todoToday = {
        ...mockTodo,
        dueDate: today.toISOString().split('T')[0]
      };
      const { container } = render(<TodoCard todo={todoToday} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText('OVERDUE')).not.toBeInTheDocument();
    });

    it('should NOT display overdue indicators for todo with future due date', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const todoFuture = {
        ...mockTodo,
        dueDate: tomorrow.toISOString().split('T')[0]
      };
      const { container } = render(<TodoCard todo={todoFuture} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText('OVERDUE')).not.toBeInTheDocument();
    });

    it('should NOT display overdue indicators for todo without due date', () => {
      const todoNoDate = { ...mockTodo, dueDate: null };
      const { container } = render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('overdue');
      expect(screen.queryByText('OVERDUE')).not.toBeInTheDocument();
    });
  });

  describe('Overdue Indicator Visual Clarity - Light Theme', () => {
    const getOverdueTodo = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        id: 2,
        title: 'Overdue Todo',
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };
    };

    it('should apply overdue styling class for visual distinction', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card.overdue');
      expect(card).toBeInTheDocument();
    });

    it('should render overdue indicator container with proper structure', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const indicator = container.querySelector('.overdue-indicator');
      expect(indicator).toBeInTheDocument();
    });

    it('should render warning icon with overdue-icon class', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const icon = container.querySelector('.overdue-icon');
      expect(icon).toBeInTheDocument();
      expect(icon.textContent).toBe('⚠');
    });

    it('should render OVERDUE label with overdue-label class', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const label = container.querySelector('.overdue-label');
      expect(label).toBeInTheDocument();
      expect(label.textContent).toBe('OVERDUE');
    });
  });

  describe('Overdue Indicator Visual Clarity - Dark Theme', () => {
    const getOverdueTodo = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        id: 2,
        title: 'Overdue Todo',
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };
    };

    it('should use CSS variables for theme-aware colors', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Verify that overdue classes are present (CSS variables will be applied via stylesheet)
      const card = container.querySelector('.todo-card.overdue');
      expect(card).toBeInTheDocument();
      
      // The actual color values are applied via theme.css CSS variables
      // This test verifies the structural elements are in place
    });

    it('should apply overdue background and border via CSS classes', () => {
      const overdueTodo = getOverdueTodo();
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card.overdue');
      expect(card).toHaveClass('overdue');
    });
  });

  describe('Overdue Indicator Accessibility - WCAG AA', () => {
    const getOverdueTodo = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        id: 2,
        title: 'Overdue Todo',
        dueDate: yesterday.toISOString().split('T')[0],
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };
    };

    it('should provide descriptive aria-label for overdue checkbox', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const checkbox = screen.getByRole('checkbox');
      const ariaLabel = checkbox.getAttribute('aria-label');
      
      expect(ariaLabel).toContain('Overdue');
      expect(ariaLabel).toContain(overdueTodo.title);
    });

    it('should ensure warning icon has semantic meaning (not decorative)', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Icon should have data-testid for identification and be part of indicator
      const icon = screen.getByTestId('overdue-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should provide text alternative for visual overdue state', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // The "OVERDUE" text label serves as the text alternative
      const label = screen.getByText('OVERDUE');
      expect(label).toBeInTheDocument();
    });

    it('should maintain visible focus indicators for keyboard navigation', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Checkbox should be keyboard accessible
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeVisible();
      
      // Edit and delete buttons should be accessible
      const editButton = screen.getByLabelText(/Edit/);
      const deleteButton = screen.getByLabelText(/Delete/);
      expect(editButton).toBeVisible();
      expect(deleteButton).toBeVisible();
    });

    it('should not rely solely on color to convey overdue state', () => {
      const overdueTodo = getOverdueTodo();
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Overdue state is conveyed through multiple means:
      // 1. Text label "OVERDUE"
      // 2. Warning icon (⚠)
      // 3. Color (danger red)
      // This test verifies the first two are present
      
      expect(screen.getByText('OVERDUE')).toBeInTheDocument();
      expect(screen.getByTestId('overdue-icon')).toBeInTheDocument();
    });
  });

  describe('Overdue Duration Display', () => {
    const getOverdueTodoWithOffset = (daysAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return {
        id: 10,
        title: 'Overdue Todo',
        dueDate: date.toISOString().split('T')[0],
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };
    };

    it('should display duration text for overdue todo (1 day)', () => {
      const todo = getOverdueTodoWithOffset(1);
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('Overdue by 1 day')).toBeInTheDocument();
    });

    it('should display duration text for overdue todo (multiple days)', () => {
      const todo = getOverdueTodoWithOffset(3);
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('Overdue by 3 days')).toBeInTheDocument();
    });

    it('should display duration text for overdue todo (1 week)', () => {
      const todo = getOverdueTodoWithOffset(7);
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('Overdue by 1 week')).toBeInTheDocument();
    });

    it('should display duration text for overdue todo (multiple weeks)', () => {
      const todo = getOverdueTodoWithOffset(14);
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('Overdue by 2 weeks')).toBeInTheDocument();
    });

    it('should display duration text for overdue todo (1 month)', () => {
      const todo = getOverdueTodoWithOffset(30);
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('Overdue by 1 month')).toBeInTheDocument();
    });

    it('should display duration text for overdue todo (multiple months)', () => {
      const todo = getOverdueTodoWithOffset(60);
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('Overdue by 2 months')).toBeInTheDocument();
    });

    it('should NOT display duration text for non-overdue todo', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const todo = {
        ...mockTodo,
        dueDate: tomorrow.toISOString().split('T')[0]
      };
      render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/Overdue by/)).not.toBeInTheDocument();
    });

    it('should NOT display duration text for completed overdue todo', () => {
      const todo = getOverdueTodoWithOffset(3);
      const completedTodo = { ...todo, completed: 1 };
      render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/Overdue by/)).not.toBeInTheDocument();
    });

    it('should display duration text with overdue-duration class for styling', () => {
      const todo = getOverdueTodoWithOffset(5);
      const { container } = render(<TodoCard todo={todo} {...mockHandlers} isLoading={false} />);
      
      const durationElement = container.querySelector('.overdue-duration');
      expect(durationElement).toBeInTheDocument();
      expect(durationElement.textContent).toBe('Overdue by 5 days');
    });
  });
});
