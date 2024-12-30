import KoaRouter from "../lib/middlewares/koa-router/router";
import https from "https";

export const GIT_TOKEN =
  "";

function fetchGitHubRepos(
  sortedBy: string,
  sortDirection: "asc" | "desc",
  searchTerm?: string
) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${GIT_TOKEN}`,
      "User-Agent": "Node.js", // GitHub API 要求的 User-Agent
    },
  };

  return new Promise((resolve, reject) => {
    https
      .get(
        searchTerm
          ? `https://api.github.com/search/repositories?q=${encodeURIComponent(
              searchTerm
            )}+user:Gravity2333`
          : `https://api.github.com/users/Gravity2333/repos`,
        options,
        (res) => {
          let data = "";

          // 收集数据块
          res.on("data", (chunk) => {
            data += chunk;
          });

          // 数据接收完成
          res.on("end", () => {
            try {
              const repos = JSON.parse(data);

              // 对数据排序
              const sortedRepos = repos.sort((a: any, b: any) => {
                const dateA = new Date(a[sortedBy]).getTime();
                const dateB = new Date(b[sortedBy]).getTime();
                return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
              });

              resolve(sortedRepos);
            } catch (error) {
              reject(new Error("Failed to parse response JSON"));
            }
          });
        }
      )
      .on("error", (err) => {
        reject(err);
      });
  });
}

const fetchPinnedRepos = async () => {
  const query = `
    {
      user(login: "Gravity2333") {
        pinnedItems(first: 10) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              owner {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GIT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();
  return result.data.user.pinnedItems.nodes;
};
// 创建路由
const projectRouter = new KoaRouter({});
// 设置前缀
projectRouter.get("/projects", async (ctx, next) => {
  ctx.type = "application/json";
  const reps = await fetchGitHubRepos(
    ctx.query?.sortedBy,
    ctx.query?.sortDirection
  );
  ctx.body = reps;
  next();
});

projectRouter.get("/projects/top", async (ctx, next) => {
  ctx.type = "application/json";
  const reps = await fetchPinnedRepos();
  ctx.body = reps;
  next();
});

export default projectRouter;
