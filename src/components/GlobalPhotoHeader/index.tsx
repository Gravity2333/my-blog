import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./index.less"; // 引入CSS模块
import SUNSET from "../../assets/backgrounds/sunset.webp";

export type CoverParams = {
  cover?: string;
  title?: string;
  text?: string;
};

const GlobalPhtotHeader: React.FC = ({
  cover = SUNSET,
  title = "blog coderliu",
  text = "永远不要相信直觉！",
}: CoverParams) => {
  const settings = {
    variableWidth: true, // 禁用可变宽度
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 自动播放
    autoplaySpeed: 3000, // 每3秒切换一次
    arrows: false, // 不需要左右箭头
    adaptiveHeight: true, // 高度自适应
    pauseOnHover: true, // 鼠标悬停时暂停
  };
  const sliderRef = useRef<Slider | null>(null);

  // 监听 cover 的变化
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.forceUpdate(); // 强制切换到第一个幻灯片
    }
  }, [cover]); // 每次 cover 变化时触发

  return (
    <div className={styles.carouselContainer}>
      <Slider ref={sliderRef} {...settings} adaptiveHeight>
        <div className={styles.slide}>
          <img src={cover} alt="Slide 2" />
          <div key={`${title} ${text}`} className={styles.textOverlay}>
            <p
              key={title}
              className={`${styles.typingEffect} ${styles["sentence1"]}`}
            >
              {title}
            </p>
            <p
              key={text}
              className={`${styles.typingEffect} ${styles["sentence2"]}`}
            >
              {text}
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default GlobalPhtotHeader;
