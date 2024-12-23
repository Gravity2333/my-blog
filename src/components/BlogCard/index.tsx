import styles from './index.less'
export default function BlogCard(){
    return (
        <div className={styles.leftCard}>
          <div className={styles.card}>
            <h3>推荐文章</h3>
            <ul>
              <li><a href="#">如何开始使用React</a></li>
              <li><a href="#">前端开发最佳实践</a></li>
              <li><a href="#">提升工作效率的工具</a></li>
            </ul>
          </div>
        </div>
      );
    }