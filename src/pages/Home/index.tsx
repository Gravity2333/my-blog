import React from "react";
import styles from "./index.less"; // 假设你有样式文件
import BlogCard from "@/components/BlogCard";
import AuthorInfo from "@/components/AuthorInfo";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <div className={styles.rightSide}>
        <AuthorInfo />
      </div>
    </div>
  );
};

export default Home;
