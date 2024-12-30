import React, { useEffect } from "react";
import styles from "./index.less";
import blogs, { CSDNArticles } from './contents/constants'
import useHistory from "@/libs/router/hooks/useHistory";

const DocPage: React.FC = () => {

  const history = useHistory()
  // 监听 hash 的变化
  useEffect(() => {
    // 监听 hash 跳转时自动滚动
    const handleHashChange = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // 组件卸载时移除监听
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.blogList}>
        {Object.keys(blogs).map((key) => {
          const blog = blogs[key]
          return <div key={blog.title} className={styles.blogItem} onClick={()=>{
            history.push(`/articles/${blog.key}/preview`)
          }}>
            <div className={styles.cover}>
              <img src={blog.cover} alt={blog.title} />
            </div>
            <div className={styles.info}>
              <h2 className={styles.blogTitle}>{blog.title}</h2>
            </div>
          </div>
        })}
        {
          CSDNArticles.map((article) => {
            return <div key={article.title} className={styles.blogItem} onClick={()=>{
              window.open(article.url)
            }}>
              <div className={styles.cover}>
                <img src={article.cover} alt={article.title} />
              </div>
              <div className={styles.info}>
                <h2 className={styles.blogTitle}>{article.title}</h2>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default DocPage;
