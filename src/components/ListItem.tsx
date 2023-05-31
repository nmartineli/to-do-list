import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './ListItem.module.css';

function ListItem() {
	return (
		<div className={styles.listItem}>
			<input type="checkbox" />
			<p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
			<button>
				<FaRegTrashAlt className={styles.listItem__trash_icon} />
			</button>
		</div>
	);
}

export default ListItem;
