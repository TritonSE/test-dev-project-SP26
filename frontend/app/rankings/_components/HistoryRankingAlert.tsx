import Image from "next/image";

import styles from "../history.module.css";

type HistoryRankingAlertProps = {
  message: string;
  date: string;
};

// Splits "TEST is now in 1st Place!" into ["TEST", " is now in ", "1st", " Place!"]
const PLACEMENT_PATTERN = /^(.+?)( is now (?:in )?)(\d+(?:st|nd|rd|th))(.*)$/i;

export default function HistoryRankingAlert({ message, date }: HistoryRankingAlertProps) {
  const match = PLACEMENT_PATTERN.exec(message);

  return (
    <div className={styles.alert}>
      <span className={styles.alertIcon}>
        <Image src="/trophy-icon.svg" alt="" width={30} height={30} />
      </span>

      <p className={styles.alertText}>
        {match ? (
          <>
            <strong>{match[1]}</strong>
            {match[2]}
            <strong>{match[3]}</strong>
            {match[4]}
          </>
        ) : (
          message
        )}
      </p>

      <p className={styles.alertDate}>{date}</p>
    </div>
  );
}
