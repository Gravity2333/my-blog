import React, { useEffect, useState } from "react";
import styles from "./index.less"; // 引入CSS模块
import AVATOR from "../../assets/avator.jpeg";
import { GIT_TOKEN } from "../Projects";
import LoadingPage from "@/components/LoadingPage";

const AboutMe: React.FC = () => {
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true); // 开始加载
    const query = `
    {
      user(login: "Gravity2333") {
        pinnedItems(first: 10) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              owner {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
    `;

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GIT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPinnedRepos(data.data.user.pinnedItems.nodes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pinned repos:", error);
        setPinnedRepos([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.avatar} src={AVATOR} alt="Author Avatar" />
        <h1 className={styles.name}>小刘不知道叫啥</h1>
        <p className={styles.description}>Web Developer</p>
        <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
        <div className={styles.interestsContainer}>
          <p className={styles.interests}>
            In my free time, I enjoy coding, exploring new web technologies,
            playing video games, and contributing to open source projects.
          </p>
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
