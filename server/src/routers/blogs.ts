import KoaRouter from "../lib/middlewares/koa-router/router";
import fs from "fs";
import path from "path";

// 创建路由
const blogRouter = new KoaRouter({});
// 设置前缀
blogRouter.get("/blogs", (ctx) => {
  const blogs = fs.readdirSync(path.resolve(__dirname, "../blogs"));
  ctx.type = "application/json";
  ctx.body = blogs.map((blog) => ({
    key: blog?.split(".")[0],
    name: blog?.split(".")[0],
  }));
});

blogRouter.get("/blogs/:id/detail", (ctx) => {
    const id = decodeURIComponent(ctx?.params?.id)
    const blog = fs.readFileSync(path.resolve(__dirname, `../blogs/${id}.md`));
    ctx.type = "application/octet-stream";
    ctx.body = blog
  });

export default blogRouter;
