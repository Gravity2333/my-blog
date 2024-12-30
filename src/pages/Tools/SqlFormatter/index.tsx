import React, { useState } from "react";
import { format } from "sql-formatter";
import styles from "./index.css";

const SqlFormatter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [formatted, setFormatted] = useState<string>("");

  const handleFormat = () => {
    try {
      const formattedSql = format(input, {
        language: "sql", // 支持其他语言，如 'mysql', 'postgresql'
        // indent: "  ",    // 两个空格缩进
      });
      setFormatted(formattedSql);
    } catch (error) {
      setFormatted("Error formatting SQL: " + (error as Error).message);
    }
  };

  const handleClear = () => {
    setInput("");
    setFormatted("");
  };

  return (
    <div className={styles.container}>
      <h2>SQL Formatter</h2>
      <textarea
        className={styles.textarea}
        placeholder="Enter your SQL code here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleFormat}>
          Format
        </button>
        <button className={styles.button} onClick={handleClear}>
          Clear
        </button>
      </div>
      {formatted && (
        <div className={styles.outputContainer}>
          <h3>Formatted SQL:</h3>
          <pre className={styles.output}>{formatted}</pre>
        </div>
      )}
    </div>
  );
};

export default SqlFormatter;
