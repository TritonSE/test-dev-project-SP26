import styles from "./eventDetailsStep.module.css";
import { Calendar } from "@tritonse/tse-constellation";
import { useState } from "react";

export default function EventDetailsStep() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <form className={styles.eventDetailsForm}>
      {/* Field 1 — Event name & activity */}
      <div className={styles.inputGroup}>
        <label htmlFor="eventName" className={styles.sectionLabel}>
          Event name &amp; activity
        </label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          maxLength={100}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="e.g. F3 Global Karaoke night!!"
          className={styles.inputField}
        />
        <span className={styles.charCounter}>{eventName.length}/100</span>
      </div>

      {/* TODO: Field 2 — Activity type (text input) */}
      {/* TODO: Field 3 — Who attended (multi-select dropdown, fetch from /api/members) */}

      {/* Field 4 — Select Date */}
      <section className={styles.dataFieldWrapper}>
        <label className={styles.sectionLabel}>Select Date</label>
        <div className={styles.calendarWrapper}>
          <Calendar selected={selectedDate} setSelected={setSelectedDate} />
        </div>
      </section>

      {/* Field 5 — Location */}
      <div className={styles.inputFieldWrapper}>
        <label htmlFor="location" className={styles.sectionLabel}>
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          maxLength={100}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Jin's Studio"
          className={styles.inputField}
        />
        <span className={styles.charCounter}>{location.length}/100</span>
      </div>

      {/* TODO: Field 6 — Point assignment per team */}
      {/* TODO: Field 7 — PVP flag (if applicable) */}
      {/* TODO: Validate min 3 attendees before submit */}
      {/* TODO: POST to /api/submissions, then redirect to /submit/confirmation */}
    </form>
  );
}
