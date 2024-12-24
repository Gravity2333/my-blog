import React from "react";
import styles from "./index.less"; // 引入CSS模块
import AVATOR from "../../assets/avator.jpeg";
const AboutMe: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          className={styles.avatar}
          src={AVATOR}
          alt="Author Avatar"
        />
        <h1 className={styles.name}>小刘不知道叫啥</h1>
        <p className={styles.description}>Web Developer</p>
      </div>

      <div className={styles.right}>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/coderliu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <a
            href="mailto:coderliu@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            Email
          </a>
          <a
            href="weixin://"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            WeChat
          </a>
        </div>

        <h2 className={styles.sectionTitle}>Pinned Projects</h2>
        <div className={styles.projects}>
          <div className={styles.project}>
            <h3 className={styles.projectTitle}>Project One</h3>
            <p className={styles.projectDescription}>
              A powerful tool for automating workflows.
            </p>
            <a
              href="https://github.com/coderliu/project-one"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              View Project
            </a>
          </div>
          <div className={styles.project}>
            <h3 className={styles.projectTitle}>Project Two</h3>
            <p className={styles.projectDescription}>
              A sleek web app built with React and TypeScript.
            </p>
            <a
              href="https://github.com/coderliu/project-two"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              View Project
            </a>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
        <p className={styles.interests}>
          In my free time, I enjoy coding, exploring new web technologies, playing video games, and contributing to open source projects.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
