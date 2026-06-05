import styles from "./welcome.module.css";

export default function WelcomePage() {
  return (
    <main className={styles.container}>
      <button className={styles.backButton}>
        <img src="ep_back.svg" alt="go back button" />
      </button>

      <h1 className={styles.greeting}>
        Welcome, <br />
        Caleb!
      </h1>
      <p className={styles.loadMessage}>Logging you in now...</p>
      <div className={styles.avatar}>
        <img src="Ellipse3819.svg" alt="Caleb avatar" />
      </div>
      <div className={styles.spinner} />
    </main>
  );
}
