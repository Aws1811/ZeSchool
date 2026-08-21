export const teacherProfile = {
    name: "Mr. Ahmad",
    department: "Mathematics",
};

export const teacherClasses = [
    {
        id: "class-5a",
        name: "Grade 5A",
        academicYear: "2026",
        students: [
            { id: "student-ali", name: "Ali Ahmed", parent: "Maha Ahmed", subject: "Mathematics", status: "On track" },
            { id: "student-sara", name: "Sara Ahmed", parent: "Rania Ahmed", subject: "Mathematics", status: "Needs review" },
            { id: "student-omar", name: "Omar Nasser", parent: "Huda Nasser", subject: "Mathematics", status: "On track" },
            { id: "student-lara", name: "Lara Khaled", parent: "Khaled Khaled", subject: "Mathematics", status: "On track" },
            { id: "student-yazan", name: "Yazan Sameer", parent: "Sameer Sameer", subject: "Mathematics", status: "On track" },
        ],
    },
    {
        id: "class-6b",
        name: "Grade 6B",
        academicYear: "2026",
        students: [
            { id: "student-lina", name: "Lina Omar", parent: "Omar Omar", subject: "Mathematics", status: "On track" },
            { id: "student-nour", name: "Nour Saleh", parent: "Saleh Saleh", subject: "Mathematics", status: "Needs review" },
        ],
    },
];

export const teacherConversations = [
    { id: "conversation-1", parent: "Maha Ahmed", student: "Ali Ahmed", status: "online", lastMessage: "Thank you for the update.", time: "10:25" },
    { id: "conversation-2", parent: "Rania Ahmed", student: "Sara Ahmed", status: "busy", lastMessage: "I will review the homework.", time: "Yesterday" },
    { id: "conversation-3", parent: "Huda Nasser", student: "Omar Nasser", status: "offline", lastMessage: "Omar is ready for the exam.", time: "Monday" },
];

export const teacherMessages = {
    "conversation-1": [
        { id: "message-1", sender: "parent", text: "Hello, how is Ali doing in Mathematics?", time: "10:20" },
        { id: "message-2", sender: "teacher", text: "Ali is participating well and improved in the latest assessment.", time: "10:22" },
        { id: "message-3", sender: "parent", text: "Thank you for the update.", time: "10:25" },
    ],
};

export const teacherCalendarEvents = [
    { id: "event-1", type: "Assignment", title: "Math Homework - Chapter 3", date: "August 25, 2026", target: "Grade 5A", description: "Complete questions from pages 45 to 48." },
    { id: "event-2", type: "Exam", title: "Fractions Assessment", date: "August 28, 2026", target: "Grade 5A", description: "Revision material will be shared before the assessment." },
];

export const teacherReports = [
    { id: "teacher-report-1", studentId: "student-ali", student: "Ali Ahmed", type: "Academic progress", period: "August 2026", content: "Ali has shown strong improvement in Mathematics and participates positively during class activities." },
    { id: "teacher-report-2", studentId: "student-sara", student: "Sara Ahmed", type: "Behavior / participation", period: "August 2026", content: "Sara works well with classmates and responds positively to teacher guidance." },
];

export const teacherGradeEntries = [
    { id: "grade-1", studentId: "student-ali", student: "Ali Ahmed", subject: "Mathematics", assessment: "Quiz 1", score: "18 / 20", date: "August 12, 2026" },
    { id: "grade-2", studentId: "student-sara", student: "Sara Ahmed", subject: "Mathematics", assessment: "Quiz 1", score: "16 / 20", date: "August 12, 2026" },
];

export const teacherAttendance = [
    { id: "attendance-1", studentId: "student-ali", student: "Ali Ahmed", status: "Present", date: "August 20, 2026" },
    { id: "attendance-2", studentId: "student-sara", student: "Sara Ahmed", status: "Late", date: "August 20, 2026" },
];

export const teacherClassSchedule = {
    "class-5a": [
        { id: "lecture-5a-1", day: "Sunday", time: "08:00 - 09:00", subject: "Mathematics", room: "Room 5A" },
        { id: "lecture-5a-2", day: "Tuesday", time: "10:00 - 11:00", subject: "Mathematics", room: "Room 5A" },
        { id: "lecture-5a-3", day: "Thursday", time: "09:00 - 10:00", subject: "Mathematics", room: "Room 5A" },
    ],
    "class-6b": [
        { id: "lecture-6b-1", day: "Monday", time: "09:00 - 10:00", subject: "Mathematics", room: "Room 6B" },
        { id: "lecture-6b-2", day: "Wednesday", time: "08:00 - 09:00", subject: "Mathematics", room: "Room 6B" },
    ],
};
