import React, { useContext, useEffect, useState } from "react";
import styles from "./index.less";
import { CoverContext } from "@/layouts/GlobalLayout";

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setCoverObj } = useContext(CoverContext);
  useEffect(() => {
    setTimeout(() => {
      setCoverObj((prev: any) => ({
        ...prev,
        title: "JSON格式化工具",
        text: "",
      }));
    }, 100);
  }, []);
  const handleFormat = () => {
    try {
      const parsedJson = JSON.parse(input);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      setError("");
    } catch (e) {
      setError("Invalid JSON. Please check your input.");
      setFormattedJson("");
    }
  };

  const handleClear = () => {
    setInput("");
    setFormattedJson("");
    setError("");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>JSON Formatter</h2>
      <textarea
        className={styles.textarea}
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div className={styles.actions}>
        <button className={styles.button} onClick={handleFormat}>
          Format JSON
        </button>
        <button className={styles.button} onClick={handleClear}>
          Clear
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {formattedJson && <pre className={styles.result}>{formattedJson}</pre>}
    </div>
  );
};

export default JsonFormatter;
