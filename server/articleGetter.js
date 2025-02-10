const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const fs = require('fs');
const path = require('path');
const download = require('download'); // 用于下载图片
const mime = require('mime-types'); // 用于获取文件 MIME 类型

// CSDN 文章 URL
const articleUrl = 'https://blog.csdn.net/weixin_40710412/article/details/145553550?spm=1001.2014.3001.5502';

// 获取文章内容并转换为 Markdown
const fetchAndConvertToMarkdown = async () => {
  try {
    // 请求文章页面
    const { data: html } = await axios.get(articleUrl);

    // 使用 Cheerio 加载 HTML
    const $ = cheerio.load(html);

    // 定位文章内容
    const articleTitle = $('h1.title-article').text().trim(); // 获取文章标题
    let articleContent = $('#content_views').html(); // 获取文章内容的 HTML

    if (!articleContent) {
      console.error('未找到文章内容，请检查选择器是否正确。');
      return;
    }

    // 提取图片链接并下载
    const imageUrls = [];
    $('img').each((index, img) => {
      const imgSrc = $(img).attr('src');
      if (imgSrc && imgSrc.startsWith('http')) {
        imageUrls.push(imgSrc);
      }
    });

    // 下载所有图片并转换为 Base64
    const downloadPromises = imageUrls.map(async (url) => {
      try {
        // 下载图片
        const buffer = await download(url);

        // 获取文件类型，默认为 'image/jpeg'
        const mimeType = mime.lookup(url) || 'image/jpeg';

        // 转换图片为 Base64
        const base64Data = buffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64Data}`;

        // 替换 HTML 中的图片 URL 为 Base64 编码的图片
        const regex = new RegExp(url, 'g');
        articleContent = articleContent.replace(regex, dataUri);

      } catch (error) {
        console.error('下载图片失败：', error);
      }
    });

    // 等待所有图片下载并替换
    await Promise.all(downloadPromises);

    // 使用 Turndown 将 HTML 转换为 Markdown
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(articleContent);

    // 替换非法文件名字符
    const safeTitle = articleTitle.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').slice(0, 100); // 限制长度为100字符以内
    const markdownFilePath = path.resolve(__dirname, `./src/blogs/${safeTitle}.md`);

    // 输出结果到文件
    fs.writeFileSync(markdownFilePath, `# ${articleTitle}\n\n${markdown}`, { encoding: 'utf-8', flag: 'w+' });

    console.log(`文章已成功转换为 Markdown，并保存为：${safeTitle}.md`);
  } catch (error) {
    console.error('获取文章内容失败：', error);
  }
};

// 执行函数
fetchAndConvertToMarkdown();
