"use client";

import { useState } from "react";
import { Calendar } from "@tritonse/tse-constellation";

export default function SubmitPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <main className="py-8 px-4 max-w-150 mx-auto antialiased">
      <form className="flex flex-col gap-6 mt-4">
        {/* Field 1 — Event name & activity */}
        <div className="flex flex-col gap-2">
          <label htmlFor="eventName" className="section-label">
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
            className="input-field"
          />
          <span className="char-counter self-end">{eventName.length}/100</span>
        </div>

        {/* TODO: Field 2 — Activity type (text input) */}
        {/* TODO: Field 3 — Who attended (multi-select dropdown, fetch from /api/members) */}

        {/* Field 4 — Select Date */}
        <section className="flex flex-col gap-2">
          <label className="section-label">Select Date</label>
          <div className="calendar-wrapper w-57.75 [&_>_div]:bg-white! [&_>_div]:rounded-2xl! [&_>_div]:border-brand! [&_>_div]:shadow-none!">
            <Calendar selected={selectedDate} setSelected={setSelectedDate} />
          </div>
        </section>

        {/* Field 5 — Location */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="section-label">
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
            className="input-field"
          />
          <span className="char-counter self-end">{location.length}/100</span>
        </div>

        {/* TODO: Field 5 — Photo upload (required) */}
        {/* TODO: Field 6 — Point assignment per team */}
        {/* TODO: Field 7 — PVP flag (if applicable) */}
        {/* TODO: Validate min 3 attendees before submit */}
        {/* TODO: POST to /api/submissions, then redirect to /submit/confirmation */}
      </form>
    </main>
  );
}
