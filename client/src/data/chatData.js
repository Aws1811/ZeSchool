export const teachers = [
    {
        id: "teacher-1",
        name: "Ms. Noor",
        subject: "Mathematics",
        preview: "Adam did very well in today's lesson.",
        time: "10:42",
        unread: 2,
        initials: "NN",
        status: "active",
    },
    {
        id: "teacher-2",
        name: "Mr. Kareem",
        subject: "Science",
        preview: "The project deadline is next Thursday.",
        time: "Yesterday",
        unread: 0,
        initials: "KK",
        status: "busy",
    },
    {
        id: "teacher-3",
        name: "Ms. Sarah",
        subject: "English",
        preview: "Please review the reading assignment.",
        time: "Mon",
        unread: 0,
        initials: "SS",
        status: "offline",
    },
];

export const presenceClasses = {
    active: "presenceActive",
    busy: "presenceBusy",
    offline: "presenceOffline",
};

export const presenceLabels = {
    active: "Active",
    busy: "Busy",
    offline: "Offline",
};

export const initialMessages = {
    "teacher-1": [
        {
            id: 1,
            sender: "Ms. Noor",
            text: "Good morning. Adam participated very well in class today.",
            time: "10:18 AM",
        },
        {
            id: 2,
            sender: "You",
            mine: true,
            text: "Thank you for the update. Is there anything we should review at home?",
            time: "10:24 AM",
        },
        {
            id: 3,
            sender: "Ms. Noor",
            text: "A quick review of fractions would be helpful before Thursday.",
            time: "10:42 AM",
        },
    ],
    "teacher-2": [
        {
            id: 4,
            sender: "Mr. Kareem",
            text: "The science project deadline is next Thursday.",
            time: "Yesterday",
        },
    ],
    "teacher-3": [
        {
            id: 5,
            sender: "Ms. Sarah",
            text: "Please review the reading assignment before our next lesson.",
            time: "Monday",
        },
    ],
};
