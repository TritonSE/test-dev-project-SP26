// =============================================================================
// SCREEN: Social Submission Form  (/submit)
// =============================================================================
// PURPOSE: Members use this to submit a social event for point tracking.
//
// WHAT TO BUILD HERE — the form has these fields:
//   1. Submission name        — text input (e.g. "Escape Room Night")
//   2. Activity type          — text input (e.g. "Escape Room")
//   3. Who attended           — multi-select dropdown of all members
//   4. Date & time            — date + time picker
//   5. Photo upload           — required, image of all members present
//   6. Point assignment       — submitter manually assigns points per team
//                               e.g. { "F3 Global": 3, "CRED": 2, "PVP": 1 }
//   7. PVP flag               — if PVP members attended, where do their points go?
//                               options: assign to a team | don't count
//                               if assigned to a team → auto-flagged for admin review
//
// VALIDATION RULES (block submission if violated):
//   - Fewer than 3 attendees → show error, do NOT submit
//   - Photo is required
//   - All fields must be filled
//
// AFTER SUBMIT:
//   - Show confirmation screen with point breakdown per team
//   - See /submit/confirmation for that screen
//
// DATA NEEDED FROM BACKEND:
//   GET  /api/members           →  [{ id, name, teamId }]
//   GET  /api/teams             →  [{ id, name }]
//   POST /api/submissions       →  body: FormData (all fields + photo)
//                               ←  { submissionId, pointPreview }
//
// NOTES:
//   - Mobile view only
//   - Requires auth — redirect to /login if no token found
// =============================================================================

"use client";

import { useState } from "react";
import { Calendar } from "@tritonse/tse-constellation";
import styles from "./submit.module.css";

export default function SubmitPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <main className={`${styles.page} py-8 px-4 antialiased`}>
      <form className="flex flex-col gap-6 mt-4">
        {/* Field 1 — Event name & activity */}
        <div className="flex flex-col w-83.25" style={{ gap: "20px" }}>
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
        <section className="flex flex-col gap-2">
          <label className={styles.sectionLabel}>Select Date</label>
          <div className={styles.calendarWrapper}>
            <Calendar selected={selectedDate} setSelected={setSelectedDate} />
          </div>
        </section>

        {/* Field 5 — Location */}
        <div className="flex flex-col w-83.25" style={{ gap: "20px" }}>
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
    </main>
  );
}
