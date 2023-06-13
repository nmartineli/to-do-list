import { AiOutlinePlusCircle } from 'react-icons/ai';
import Header from './components/Header';
import NoTask from './components/NoTask';
import ListItem from './components/ListItem';
import './global.css';
import styles from './App.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

export interface Task {
	id: string;
	taskText: string;
	isDone: boolean;
}

export function App() {
	const [toDoList, setToDoList] = useState<Task[]>([]);
	const [newTaskText, setNewTaskText] = useState<string>('');

	const handleDeleteTask = (taskToDelete: Task) => {
		const newTaskList = toDoList.filter((task) => {
			return task !== taskToDelete;
		});

		setToDoList(newTaskList);
	};

	const handleTaskDone = (taskDoneId: string) => {
		const updatedTaskList = toDoList.map((task) => (task.id === taskDoneId ? { ...task, isDone: !task.isDone } : task));

		setToDoList(updatedTaskList);
	};

	const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewTaskText(event?.target.value);
	};

	const handleCreateTask = (event: FormEvent) => {
		event.preventDefault();
		const id = Math.floor(Date.now() * Math.random()).toString(36);
		const task = {
			id,
			taskText: newTaskText,
			isDone: false,
		};
		setToDoList([...toDoList, task]);
		setNewTaskText('');
	};

	const tasksDone = toDoList.reduce((count, task) => {
		if (task.isDone) {
			return count + 1;
		}
		return count;
	}, 0);

	return (
		<>
			<Header />
			<main className={styles.wrapper}>
				<form className={styles.form} onSubmit={handleCreateTask}>
					<input
						type="text"
						className={styles.form__input}
						placeholder="Adicione uma nova tarefa"
						value={newTaskText}
						onChange={handleNewTaskChange}
					/>
					<button>
						Criar <AiOutlinePlusCircle className={styles.form__button_icon} />
					</button>
				</form>
				<div className={styles.content}>
					<div className={styles.content__created_tasks}>
						<p className={styles.content__created_tasks_text}>Tarefas criadas</p>
						<p data-testid="created-tasks" className={styles.content__tasks_number}>
							{toDoList.length}
						</p>
					</div>
					<div className={styles.content__created_tasks}>
						<p className={styles.content__finished_tasks_text}>Concluídas</p>
						<p data-testid="done-tasks" className={styles.content__tasks_number}>
							{tasksDone} de {toDoList.length}
						</p>
					</div>
				</div>
				{toDoList.length === 0 ? (
					<NoTask />
				) : (
					toDoList.map((task) => {
						return <ListItem key={task.id} task={task} handleTaskDone={handleTaskDone} handleDeleteTask={handleDeleteTask} />;
					})
				)}
			</main>
		</>
	);
}
