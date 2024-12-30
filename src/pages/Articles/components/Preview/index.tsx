import React, { useContext, useEffect, useState } from "react";
import MarkdownLoader from "@/components/MarkDownLoader";
import useParams from "@/libs/router/hooks/useParams";
import styles from "./index.less"; // 引入样式文件
import useHistory from "@/libs/router/hooks/useHistory";
import { getBlogDetail } from "@/services/blogs";
import { CoverContext, parseRouteCover } from "@/layouts/GlobalLayout";
import LoadingPage from "@/components/LoadingPage";

export default function Preview() {
  const params = useParams();
  const history = useHistory(); // 使用 history 跳转页面
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setCoverObj } = useContext(CoverContext);
  // 返回按钮点击事件
  const handleBack = () => {
    history.back(); // 返回上一页
  };

  useEffect(() => {
    setLoading(true);
    const id = decodeURIComponent(params.id) || "blog";

    setTimeout(() => {
      setCoverObj(
        parseRouteCover({
          title: id,
          text: "",
          name: "life",
        })
      );
    }, 100);

    (async () => {
      const { success, data } = await getBlogDetail(id);
      if (success) {
        setDetails(data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        &#8592; 返回
      </button>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className={styles.content}>
          <MarkdownLoader content={details} />
        </div>
      )}
    </div>
  );
}
