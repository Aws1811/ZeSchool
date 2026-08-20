import { useMemo, useState } from "react";
import styles from "../styles/calendar.module.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const eventColors = ["red", "yellow", "blue", "green"];

const initialEvents = [
    { id: 1, date: "2026-08-04", title: "Math review", color: "blue" },
    { id: 2, date: "2026-08-12", title: "Parent meeting", color: "yellow" },
    { id: 3, date: "2026-08-20", title: "Reading assignment", color: "green" },
];

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getCalendarDays(monthDate) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const firstCalendarDay = new Date(year, month, 1 - firstDay.getDay());
    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(firstCalendarDay);
        date.setDate(firstCalendarDay.getDate() + index);
        return date;
    });
}

function CalendarPage() {
    const today = new Date();
    const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(formatDateKey(today));
    const [events, setEvents] = useState(initialEvents);
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventColor, setEventColor] = useState("blue");

    const calendarDays = useMemo(() => getCalendarDays(monthDate), [monthDate]);
    const monthLabel = monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const changeMonth = (offset) => {
        setMonthDate((currentDate) => new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const handleAddEvent = (event) => {
        event.preventDefault();
        const title = eventTitle.trim();

        if (!title || !selectedDate) {
            return;
        }

        setEvents((currentEvents) => [
            ...currentEvents,
            { id: Date.now(), date: selectedDate, title, color: eventColor },
        ]);
        setEventTitle("");
        setEventColor("blue");
        setIsAddingEvent(false);
    };

    return (
        <section className={styles.calendarPage} aria-label="Calendar">
            <div className={styles.calendarToolbar}>
                <div className={styles.monthControls}>
                    <button type="button" className={styles.monthButton} onClick={() => changeMonth(-1)} aria-label="Previous month">
                        ‹
                    </button>
                    <div className={styles.monthLabel}>{monthLabel}</div>
                    <button type="button" className={styles.monthButton} onClick={() => changeMonth(1)} aria-label="Next month">
                        ›
                    </button>
                </div>
                <button type="button" className={styles.addEventButton} onClick={() => setIsAddingEvent((current) => !current)}>
                    {isAddingEvent ? "Close" : "Add event"}
                </button>
            </div>

            {isAddingEvent && (
                <form className={styles.eventForm} onSubmit={handleAddEvent}>
                    <input
                        className={styles.eventInput}
                        value={eventTitle}
                        onChange={(event) => setEventTitle(event.target.value)}
                        placeholder="Event title"
                        aria-label="Event title"
                    />
                    <div className={styles.colorPicker} aria-label="Event color">
                        {eventColors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                className={`${styles.colorButton} ${styles[color]} ${eventColor === color ? styles.selectedColor : ""}`}
                                onClick={() => setEventColor(color)}
                                aria-label={`${color} event`}
                                title={`${color} event`}
                            />
                        ))}
                    </div>
                    <div className={styles.selectedDateLabel}>Selected: {selectedDate}</div>
                    <button type="submit" className={styles.saveEventButton}>Save event</button>
                </form>
            )}

            <div className={styles.calendarGrid}>
                {weekdays.map((weekday) => (
                    <div className={styles.weekday} key={weekday}>{weekday}</div>
                ))}
                {calendarDays.map((date) => {
                    const dateKey = formatDateKey(date);
                    const dayEvents = events.filter((calendarEvent) => calendarEvent.date === dateKey);
                    const isCurrentMonth = date.getMonth() === monthDate.getMonth();
                    const isToday = dateKey === formatDateKey(today);
                    const isSelected = dateKey === selectedDate;

                    return (
                        <button
                            type="button"
                            className={`${styles.dayCell} ${isCurrentMonth ? "" : styles.outsideMonth} ${isToday ? styles.today : ""} ${isSelected ? styles.selectedDay : ""}`}
                            key={dateKey}
                            onClick={() => setSelectedDate(dateKey)}
                        >
                            <span className={styles.dayNumber}>{date.getDate()}</span>
                            <span className={styles.eventList}>
                                {dayEvents.map((calendarEvent) => (
                                    <span className={`${styles.event} ${styles[calendarEvent.color]}`} key={calendarEvent.id}>
                                        {calendarEvent.title}
                                    </span>
                                ))}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default CalendarPage;
