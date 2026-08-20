import { useState } from "react";
import { getAiAnalysisForChild } from "../data/aiAnalysisData";
import styles from "../styles/ai-analysis.module.css";

const filters = ["Grades", "Attendance", "Teacher reports"];

function AIAnalysisPage({ child }) {
    const analysis = getAiAnalysisForChild(child);
    const [period, setPeriod] = useState("month");
    const [selectedFilters, setSelectedFilters] = useState(filters);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    const [question, setQuestion] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const currentAnalysis = analysis.periods[period];

    const toggleFilter = (filter) => {
        setSelectedFilters((currentFilters) => (
            currentFilters.includes(filter)
                ? currentFilters.filter((currentFilter) => currentFilter !== filter)
                : [...currentFilters, filter]
        ));
        setHasAnalyzed(false);
    };

    const handleAnalyze = () => {
        setHasAnalyzed(true);
    };

    const handleChatSubmit = (event) => {
        event.preventDefault();
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion) {
            return;
        }

        setChatMessages((currentMessages) => [
            ...currentMessages,
            { id: `${Date.now()}-question`, role: "user", text: trimmedQuestion },
            { id: `${Date.now()}-answer`, role: "assistant", text: currentAnalysis.advice },
        ]);
        setQuestion("");
    };

    return (
        <section className={styles.aiPage} aria-label="AI performance analysis">
            <section className={styles.analysisControls} aria-label="Analysis filters">
                <div className={styles.controlGroup}>
                    <label htmlFor="analysis-period">Analysis period</label>
                    <select id="analysis-period" value={period} onChange={(event) => { setPeriod(event.target.value); setHasAnalyzed(false); }}>
                        {Object.entries(analysis.periods).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
                    </select>
                </div>
                <div className={styles.sourceFilters}>
                    <span>Use data from</span>
                    <div className={styles.filterButtons}>
                        {filters.map((filter) => (
                            <button
                                type="button"
                                className={`${styles.filterButton} ${selectedFilters.includes(filter) ? styles.activeFilter : ""}`}
                                key={filter}
                                onClick={() => toggleFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="button" className={styles.analyzeButton} onClick={handleAnalyze}>Analyze performance</button>
            </section>

            <div className={styles.analysisWorkspace}>
                <main className={`${styles.reportNote} ${hasAnalyzed ? styles.reportReady : ""}`}>
                    <div className={styles.notePin} />
                    <div className={styles.reportTopline}>
                        <div>
                            <div className={styles.noteLabel}>PERFORMANCE REPORT</div>
                            <h2>{currentAnalysis.label}</h2>
                            <span>{currentAnalysis.range}</span>
                        </div>
                        <span className={styles.reportStatus}>{hasAnalyzed ? "Analysis ready" : "Ready to analyze"}</span>
                    </div>
                    <div className={styles.reportBody}>
                        <h3>Summary</h3>
                        <p>{hasAnalyzed ? currentAnalysis.summary : "Choose a period and the data sources you want to review, then select Analyze performance to generate the report."}</p>
                    </div>
                    <div className={styles.reportMetrics}>
                        {currentAnalysis.metrics.map((metric) => (
                            <div key={metric.label}>
                                <span>{metric.label}</span>
                                <strong>{hasAnalyzed ? metric.value : "--"}</strong>
                            </div>
                        ))}
                    </div>
                    <div className={styles.adviceBlock}>
                        <span>Suggested next step</span>
                        <p>{hasAnalyzed ? currentAnalysis.advice : "The report will suggest practical next steps after the analysis."}</p>
                    </div>
                    <div className={styles.sourcesLine}>Sources available: {selectedFilters.length ? selectedFilters.join(", ") : "No sources selected"}</div>
                </main>

                <aside className={styles.aiChatPanel} aria-label="AI follow-up chat">
                    <div className={styles.chatPanelHeader}>
                        <div className={styles.aiAvatar}>AI</div>
                        <div>
                            <h2>Ask about the report</h2>
                            <p>Follow up on the analysis and advice.</p>
                        </div>
                    </div>
                    <div className={styles.chatMessages}>
                        {!chatMessages.length && <div className={styles.emptyChat}>Your questions about the report will appear here.</div>}
                        {chatMessages.map((message) => (
                            <div className={`${styles.chatMessage} ${message.role === "user" ? styles.userMessage : styles.aiMessage}`} key={message.id}>
                                <span>{message.role === "user" ? child.name : "ZeSchool AI"}</span>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <form className={styles.chatComposer} onSubmit={handleChatSubmit}>
                        <input
                            className={styles.chatInput}
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            placeholder="Ask how to improve..."
                            aria-label="Ask AI how to improve performance"
                        />
                        <button type="submit">Send</button>
                    </form>
                </aside>
            </div>
        </section>
    );
}

export default AIAnalysisPage;
