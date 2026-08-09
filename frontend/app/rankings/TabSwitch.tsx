import styles from "./rankings.module.css";

type TabSwitchProps = {
  activeTab: "ranks" | "history";
  onTabSwitch: (tab: "ranks" | "history") => void;
};

export default function TabSwitch({ activeTab, onTabSwitch }: TabSwitchProps) {
  return (
    <nav className={styles.tabSwitch}>
      <ul className={styles.ulContainer}>
        <li
          className={`${styles.navText} ${activeTab === "ranks" ? styles.activeTab : ""}`}
          onClick={() => onTabSwitch("ranks")}
        >
          Ranks
        </li>
        <li
          className={`${styles.navText} ${activeTab === "history" ? styles.activeTab : ""}`}
          onClick={() => onTabSwitch("history")}
        >
          History
        </li>
      </ul>
    </nav>
  );
}
