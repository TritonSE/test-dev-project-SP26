import Image from "next/image";

import styles from "../history.module.css";

export type Standing = {
  id: string;
  name: string;
};

type HistoryWeeklyRankingPopupProps = {
  weekRange: string;
  standings: Standing[];
  onClose: () => void;
};

const CLOSE_ICON_SIZE = 32;
const PODIUM_ICON_SIZE = 36;

// Row color and icon for 1st, 2nd and 3rd place
const PODIUM = [
  { className: styles.firstPlace, icon: "/ranking-1stplace-icon.svg" },
  { className: styles.secondPlace, icon: "/ranking-2ndplace-icon.svg" },
  { className: styles.thirdPlace, icon: "/ranking-3rdplace-icon.svg" },
];

export default function HistoryWeeklyRankingPopup({
  weekRange,
  standings,
  onClose,
}: HistoryWeeklyRankingPopupProps) {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.popupHeader} ${styles.centeredHeader}`}>
          <h2 className={`${styles.popupTitle} ${styles.rankingTitle}`}>{weekRange}</h2>

          <button type="button" className={styles.popupClose} onClick={onClose} aria-label="Close">
            <Image
              src="/red-close-icon.svg"
              alt=""
              width={CLOSE_ICON_SIZE}
              height={CLOSE_ICON_SIZE}
            />
          </button>
        </div>

        <ol className={styles.standings}>
          {standings.map((team, index) => {
            const podium = PODIUM[index];

            return (
              <li key={team.id} className={`${styles.standing} ${podium?.className ?? ""}`}>
                {podium ? (
                  <Image
                    src={podium.icon}
                    alt=""
                    width={PODIUM_ICON_SIZE}
                    height={PODIUM_ICON_SIZE}
                  />
                ) : (
                  <span className={styles.standingRank}>{index + 1}</span>
                )}
                {team.name}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
