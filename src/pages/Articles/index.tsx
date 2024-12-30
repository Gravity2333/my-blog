import React, { useEffect, useState } from "react";
import styles from "./index.less";
import useHistory from "@/libs/router/hooks/useHistory";
import { getAllBlogs } from "@/services/blogs";

const PAGE_SIZE = 10; // 每页显示的博客数量

const DocPage: React.FC = () => {
  const history = useHistory();
  const [blogs, setBlogs] = useState<{ name: string; key: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => {
      const { success, data } = await getAllBlogs();
      if (success) {
        setBlogs(data);
        setTotalPages(Math.ceil(data.length / PAGE_SIZE));
      }
    })();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className={styles.container}>
      <ul className={styles.blogList}>
        {paginatedBlogs.map((blog) => (
          <li
            key={blog.key}
            className={styles.blogItem}
            onClick={() => {
              history.push(`/articles/${blog.key}/preview`);
            }}
          >
            <h2 className={styles.blogTitle}>{blog.name}</h2>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocPage;
