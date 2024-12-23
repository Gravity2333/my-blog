import Outlet from "@/libs/router/Outlet";
import styles from "./index.less";
import useHistory from "@/libs/router/hooks/useHistory";
import routes from "@config/router.js";
import GlobalPhtotHeader, { CoverParams } from "@/components/GlobalPhotoHeader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { __DEFAULT_BACKGROUNDS__ } from "@/assets/backgrounds/desc";
import { pathToRegexp } from "path-to-regexp";
import { getThemeColor } from "@/utils/color";

const DEFAULT_COVER: CoverParams = {
  cover: __DEFAULT_BACKGROUNDS__["sunset"],
  title: "blog coderliu",
  text: "永远不要相信直觉！",
};

function parseRouteCover(cover: Record<string, any>) {
  return {
    cover: (__DEFAULT_BACKGROUNDS__ as any)[cover.name],
    title: cover.title,
    text: cover.text,
  };
}

export default function GlobalLayout({ location }: any) {
  const history = useHistory();
  const contenRef = useRef<any>();
  const [coverObj, setCoverObj] = useState<CoverParams>(DEFAULT_COVER);
  const [isScrolled, setIsScrolled] = useState(false);

  const [colorObj, setColorObj] = useState<{
    dominantColor: string;
    palette: string[];
  }>();

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (contenRef.current.scrollTop > 400) {
        // 滚动超过100px
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    contenRef.current.addEventListener("scroll", handleScroll);

    return () => {
      contenRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    (async () => {
      setColorObj(await getThemeColor(coverObj.cover!));
    })();
  }, [coverObj]);

  useEffect(() => {
    for (const r of routes?.children as any[]) {
      if (
        pathToRegexp(r.path || "", { end: false }).regexp.exec(
          location.pathname
        )
      ) {
        if (r.cover) {
          return setCoverObj(parseRouteCover(r.cover));
        }
      }
    }
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
          }
          `}
      </style>
      <div className={styles["page-container"]}>
        <header
          className={`${styles.header} ${
            isScrolled ? styles["header__scrolled"] : ""
          }`}
        >
          <div className={styles["header__tab"]}>
            {(routes?.children || [])
              .filter((route: any) => {
                return !!route.component;
              })
              .map((route: any) => {
                return (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(route.path);
                    }}
                  >
                    {route.name || route.path}
                  </a>
                );
              })}
          </div>
        </header>
        <div className={styles["content"]} ref={contenRef}>
          <GlobalPhtotHeader {...(coverObj as any)} />
          <Outlet />
        </div>
      </div>
    </>
  );
}