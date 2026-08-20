export const aiAnalysisData = {
    default: {
        className: "Grade 7-B",
        periods: {
            month: {
                label: "This month",
                range: "August 1 - August 31, 2026",
                summary: "The student is performing well overall this month. Mathematics has improved across recent assessments, attendance is stable, and teacher reports describe positive class participation. English practice is the clearest area for continued attention.",
                advice: "Keep the current mathematics routine and add short reading practice three times each week.",
                metrics: [
                    { label: "Average grade", value: "86%" },
                    { label: "Attendance", value: "94%" },
                    { label: "Reports", value: "4" },
                ],
            },
            term: {
                label: "This term",
                range: "June 1 - August 31, 2026",
                summary: "Across the term, the student has made steady academic progress. Mathematics shows the strongest upward pattern, while attendance remains consistent. Teacher reports indicate positive participation with a need for more confidence in English reading tasks.",
                advice: "Review reading comprehension once a week and continue the weekly mathematics revision routine.",
                metrics: [
                    { label: "Average grade", value: "83%" },
                    { label: "Attendance", value: "92%" },
                    { label: "Reports", value: "11" },
                ],
            },
            year: {
                label: "This school year",
                range: "September 1, 2025 - August 31, 2026",
                summary: "The school-year view shows consistent progress and a stable attendance pattern. The student responds well to structured revision and positive teacher feedback. English remains the main opportunity for improvement over the next period.",
                advice: "Set a small weekly English goal and review progress with the teacher at the next school meeting.",
                metrics: [
                    { label: "Average grade", value: "81%" },
                    { label: "Attendance", value: "93%" },
                    { label: "Reports", value: "28" },
                ],
            },
        },
        dataSources: ["Grades", "Attendance", "Teacher reports"],
    },
};

export function getAiAnalysisForChild(child) {
    return aiAnalysisData[child?.name] || aiAnalysisData.default;
}
