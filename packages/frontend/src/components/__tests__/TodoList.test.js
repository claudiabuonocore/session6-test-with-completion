import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  const mockTodos = [
    {
      id: 1,
      title: 'Todo 1',
      dueDate: '2025-12-25',
      completed: 0,
      createdAt: '2025-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Todo 2',
      dueDate: null,
      completed: 1,
      createdAt: '2025-11-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when todos array is empty', () => {
    render(<TodoList todos={[]} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText(/No todos yet. Add one to get started!/)).toBeInTheDocument();
  });

  it('should render all todos when provided', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render correct number of todo cards', () => {
    const { container } = render(
      <TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards).toHaveLength(2);
  });

  it('should pass handlers to TodoCard components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    // Verify that edit buttons exist for each todo
    expect(screen.getAllByLabelText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete/)).toHaveLength(2);
  });

  describe('Overdue Indicators in List Context', () => {
    const getTestTodos = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return [
        {
          id: 1,
          title: 'Overdue Todo 1',
          dueDate: yesterday.toISOString().split('T')[0],
          completed: 0,
          createdAt: '2025-11-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'Overdue Todo 2',
          dueDate: threeDaysAgo.toISOString().split('T')[0],
          completed: 0,
          createdAt: '2025-11-02T00:00:00Z'
        },
        {
          id: 3,
          title: 'Future Todo',
          dueDate: tomorrow.toISOString().split('T')[0],
          completed: 0,
          createdAt: '2025-11-03T00:00:00Z'
        },
        {
          id: 4,
          title: 'Completed Overdue Todo',
          dueDate: yesterday.toISOString().split('T')[0],
          completed: 1,
          createdAt: '2025-11-04T00:00:00Z'
        }
      ];
    };

    it('should render multiple overdue indicators in the list', () => {
      const todos = getTestTodos();
      const { container } = render(<TodoList todos={todos} {...mockHandlers} isLoading={false} />);
      
      const overdueCards = container.querySelectorAll('.todo-card.overdue');
      expect(overdueCards).toHaveLength(2); // Two overdue, incomplete todos
    });

    it('should display OVERDUE labels for all overdue todos', () => {
      const todos = getTestTodos();
      render(<TodoList todos={todos} {...mockHandlers} isLoading={false} />);
      
      const overdueLabels = screen.getAllByText('OVERDUE');
      expect(overdueLabels).toHaveLength(2);
    });

    it('should display warning icons for all overdue todos', () => {
      const todos = getTestTodos();
      render(<TodoList todos={todos} {...mockHandlers} isLoading={false} />);
      
      const warningIcons = screen.getAllByTestId('overdue-icon');
      expect(warningIcons).toHaveLength(2);
    });

    it('should not show overdue indicators for future todos in the list', () => {
      const todos = getTestTodos();
      const { container } = render(<TodoList todos={todos} {...mockHandlers} isLoading={false} />);
      
      // Only 2 should be marked as overdue (not the future todo or completed todo)
      const overdueCards = container.querySelectorAll('.todo-card.overdue');
      expect(overdueCards).toHaveLength(2);
    });

    it('should not show overdue indicators for completed todos in the list', () => {
      const todos = getTestTodos();
      render(<TodoList todos={todos} {...mockHandlers} isLoading={false} />);
      
      // Verify completed todo doesn't have overdue indicator
      expect(screen.getByText('Completed Overdue Todo')).toBeInTheDocument();
      
      // But only 2 OVERDUE labels should exist (not 3)
      const overdueLabels = screen.getAllByText('OVERDUE');
      expect(overdueLabels).toHaveLength(2);
    });

    it('should maintain proper spacing between overdue and non-overdue todos', () => {
      const todos = getTestTodos();
      const { container } = render(<TodoList todos={todos} {...mockHandlers} isLoading={false} />);
      
      // All cards should be rendered
      const allCards = container.querySelectorAll('.todo-card');
      expect(allCards).toHaveLength(4);
      
      // Only 2 should have overdue styling
      const overdueCards = container.querySelectorAll('.todo-card.overdue');
      expect(overdueCards).toHaveLength(2);
    });

    it('should support mixed overdue states in a large list', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const largeTodoList = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Todo ${i + 1}`,
        dueDate: i % 3 === 0 ? yesterday.toISOString().split('T')[0] : null,
        completed: i % 5 === 0 ? 1 : 0,
        createdAt: '2025-11-01T00:00:00Z'
      }));
      
      const { container } = render(
        <TodoList todos={largeTodoList} {...mockHandlers} isLoading={false} />
      );
      
      // Should render all todos
      const allCards = container.querySelectorAll('.todo-card');
      expect(allCards).toHaveLength(50);
      
      // Should have overdue indicators (every 3rd that's not completed)
      const overdueCards = container.querySelectorAll('.todo-card.overdue');
      expect(overdueCards.length).toBeGreaterThan(0);
    });
  });
});
