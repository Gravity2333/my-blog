import React, { useContext, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ThemeContext } from "@/layouts/GlobalLayout";

const ParticleBackground = () => {
    const {dominantColor} = useContext(ThemeContext)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
  }, []);

  const particlesLoaded = (container: any) => {
    console.log(container);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0, // 将粒子背景固定在底部
        left: 0,
        top: 0,
        width: "100%", // 可以根据需要设置宽度
        height: "1000px",
        zIndex: 0, // 将粒子背景放置在最底层
      }}
    >
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded as any}
        options={{
          particles: {
            color: {
              value: dominantColor, // 雪花的颜色
            },
            number: {
              value: 200, // 设置雪花的数量
              density: {
                enable: true,
              },
            },
            size: {
              value: 3, // 雪花的大小
            },
            opacity: {
              value: 0.6, // 雪花的透明度
            },
            shape: {
              type: "circle", // 使用圆形作为雪花的形状
            },
            move: {
              enable: true,
              speed: 1, // 雪花下落的速度
              direction: "bottom", // 垂直下落
              random: true, // 随机方向
              straight: false, // 使雪花不沿直线下落
              outModes: {
                default: "out", // 雪花超出视口后消失
              },
            },
          },
          detectRetina: true,
          fullScreen: {
            enable: false,
            zIndex: -10,
          },
        }}
      />
    </div>
  );
};

export default ParticleBackground;
