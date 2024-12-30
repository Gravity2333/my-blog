import React, { useEffect, useState } from "react";
import styles from "./index.less"; // 引入CSS模块
import AVATOR from "../../assets/avator.jpeg";
import LoadingPage from "@/components/LoadingPage";
import { getTopProjects } from "@/services/projects";

const AboutMe: React.FC = () => {
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true); // 开始加载
    (async () => {
      const { success, data } = await getTopProjects();
      if (success) {
        setPinnedRepos(data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.avatar} src={AVATOR} alt="Author Avatar" />
        <h1 className={styles.name}>小刘不知道叫啥</h1>
        <p className={styles.description}>Web Developer</p>
        <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
        <div className={styles.interestsContainer}>
          <ul className={styles.interestsList}>
            <li>🚴‍♂️ Cycling</li>
            <li>🏃‍♂️ Marathon Running</li>
            <li>🏊‍♂️ Triathlon</li>
            <li>🏞️ Trail Running</li>
            <li>📸 Photography</li>
            <li>🚗 Driving</li>
          </ul>
        </div>
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
            href="mailto:1491310384@qq.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            邮件
          </a>
          <a
            href="weixin://ze9522"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            微信
          </a>
        </div>

        <h2 className={styles.sectionTitle}>置顶项目</h2>
        <div className={styles.projects}>
          {loading ? (
            <LoadingPage />
          ) : (
            pinnedRepos.map((repo) => (
              <div key={repo.id} className={styles.project}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectTitle}
                >
                  {repo.name}
                </a>
                <p className={styles.projectDescription}>
                  {repo.description || "No description provided."}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
