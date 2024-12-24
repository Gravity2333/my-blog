import LoadingPage from "./components/LoadingPage";
import useRoutes from "./libs/router/hooks/useRoutes";
import routes from "../config/router.js";
import BrowserRouter from "./libs/router/BrowserRouter";

function App() {
  /** 请在config/route.js 配置路由 */
  return (
    <BrowserRouter loadingPage={<LoadingPage />}>{useRoutes(routes)}</BrowserRouter>
  );
}

export default App;
