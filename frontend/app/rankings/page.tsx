import { Inter, Rubik } from "next/font/google";
import Image from "next/image";

import styles from "./rankings.module.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--rubik",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--inter",
});

export default function LeaderboardPage() {
  return (
    <main className={`${styles.leaderboardContainer} ${rubik.variable}`}>
      <nav className={styles.tabSwitch}>
        <ul className={styles.ulContainer}>
          <li className={`${styles.navText} ${styles.activeTab}`}>Ranks</li>
          <li className={styles.navText}>History</li>
        </ul>
      </nav>
      {/* TODO: Replace with real team data from API */}
      <div className={styles.topThree}>
        <div className={styles.topProfile}>
          <h3 className={styles.thirdPoints}>50</h3>
          <Image
            src="/eshaan-profile.jpg"
            alt="Headshot of Eshaan"
            width={150}
            height={150}
            className={styles.thirdProfile}
          ></Image>
          <h3 className={styles.thirdRank}>
            <span className={styles.bronze}>3nd</span> Place
          </h3>
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
          <h2 className={styles.firstRank}>
            <span className={styles.gold}>1st</span> Place
          </h2>
        </div>

        <div className={styles.topProfile}>
          <h3 className={styles.secondPoints}>80</h3>
          <Image
            src="/eshaan-profile.jpg"
            alt="Headshot of Eshaan"
            width={150}
            height={150}
            className={styles.secondProfile}
          ></Image>
          <h3 className={styles.secondRank}>
            <span className={styles.silver}>2nd</span> Place
          </h3>
        </div>
      </div>
      <div className={styles.leaderboard}>
        <h2 className={styles.mainLabel}>Top 3 Teams</h2>
        <div className={`${styles.teamContainer} ${styles.firstPlace}`}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#1</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>TEST</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={`${styles.teamContainer} ${styles.secondPlace}`}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#2</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>F3 Global</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={`${styles.teamContainer} ${styles.thirdPlace}`}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#3</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>Homestart</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <h2 className={styles.mainLabel}>Runner Ups</h2>
        <div className={styles.teamContainer}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#1</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>TEST</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#4</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>PVP</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#5</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>DBC</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#6</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>Fulcrum</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#7</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>CRED</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>

        <div className={styles.teamContainer}>
          <div className={styles.rankTeamGroup}>
            <h3 className={`${styles.rank} ${inter.variable}`}>#8</h3>
            <div className={styles.logoTeam}>
              <Image
                src="/tse-logo.svg"
                alt="TSE logo"
                width={35}
                height={35}
                className={styles.logo}
              ></Image>
              <h3 className={styles.teamName}>Meemli</h3>
            </div>
          </div>
          <p className={styles.points}>10pts</p>
        </div>
      </div>
    </main>
  );
}
