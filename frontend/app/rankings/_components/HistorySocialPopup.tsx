import Image from "next/image";

import styles from "../history.module.css";

const CLOSE_ICON_SIZE = 32;

type HistorySocialPopupProps = {
  eventName: string;
  photoUrls: string[];
  onClose: () => void;
};

export default function HistorySocialPopup({
  eventName,
  photoUrls,
  onClose,
}: HistorySocialPopupProps) {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2 className={styles.popupTitle}>{eventName}</h2>

          <button type="button" className={styles.popupClose} onClick={onClose} aria-label="Close">
            <Image
              src="/red-close-icon.svg"
              alt=""
              width={CLOSE_ICON_SIZE}
              height={CLOSE_ICON_SIZE}
            />
          </button>
        </div>

        <div className={styles.popupPhotos}>
          {photoUrls.map((url) => (
            // eslint-disable-next-line next/no-img-element
            <img key={url} src={url} alt={eventName} className={styles.popupPhoto} />
          ))}
        </div>
      </div>
    </div>
  );
}
