import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 支持 GitHub 风格的扩展
import rehypeRaw from 'rehype-raw'; // 允许解析 HTML 标签
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'; // 代码高亮
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // 代码高亮样式
import styles from './index.less'; // 使用 CSS Modules 样式

// 自定义代码块渲染
const CodeBlock = ({ className, children }: any) => {
  return (
    <SyntaxHighlighter language={className} style={docco}>
      {children}
    </SyntaxHighlighter>
  );
};


const MarkdownLoader: React.FC<{ content: string }> = ({ content }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    setMarkdownContent(content);
  }, [content]);

  return (
    <div className={styles.container}>
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm]} // 启用 GitHub 风格扩展
        rehypePlugins={[rehypeRaw]} // 允许 HTML 标签渲染
        components={{
          img: ({ node, ...props }: any) => {
            const { src, alt } = props;

            // 获取 node 的 position 信息
            const { position } = node;


            // 使用 position.start 和 position.end 获取图片的 Base64 数据
            if (position && position.start && position.end) {
              // 获取图片 src 所在位置的字符串片段
              const base64Image = content.slice(position.start.offset+4, position.end.offset-1);
              
              // 如果是 Base64 图片，则直接渲染图片
              return (
                <img
                  {...props}
                  src={base64Image}  // 使用提取到的 Base64 图像数据
                  alt={alt || 'Markdown image'}
                  className={styles.img}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              );
            }

            // 如果没有找到 position 信息，返回一个普通的 img 标签
            return <img {...props} className={styles.img} alt={alt || 'Markdown image'} />;
          }
          ,
          code: CodeBlock, // 自定义代码块渲染
        }}
      />
    </div>
  );
};

export default MarkdownLoader;
