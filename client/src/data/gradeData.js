export const gradeSheets = {
    default: {
        className: "Grade 7-B",
        exams: [
            {
                id: "math-midterm",
                subject: "Mathematics",
                title: "Midterm examination",
                date: "August 12, 2026",
                score: "86 / 100",
                percentage: 86,
                grade: "A",
                teacher: "Ms. Noor",
                details: "Strong work on fractions and equations.",
            },
            {
                id: "science-project",
                subject: "Science",
                title: "Science project assessment",
                date: "August 18, 2026",
                score: "91 / 100",
                percentage: 91,
                grade: "A+",
                teacher: "Mr. Kareem",
                details: "Excellent research and clear presentation.",
            },
        ],
    },
};

export function getGradeSheetForChild(child) {
    return gradeSheets[child?.name] || gradeSheets.default;
}
