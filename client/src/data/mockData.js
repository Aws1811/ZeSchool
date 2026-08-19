export const children = [
    { id: 1, name: "Adam Shaheen", grade: "Grade 7", className: "7-B", initials: "AS" },
    { id: 2, name: "Lina Shaheen", grade: "Grade 4", className: "4-A", initials: "LS" },
];

export const teacherStudents = [
    { id: 1, name: "Adam Shaheen", className: "7-B", parent: "Murad Shaheen", initials: "AS", unread: 2 },
    { id: 2, name: "Maya Khalil", className: "7-B", parent: "Rana Khalil", initials: "MK", unread: 0 },
    { id: 3, name: "Omar Nasser", className: "7-B", parent: "Samer Nasser", initials: "ON", unread: 1 },
    { id: 4, name: "Layan Awad", className: "7-B", parent: "Huda Awad", initials: "LA", unread: 0 },
];

export const parentChats = [
    { id: 1, name: "Ms. Noor", subject: "Mathematics", preview: "Adam did very well in today's lesson.", time: "10:42", unread: 2, initials: "NN" },
    { id: 2, name: "Mr. Kareem", subject: "Science", preview: "The project deadline is next Thursday.", time: "Yesterday", unread: 0, initials: "KK" },
    { id: 3, name: "Ms. Sarah", subject: "English", preview: "Please review the reading assignment.", time: "Mon", unread: 0, initials: "SS" },
];

export const messages = [
    { id: 1, sender: "Ms. Noor", mine: false, text: "Good morning. Adam participated very well in class today.", time: "10:18 AM" },
    { id: 2, sender: "You", mine: true, text: "Thank you for the update. Is there anything we should review at home?", time: "10:24 AM" },
    { id: 3, sender: "Ms. Noor", mine: false, text: "A quick review of fractions would be helpful before Thursday.", time: "10:42 AM" },
];

export const calendarEvents = [
    { date: 4, title: "Math homework", type: "assignment" },
    { date: 7, title: "Science quiz", type: "quiz" },
    { date: 13, title: "Parent meeting", type: "meeting" },
    { date: 19, title: "English project", type: "project" },
    { date: 27, title: "School activity", type: "activity" },
];

export const grades = [
    { subject: "Mathematics", teacher: "Ms. Noor", grade: 92, status: "Excellent" },
    { subject: "Science", teacher: "Mr. Kareem", grade: 86, status: "Very good" },
    { subject: "English", teacher: "Ms. Sarah", grade: 89, status: "Very good" },
    { subject: "Arabic", teacher: "Ms. Dalia", grade: 94, status: "Excellent" },
    { subject: "Social Studies", teacher: "Mr. Hani", grade: 81, status: "Good" },
];

export const attendanceRows = [
    { date: "Aug 19, 2026", status: "Present", note: "On time" },
    { date: "Aug 18, 2026", status: "Present", note: "On time" },
    { date: "Aug 17, 2026", status: "Late", note: "Arrived 8:12 AM" },
    { date: "Aug 16, 2026", status: "Present", note: "On time" },
    { date: "Aug 15, 2026", status: "Absent", note: "Family note received" },
];

export const reports = [
    { id: 1, title: "Weekly progress", teacher: "Ms. Noor", date: "Aug 18, 2026", summary: "Adam showed strong participation and steady improvement in mathematics this week." },
    { id: 2, title: "Science project note", teacher: "Mr. Kareem", date: "Aug 15, 2026", summary: "Good teamwork and preparation. The next focus should be presenting findings more clearly." },
    { id: 3, title: "English reading", teacher: "Ms. Sarah", date: "Aug 11, 2026", summary: "Reading comprehension is progressing well. Continue short daily reading practice at home." },
];
