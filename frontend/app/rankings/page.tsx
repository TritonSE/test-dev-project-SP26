import { Rubik } from "next/font/google";
import Image from "next/image";

import styles from "./rankings.module.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--rubik",
});

export default function LeaderboardPage() {
  return (
    <main className={`${styles.teamContainer} ${rubik.variable}`}>
      <nav className={styles.tabSwitch}>
        <ul className={styles.ulContainer}>
          <li className={`${styles.navText} ${styles.activeTab}`}>Ranks</li>
          <li className={styles.navText}>History</li>
        </ul>
      </nav>
      {/* TODO: Replace with real team data from API */}
      <div className={styles.topThree}>
        <div className={styles.topProfile}>
          <h4 className={styles.thirdPoints}>50</h4>
          <Image
            src="/eshaan-profile.jpg"
            alt="Headshot of Eshaan"
            width={150}
            height={150}
            className={styles.thirdProfile}
          ></Image>
          <h5 className={styles.thirdRank}>
            <span className={styles.bronze}>3nd</span> Place
          </h5>
        </div>

        <div className={styles.topProfile}>
          <h2 className={styles.firstPoints}>100</h2>
          <Image
            src="/eshaan-profile.jpg"
            alt="Headshot of Eshaan"
            width={150}
            height={150}
            className={styles.firstProfile}
          ></Image>
          <h3 className={styles.firstRank}>
            <span className={styles.gold}>1st</span> Place
          </h3>
        </div>

        <div className={styles.topProfile}>
          <h4 className={styles.secondPoints}>80</h4>
          <Image
            src="/eshaan-profile.jpg"
            alt="Headshot of Eshaan"
            width={150}
            height={150}
            className={styles.secondProfile}
          ></Image>
          <h5 className={styles.secondRank}>
            <span className={styles.silver}>2nd</span> Place
          </h5>
        </div>
      </div>
    </main>
  );
}
