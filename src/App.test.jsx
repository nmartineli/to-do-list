import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './App';
import { fireEvent, render, screen } from '@testing-library/react';

describe('To do list', () => {
	beforeEach(() => {
		render(<App />);
	});
	it('should render correctly', () => {
		expect(screen.getByPlaceholderText('Adicione uma nova tarefa')).toBeVisible();
		expect(screen.getByText('Criar')).toBeVisible();
		expect(screen.getByText('0 de 0')).toBeVisible();
	});

	it('should show the NoTask component when there are no tasks on the list', () => {
		expect(screen.getByText('Você ainda não tem tarefas cadastradas')).toBeVisible();
		expect(screen.getByText('Crie tarefas e organize seus itens a fazer')).toBeVisible();
	});

	it('should update the number of created tasks when a new task is added', () => {
		const createdTasks = screen.getByTestId('created-tasks');
		const taskInput = screen.getByRole('textbox');
		const createButton = screen.getByText(/Criar/i);

		fireEvent.change(taskInput, {
			target: { value: 'Tarefa 1' },
		});

		fireEvent.click(createButton);

		expect(createdTasks).toHaveTextContent(1);

		fireEvent.change(taskInput, {
			target: { value: 'Tarefa 2' },
		});

		fireEvent.click(createButton);

		expect(createdTasks).toHaveTextContent(2);
	});

	it('when a task is added to the list of tasks, it should be added to the list of tasks and the input should be cleared', () => {
		const taskInput = screen.getByRole('textbox');
		const createButton = screen.getByText(/Criar/i);

		fireEvent.change(taskInput, {
			target: { value: 'Texto da tarefa 1' },
		});

		fireEvent.click(createButton);

		const tasktText = screen.getByTestId('task-text');

		expect(screen.getByText(/texto da tarefa 1/i)).toBeVisible();
		expect(screen.getByTestId('done-task-button')).not.toBeChecked();
		expect(tasktText).not.toHaveStyle('text-decoration: line-through');
		expect(taskInput).toHaveTextContent('');
	});

	it('when a task is checked done, its text should be crossed out', () => {
		const taskInput = screen.getByRole('textbox');
		const createButton = screen.getByText(/Criar/i);
		const doneTasks = screen.getByTestId('done-tasks');

		fireEvent.change(taskInput, {
			target: { value: 'Texto da tarefa 1' },
		});

		fireEvent.click(createButton);
		expect(doneTasks).toHaveTextContent('0 de 1');

		const doneButton = screen.getByTestId('done-task-button');
		const tasktText = screen.getByTestId('task-text');

		fireEvent.click(doneButton);

		expect(tasktText).toHaveStyle('text-decoration: line-through');
		expect(doneTasks).toHaveTextContent('1 de 1');
	});
	it('should remove the task from the list when it is deleted and update the number of tasks available', () => {
		const createdTasks = screen.getByTestId('created-tasks');
		const taskInput = screen.getByRole('textbox');
		const createButton = screen.getByText(/Criar/i);

		fireEvent.change(taskInput, {
			target: { value: 'Tarefa 1' },
		});

		fireEvent.click(createButton);

		fireEvent.change(taskInput, {
			target: { value: 'Tarefa 2' },
		});

		fireEvent.click(createButton);

		expect(createdTasks).toHaveTextContent('2');

		const deleteButtons = screen.getAllByTestId('delete-task-button');

		fireEvent.click(deleteButtons[0]);

		expect(screen.queryByText(/tarefa 1/i)).not.toBeInTheDocument();
		expect(createdTasks).toHaveTextContent('1');
	});
});
