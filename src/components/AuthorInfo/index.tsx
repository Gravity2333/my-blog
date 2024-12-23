import styles from "./index.less";
import AVATOR from "../../assets/avator.jpeg";
import GitHubIcon from "@/assets/icons/git";

export default function AuthorInfo() {
  return (
    <div className={styles.authorCard}>
      {/* 头像和基本信息 */}
      <div className={styles.header}>
        <img
          src={AVATOR} // 替换成你的头像链接
          alt="作者头像"
          className={styles.avatar}
        />
        <h2 className={styles.name}>小刘不知道叫啥</h2>
        <p className={styles.signature}>Life will find its way</p>
      </div>

      {/* 统计信息 */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p className={styles.statNumber}>54</p>
          <p className={styles.statLabel}>文章</p>
        </div>
        <div className={styles.statItem}>
          <p className={styles.statNumber}>25</p>
          <p className={styles.statLabel}>标签</p>
        </div>
        <div className={styles.statItem}>
          <p className={styles.statNumber}>13</p>
          <p className={styles.statLabel}>分类</p>
        </div>
      </div>

      {/* 按钮和社交链接 */}
      <div className={styles.actions}>
        <div>
          <button
            className={styles.followButton}
            onClick={() => {
              window.location.href = "https://github.com/Gravity2333";
            }}
          >
            <GitHubIcon />
            <span> Follow Me</span>
          </button>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="iconfont icon-github"></i>
          </a>
          <a href="mailto:coderpeng@example.com">
            <i className="iconfont icon-mail"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
