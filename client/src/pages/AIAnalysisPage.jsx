import { useState } from "react";
import { getAiAnalysisForChild } from "../data/aiAnalysisData";
import styles from "../styles/ai-analysis.module.css";

function AIAnalysisPage({ child }) {
    const analysis = getAiAnalysisForChild(child);
    const [question, setQuestion] = useState("");
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    const handleAnalyze = (event) => {
        event.preventDefault();
        if (question.trim()) {
            setHasAnalyzed(true);
        }
    };

    const selectPrompt = (prompt) => {
        setQuestion(prompt);
        setHasAnalyzed(false);
    };

    return (
        <section className={styles.aiPage} aria-label="AI performance analysis">
            <header className={styles.aiHeader}>
                <div>
                    <h1>AI Performance Analysis</h1>
                    <p>Review the selected student using grades, attendance, and teacher reports.</p>
                </div>
                <div className={styles.childContext}>
                    <span>Selected child</span>
                    <strong>{child.name}</strong>
                    <small>{analysis.className}</small>
                </div>
            </header>

            <div className={styles.analysisLayout}>
                <section className={styles.questionCard} aria-label="Ask about the selected child">
                    <div className={styles.cardEyebrow}>Ask about {child.name}</div>
                    <div className={styles.promptList}>
                        {analysis.prompts.map((prompt) => (
                            <button type="button" className={styles.promptButton} key={prompt} onClick={() => selectPrompt(prompt)}>
                                {prompt}
                            </button>
                        ))}
                    </div>
                    <form className={styles.questionForm} onSubmit={handleAnalyze}>
                        <label htmlFor="ai-question">Your question</label>
                        <input
                            id="ai-question"
                            className={styles.questionInput}
                            value={question}
                            onChange={(event) => {
                                setQuestion(event.target.value);
                                setHasAnalyzed(false);
                            }}
                            placeholder="Ask a question..."
                        />
                        <button type="submit" className={styles.analyzeButton}>Analyze</button>
                    </form>
                </section>

                <section className={styles.summaryCard} aria-live="polite">
                    <div className={styles.aiBadge}>AI summary</div>
                    <h2>{hasAnalyzed ? "Analysis result" : "Performance summary"}</h2>
                    <p>{analysis.summary}</p>
                    {hasAnalyzed && <div className={styles.questionResult}>Question reviewed: {question}</div>}
                    <div className={styles.dataUsed}>
                        <h3>Data used</h3>
                        <div className={styles.dataChips}>
                            {analysis.dataUsed.map((source) => <span key={source}>{source}</span>)}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default AIAnalysisPage;
