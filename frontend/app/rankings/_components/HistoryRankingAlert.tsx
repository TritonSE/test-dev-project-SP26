import Image from "next/image";

import styles from "../history.module.css";

type HistoryRankingAlertProps = {
  message: string;
  date: string;
};

export default function HistoryRankingAlert({ message, date }: HistoryRankingAlertProps) {
  return (
    <div className={styles.alert}>
      <span className={styles.alertIcon}>
        <Image src="/trophy-icon.svg" alt="" width={30} height={30} />
      </span>

      <p className={styles.alertText}>{message}</p>

      <p className={styles.alertDate}>{date}</p>
    </div>
  );
}
