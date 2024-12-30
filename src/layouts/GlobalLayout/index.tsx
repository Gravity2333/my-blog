import Outlet from "@/libs/router/Outlet";
import styles from "./index.less";
import routes from "@config/router.js";
import GlobalPhtotHeader, { CoverParams } from "@/components/GlobalPhotoHeader";
import { createContext, useEffect, useRef, useState } from "react";
import { pathToRegexp } from "path-to-regexp";
import { getThemeColor } from "@/utils/color";
import ParticleBackground from "@/components/PartcalBackground";
import LoadingPage from "@/components/LoadingPage";
import Header from "./Header";

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
export default function GlobalLayout({ location, match }: any) {
  // console.log(routes)

  const contenRef = useRef<any>();
  const [coverObj, setCoverObj] = useState<CoverParams>();

  const [loading, setLoading] = useState(true);
  const [currentMatch, setCurrentMatch] = useState<any>();
  const [colorObj, setColorObj] = useState<MainColor>({
    dominantColor: "#4a90e2",
    palette: [],
  });
  const regexpMap = useRef<any>(new Map());

  useEffect(() => {
    (async () => {
      if (coverObj?.cover) {
        setColorObj(await getThemeColor(coverObj?.cover!));
      }
    })();
  }, [coverObj]);
  console.log(coverObj);
  useEffect(() => {
    setLoading(true);
    for (const r of routes?.children as any[]) {
      let regexp = regexpMap.current?.get(r.path);
      if (!regexp) {
        regexp = pathToRegexp(r.path || "", { end: false }).regexp;
        regexpMap.current.set(r.path, regexp);
      }
      if (regexp.exec(location.pathname)) {
        if (r.cover) {
          setLoading(false);
          setCurrentMatch(r.path);
          if (
            r.cover.cover !== coverObj?.cover ||
            r.cover.title !== coverObj?.title ||
            r.cover.text !== coverObj?.text
          ) {
            setCoverObj(parseRouteCover(r.cover));
          }

          return;
        }
      }
    }
    setLoading(false);
  }, [location]);

  return (
    <>
      <style>
        {`
          :root {
            --main-color: ${
              colorObj?.dominantColor ? colorObj?.dominantColor : "#4a90e2"
            };
            --header-color: ${
              colorObj?.palette[0] ? colorObj?.palette[0] : "#f5f7fa"
            };
            --header-font-color: ${
              colorObj?.palette[1]
                ? colorObj?.palette[1]
                : "rgb(128, 128, 128, 0.01)"
            };
            --content-bg-color: ${
              colorObj?.palette[colorObj?.palette?.length - 1]
                ? colorObj?.palette[colorObj?.palette?.length - 1]
                : "white"
            };
          }
          `}
      </style>
      <Header contenRef={contenRef} currentMatch={currentMatch} />
      <CoverContext.Provider
        value={{
          setCoverObj,
        }}
      >
        <ThemeContext.Provider value={colorObj!}>
          <div className={styles["page-container"]}>
            <ParticleBackground />
            <div className={styles["content"]} ref={contenRef}>
              {loading ? (
                <LoadingPage />
              ) : (
                <>
                  <GlobalPhtotHeader {...(coverObj as any)} />
                  <Outlet />
                </>
              )}
            </div>
          </div>
        </ThemeContext.Provider>
      </CoverContext.Provider>
    </>
  );
}
