export const reportData = [
    {
        id: "report-1",
        type: "Academic progress",
        title: "August Progress Report",
        date: "August 18, 2026",
        author: "Ms. Noor",
        summary: "Strong improvement in Mathematics and steady class participation.",
        detail: "Adam has shown clear improvement in recent Mathematics assessments and participates positively during class activities.",
    },
    {
        id: "report-2",
        type: "Behavior / participation",
        title: "Class Participation Note",
        date: "August 12, 2026",
        author: "Mr. Kareem",
        summary: "Participates well and works positively with classmates.",
        detail: "The student works well with classmates and responds positively to teacher guidance during group activities.",
    },
    {
        id: "report-3",
        type: "Attendance",
        title: "Attendance Summary",
        date: "August 5, 2026",
        author: "School office",
        summary: "Good attendance with one excused absence this month.",
        detail: "Attendance is stable for the current period. One absence was recorded and marked as excused by the school.",
    },
];

export const smartwatchData = {
    default: {
        isConnected: true,
        deviceName: "Adam's Watch",
        balance: "32.50 ILS",
        lastUpdated: "Today at 12:45",
        purchases: [
            { id: "purchase-1", activity: "Cafeteria purchase", amount: "-5.00 ILS", time: "12:45", date: "August 20, 2026" },
            { id: "purchase-2", activity: "Cafeteria purchase", amount: "-3.50 ILS", time: "10:20", date: "August 19, 2026" },
            { id: "purchase-3", activity: "School supplies", amount: "-8.00 ILS", time: "09:05", date: "August 18, 2026" },
        ],
    },
};

export function getSmartwatchDataForChild(child) {
    return smartwatchData[child?.name] || smartwatchData.default;
}
