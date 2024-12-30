import Outlet from "@/libs/router/Outlet";
import styles from "./index.less";
import routes from "@config/router.js";
import { createContext, useMemo } from "react";
import useHistory from "@/libs/router/hooks/useHistory";
import { pathToRegexp } from "path-to-regexp";

export const ThemeContext = createContext<MainColor>({
  dominantColor: "#4a90e2",
  palette: [],
} as any);

export function parseRouteCover(cover: Record<string, any>) {
  return {
    cover: cover.name,
    title: cover.title,
    text: cover.text,
  };
}

export type MainColor = {
  dominantColor: string;
  palette: string[];
};

export const CoverContext = createContext<{ setCoverObj: (c: any) => void }>(
  {} as any
);
export default function GlobalLayout({ match }: any) {
  // console.log(routes)
  const history = useHistory();
  const subRoute = useMemo(()=>{
    for (const r of routes?.children as any[]) {
      const regexp = pathToRegexp(r.path || "", { end: false }).regexp;
      if (regexp.exec(location.pathname)) {
        return r.children?.filter((c: any)=>!c?.redirect) || []
      }
    }
    return []
  },[])
  console.log(subRoute)
  return (
    <>
      <header className={`${styles.header}`}>
        <div className={styles["header__tab"]}>
          {(subRoute || [])
            .filter((route: any) => {
              return !!route.component || !!route.children;
            })
            .map((route: any) => {
              return (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(route.path);
                  }}
                  className={route.path === match.path ? styles.active : ""}
                >
                  {route.name || route.path}
                </a>
              );
            })}
        </div>
      </header>
      <Outlet />
    </>
  );
}
