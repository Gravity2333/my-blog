export default {
  path: "/",
  component: "../src/layouts/GlobalLayout",
  children: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "首页",
      component: "../src/pages/Home",
      cover: {
        name: "plant",
        title: "blog coderliu",
        text: "没什么是理所应当的，不要相信直觉！",
      },
    },
    {
      path: "/repositories",
      name: "仓库",
      component: "../src/pages/Projects",
      cover: {
        name: "code",
        title: "仓库",
        text: "知识与创意的存储空间",
      },
    },
    {
      path: "/articles",
      name: "文章",
      cover: {
        name: "sunrise",
        title: "博客",
        text: "在无声的文字中留下你与世界互动的痕迹。",
      },
      children: [
        {
          path: "/articles",
          redirect: "/articles/list",
        },
        {
          path: "/articles/list",
          name: "列表",
          component: "../src/pages/Articles",
        },
        {
          path: "/articles/:id/preview",
          name: "内容",
          component: "../src/pages/Articles/components/Preview",
        },
        {
          component: "../src/components/NotFoundPage", 
          cover: {
            name: "PINEFOREST",
            title: "走错了？",
            text: "history.go(-1)!!",
          },
        },
      ]
    },
    {
      path: "/about",
      name: "关于作者",
      component: "../src/pages/About",
      cover: {
        name: "darkForest",
        title: "关于作者",
        text: "你好，很高兴认识你！",
      },
    },
    {
      component: "../src/components/NotFoundPage", 
      cover: {
        name: "PINEFOREST",
        title: "走错了？",
        text: "history.go(-1)!!",
      },
    },
  ],
};
