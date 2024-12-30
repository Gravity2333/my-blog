import React from "react";
import styles from "./index.less";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.tech}>
          <h3>Powered By</h3>
        </div>
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="https://github.com/Gravity2333" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
