import React from "react";
import MarkdownLoader from "@/components/MarkDownLoader";
import useParams from "@/libs/router/hooks/useParams";
import blogs from "../../contents/constants";
import styles from "./index.less"; // 引入样式文件
import useHistory from "@/libs/router/hooks/useHistory";

export default function Preview() {
  const params = useParams();
  const history = useHistory(); // 使用 history 跳转页面

  // 返回按钮点击事件
  const handleBack = () => {
    history.back(); // 返回上一页
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        &#8592; 返回
      </button>
      <div className={styles.content}>
        <MarkdownLoader content={blogs[params.id]?.content} />
      </div>
    </div>
  );
}
