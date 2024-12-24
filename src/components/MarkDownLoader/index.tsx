import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 支持 GitHub 风格的扩展
import rehypeRaw from 'rehype-raw'; // 允许解析 HTML 标签
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'; // 代码高亮
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // 代码高亮样式
import styles from './index.less'; // 使用 CSS Modules 样式

// 自定义代码块渲染
const CodeBlock = ({className,children}: any) => {
  return <SyntaxHighlighter language={className} style={docco}>
    {children}
  </SyntaxHighlighter>
}



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
          img: ({ node, ...props }) => (
            <img
              {...props}
              className={styles.img} // 使用 CSS Modules 样式
              alt="Markdown image"
            />
          ),
          code: CodeBlock, // 自定义代码块渲染
        }}
      />
    </div>
  );
};

export default MarkdownLoader;
