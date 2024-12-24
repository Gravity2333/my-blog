import React from "react";
import useHistory from "@/libs/router/hooks/useHistory";
import styles from "./index.less"; // 引入样式文件

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  // 返回首页函数
  const handleGoHome = () => {
    history.push("/"); // 跳转到首页
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>页面未找到</p>
        <p className={styles.description}>
          抱歉，您访问的页面不存在。可能是链接错误或页面已被删除。
        </p>
        
        <div className={styles.actions}>
          <button onClick={()=>{
            history.push('/')
          }} className={styles.homeButton}>
            返回首页
          </button>
          {/* 你也可以添加更多链接，如搜索、查看最新文章等 */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
