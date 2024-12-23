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
        name: "sunset",
        title: "blog coderliu",
        text: "永远不要相信直觉！",
      },
    },
    {
      path: "/articles",
      name: "文章",
      component: "../src/pages/Docs",
      cover: {
        name: "smokeForest",
        title: "开发文档",
        text: "开发文档!",
      },
    },
    {
      path: "/about",
      name: "关于",
      component: "../src/pages/About",
      cover: {
        name: "darkForest",
        title: "关于作者",
        text: "关于作者!",
      },
    },
    {
      component: "../src/components/NotFoundPage",
    },
  ],
};
