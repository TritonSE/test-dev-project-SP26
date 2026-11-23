import Image from "next/image";

import styles from "../history.module.css";

const CLOSE_ICON_SIZE = 15;

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
      {/* stopPropagation so clicks inside the white box don't close it */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.popupClose} onClick={onClose}>
          <Image
            src="/close-icon.svg"
            alt="Close"
            width={CLOSE_ICON_SIZE}
            height={CLOSE_ICON_SIZE}
          />
        </button>

        <h2 className={styles.popupTitle}>{eventName}</h2>

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
