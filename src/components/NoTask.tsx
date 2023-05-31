import styles from './noTask.module.css';
import clipboard from '../assets/clipboard.svg';

function NoTask() {
	return (
		<div className={styles.task_list__no_task}>
			<img src={clipboard} alt="clipboard icon" className={styles.task_list__no_task__image} />
			<p className={styles.task_list__no_task__title}>Você ainda não tem tarefas cadastradas</p>
			<p>Crie tarefas e organize seus itens a fazer</p>
		</div>
	);
}

export default NoTask;
