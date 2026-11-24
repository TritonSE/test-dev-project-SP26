import styles from "./eventDetailsStep.module.css";

export type EventDetails = {
  eventName: string;
  eventDate: string;
  location: string;
};

type Props = {
  value: EventDetails;
  onChange: (field: keyof EventDetails, value: string) => void;
};

export default function EventDetailsStep({ value, onChange }: Props) {
  return (
    <form className={styles.eventDetailsForm}>
      <div className={styles.inputGroup}>
        <label htmlFor="eventName" className={styles.sectionLabel}>
          Event name &amp; activity
        </label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          maxLength={100}
          value={value.eventName}
          onChange={(e) => onChange("eventName", e.target.value)}
          placeholder="e.g. F3 Global Karaoke night!!"
          className={styles.inputField}
        />
        <span className={styles.charCounter}>{value.eventName.length}/100</span>
      </div>

      <section className={styles.dateFieldWrapper}>
        <label className={styles.sectionLabel}>Select Date</label>
        <input
          type="date"
          name="eventDate"
          aria-label="Select event date"
          className={styles.dateInput}
          value={value.eventDate}
          onChange={(e) => onChange("eventDate", e.target.value)}
        />
      </section>

      <div className={styles.inputFieldWrapper}>
        <label htmlFor="location" className={styles.sectionLabel}>
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          maxLength={100}
          value={value.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="Where is this taking place?"
          className={styles.inputField}
        />
        <span className={styles.charCounter}>{value.location.length}/100</span>
      </div>
    </form>
  );
}
