import logo from "./assets/logo.png"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img src={logo} alt="Game Logo" className={styles.logo} />
        <h1 className={styles.title}>Hangman Game</h1>
      </div>
    </nav>
  )
}

export default Navbar