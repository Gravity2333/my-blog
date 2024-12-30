import { useEffect, useState } from "react";
import styles from "./index.less";
import { getAllBlogs } from "@/services/blogs";
import LoadingPage from "../LoadingPage";

export default function BlogCard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<{ name: string; key: string }[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, data } = await getAllBlogs();
      if (success) {
        setBlogs(data.slice(0, 10));
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className={styles.leftCard}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>推荐文章</h3>
        {loading ? (
          <LoadingPage />
        ) : (
          <ul className={styles.blogList}>
            {blogs.map((blog: any) => (
              <li key={blog.key} className={styles.blogItem}>
                <a
                  href={`/articles/${blog.key}/preview`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.blogLink}
                >
                  {blog.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
