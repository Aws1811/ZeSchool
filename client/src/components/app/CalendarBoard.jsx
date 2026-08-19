import { calendarEvents } from "../../data/mockData";
import styles from "../../styles/app.module.css";

const days = [
    ["muted", 27], ["muted", 28], ["muted", 29], ["muted", 30], ["muted", 31], ["", 1], ["", 2],
    ["", 3], ["", 4], ["", 5], ["", 6], ["", 7], ["", 8], ["", 9],
    ["", 10], ["", 11], ["", 12], ["", 13], ["", 14], ["", 15], ["", 16],
    ["", 17], ["", 18], ["today", 19], ["", 20], ["", 21], ["", 22], ["", 23],
    ["", 24], ["", 25], ["", 26], ["", 27], ["", 28], ["", 29], ["", 30],
    ["", 31], ["muted", 1], ["muted", 2], ["muted", 3], ["muted", 4], ["muted", 5], ["muted", 6],
];

function CalendarBoard({ teacher = false }) {
    const eventFor = (day, index) => {
        if (index < 5 || index > 35) return null;
        return calendarEvents.find((event) => event.date === day);
    };

    return (
        <section className={styles.calendarGrid}>
            <div className={`${styles.card} ${styles.calendarCard}`}>
                <div className={styles.calendarHeader}>
                    <h2>August 2026</h2>
                    <div>
                        <button type="button">‹</button>
                        <button type="button">›</button>
                        {teacher && <button type="button" className={styles.primarySmall}>Add event</button>}
                    </div>
                </div>
                <div className={styles.weekRow}>
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => <div key={day}>{day}</div>)}
                </div>
                <div className={styles.daysGrid}>
                    {days.map(([state, day], index) => {
                        const event = eventFor(day, index);
                        return (
                            <div
                                key={`${day}-${index}`}
                                className={`${styles.dayCell} ${state === "muted" ? styles.dayMuted : ""} ${state === "today" ? styles.dayToday : ""}`}
                            >
                                <span className={styles.dayNumber}>{day}</span>
                                {event && (
                                    <div className={`${styles.calendarEvent} ${styles[`event_${event.type}`] || ""}`}>
                                        {event.title}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <aside className={`${styles.card} ${styles.upcomingCard}`}>
                <h3>Upcoming</h3>
                <div className={styles.upcomingItem}>
                    <span className={styles.pill}>Today</span>
                    <strong>English project</strong>
                    <p>Due at 2:00 PM</p>
                </div>
                <div className={styles.upcomingItem}>
                    <span className={styles.pill}>Thursday</span>
                    <strong>School activity</strong>
                    <p>School garden · 10:30 AM</p>
                </div>
                <div className={styles.upcomingItem}>
                    <span className={styles.pill}>Next week</span>
                    <strong>Mathematics test</strong>
                    <p>Chapter 4 and Chapter 5</p>
                </div>
            </aside>
        </section>
    );
}

export default CalendarBoard;
