import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Todo from './Todo'

describe('Todo component', () => {
  const mockTodo = {
    _id: '123',
    text: 'Learn React',
    done: false
  }

  it('renders todo text', () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  it('renders "not done" status for incomplete todo', () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })

  it('renders "done" status for completed todo', () => {
    const completedTodo = { ...mockTodo, done: true }
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(<Todo todo={completedTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })

  it('shows "Set as done" button for incomplete todo', () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  it('does not show "Set as done" button for completed todo', () => {
    const completedTodo = { ...mockTodo, done: true }
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(<Todo todo={completedTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
  })

  it('calls deleteTodo when Delete button is clicked', async () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()
    const user = userEvent.setup()

    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledTimes(1)
    expect(mockDelete).toHaveBeenCalledWith(mockTodo)
  })

  it('calls completeTodo when Set as done button is clicked', async () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()
    const user = userEvent.setup()

    render(<Todo todo={mockTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    const completeButton = screen.getByText('Set as done')
    await user.click(completeButton)

    expect(mockComplete).toHaveBeenCalledTimes(1)
    expect(mockComplete).toHaveBeenCalledWith(mockTodo)
  })
})
