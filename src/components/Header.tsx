import styles from './Header.module.css';
import logo from '../assets/logo.png';

function Header() {
	return (
		<header className={styles.header}>
			<img src={logo} alt="logo to do" />
		</header>
	);
}

export default Header;
