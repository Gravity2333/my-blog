import { useLayoutEffect, useRef, useState } from "react";
import styles from "./index.less";
import useHistory from "@/libs/router/hooks/useHistory";
import routes from "@config/router.js";

export default function ({
  contenRef,
  currentMatch,
}: {
  contenRef: any;
  currentMatch: any;
}) {
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (contenRef.current.scrollTop > 350) {
        // 滚动超过100px
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    setTimeout(() => {
      contenRef.current.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      contenRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles["header__scrolled"] : ""
      }`}
    >
      <div className={styles["header__tab"]}>
        {(routes?.children || [])
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
                className={route.path === currentMatch ? styles.active : ""}
              >
                {route.name || route.path}
              </a>
            );
          })}
      </div>
    </header>
  );
}
