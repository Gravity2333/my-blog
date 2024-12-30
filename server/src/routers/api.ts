import KoaRouter from "../lib/middlewares/koa-router/router";
import blogRouter from "./blogs";
import projectRouter from "./projects";
// 创建路由
const apiRouter = new KoaRouter({});
// 设置前缀
apiRouter.prefix("/api/");

apiRouter.use(blogRouter.routes())
apiRouter.use(projectRouter.routes())

export default apiRouter;
