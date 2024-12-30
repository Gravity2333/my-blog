import React from "react";
import styles from "./index.less"; // 假设你有样式文件
import BlogCard from "@/components/BlogCard";
import AuthorInfo from "@/components/AuthorInfo";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
       
      </div>
      <div className={styles.rightSide}>
        <AuthorInfo />
        <BlogCard />
      </div>
    </div>
  );
};

export default Home;
