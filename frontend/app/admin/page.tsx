import Image from "next/image";

import Teams from "./_components/Teams";
import styles from "./admin.module.css";

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <Image src="/tse-logo.svg" alt="" width={40} height={48} />
          <div>
            <strong>Triton Software Engineering</strong>
            <span>Social points tracker</span>
          </div>
        </div>
        <nav className={styles.navigation} aria-label="Main navigation">
          <a href="/rankings">Leaderboard</a>
          <span className={styles.activeNav}>♙ &nbsp;Admin</span>
          <div className={styles.profile}>
            <span className={styles.avatar}>ES</span>
            <span className={styles.profileName}>
              <strong>Eshaan Sharma</strong>
              <small>Administrator</small>
            </span>
            <span className={styles.chevron} aria-hidden="true">
              ⌄
            </span>
          </div>
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.pageHeading}>
          <h1>Admin workspace</h1>
        </div>
        <Teams />
      </div>
    </main>
  );
}
