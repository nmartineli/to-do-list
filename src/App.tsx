import { AiOutlinePlusCircle } from 'react-icons/ai';
import Header from './components/Header';
import NoTask from './components/noTask';
// import ListItem from './components/ListItem';
import './global.css';
import styles from './App.module.css';

// const taskList = [
// 	{
// 		id: '1',
// 		isComplete: true,
// 		title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
// 	},
// ];

function App() {
	return (
		<>
			<Header />
			<main className={styles.wrapper}>
				<form className={styles.form}>
					<input className={styles.form__input} placeholder="Adicione uma nova tarefa" />
					<button>
						Criar <AiOutlinePlusCircle className={styles.form__button_icon} />
					</button>
				</form>

				<div className={styles.content}>
					<div className={styles.content__created_tasks}>
						<p className={styles.content__created_tasks_text}>Tarefas criadas</p>
						<p className={styles.content__tasks_number}>0</p>
					</div>
					<div className={styles.content__created_tasks}>
						<p className={styles.content__finished_tasks_text}>Concluídas</p>
						<p className={styles.content__tasks_number}>0</p>
					</div>
				</div>
				<NoTask />
			</main>
		</>
	);
}

export default App;
