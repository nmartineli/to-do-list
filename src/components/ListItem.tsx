import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './ListItem.module.css';
import { Task } from '../App';

interface IProps {
	task: Task;
	handleTaskDone: (id: string) => void;
	handleDeleteTask: (task: Task) => void;
}

function ListItem(props: IProps) {
	const { task, handleTaskDone, handleDeleteTask } = props;
	return (
		<div className={styles.listItem}>
			<input
				type="checkbox"
				data-testid="done-task-button"
				onClick={() => {
					handleTaskDone(task.id);
				}}
			/>
			<p data-testid="task-text" style={task.isDone ? { textDecoration: 'line-through' } : {}}>
				{task.taskText}
			</p>
			<button onClick={() => handleDeleteTask(task)}>
				<FaRegTrashAlt data-testid="delete-task-button" className={styles.listItem__trash_icon} />
			</button>
		</div>
	);
}

export default ListItem;
