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
        name: "darkForest",
        title: "blog coderliu",
        text: "不要相信直觉！",
      },
    },
    {
      path: "/repositories",
      name: "仓库",
      component: "../src/pages/Projects",
      cover: {
        name: "code",
        title: "仓库",
        text: "",
      },
    },
    {
      path: "/articles",
      name: "文章",
      component: "../src/pages/Docs",
      cover: {
        name: "sunrise",
        title: "博客",
        text: "",
      },
    },
    {
      path: "/about",
      name: "关于作者",
      component: "../src/pages/About",
      cover: {
        name: "plant",
        title: "关于作者",
        text: "",
      },
    },
    {
      component: "../src/components/NotFoundPage",
    },
  ],
};
