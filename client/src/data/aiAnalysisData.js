export const aiAnalysisData = {
    default: {
        className: "Grade 7-B",
        summary: "The student is performing well overall. Mathematics has improved across recent assessments, attendance is stable, and teacher reports describe positive class participation. English practice is the clearest area for continued attention.",
        dataUsed: ["Grades", "Attendance", "Reports"],
        prompts: [
            "How is the student doing this month?",
            "Which subject needs attention?",
            "Summarize teacher reports.",
        ],
    },
};

export function getAiAnalysisForChild(child) {
    return aiAnalysisData[child?.name] || aiAnalysisData.default;
}
