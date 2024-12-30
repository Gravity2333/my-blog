import React, { useEffect, useRef, useState } from "react";
import styles from "./index.less";

const DinoGame: React.FC = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [dinoJump, setDinoJump] = useState(false);
  const [obstacles, setObstacles] = useState<{ x: number }[]>([]);

  const gameIntervalRef = useRef<NodeJS.Timer | null>(null);
  const obstacleIntervalRef = useRef<NodeJS.Timer | null>(null);
  const dinoYRef = useRef(0);

  const groundHeight = 150;

  const startGame = () => {
    setIsGameOver(false);
    setScore(0);
    setObstacles([]);
    dinoYRef.current = 0;

    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current as any);
    if (obstacleIntervalRef.current) clearInterval(obstacleIntervalRef.current as any);

    // Main game loop
    gameIntervalRef.current = setInterval(() => {
      setScore((prev) => prev + 1);

      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x - 5 }))
          .filter((obs) => obs.x > -50)
      );

      // Check collision
      const dinoBottom = 100 - dinoYRef.current;
      const collision = obstacles.some(
        (obs) => obs.x < 50 + 40 && obs.x + 20 > 50 && dinoBottom >= groundHeight - 20
      );

      if (collision) {
        setIsGameOver(true);
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current as any);
        if (obstacleIntervalRef.current) clearInterval(obstacleIntervalRef.current as any);
      }
    }, 20);

    // Spawn obstacles
    obstacleIntervalRef.current = setInterval(() => {
      setObstacles((prev) => [...prev, { x: 800 }]);
    }, 1500);
  };

  const handleJump = () => {
    if (dinoJump || isGameOver) return;

    setDinoJump(true);
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
      jumpHeight += 5;
      dinoYRef.current = jumpHeight;

      if (jumpHeight >= 50) {
        clearInterval(jumpInterval);

        // Fall down
        const fallInterval = setInterval(() => {
          jumpHeight -= 5;
          dinoYRef.current = jumpHeight;
          if (jumpHeight <= 0) {
            clearInterval(fallInterval);
            setDinoJump(false);
          }
        }, 20);
      }
    }, 20);
  };

  useEffect(() => {
    startGame();
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current as any);
      if (obstacleIntervalRef.current) clearInterval(obstacleIntervalRef.current as any);
    };
  }, []);

  return (
    <div className={styles.gameContainer} onClick={handleJump}>
      <div className={styles.score}>Score: {score}</div>
      <div className={styles.ground}>
        <div
          className={`${styles.dino} ${dinoJump ? styles.dinoJump : ""}`}
          style={{ bottom: `${100 + dinoYRef.current}px` }}
        ></div>
        {obstacles.map((obs, index) => (
          <div
            key={index}
            className={styles.obstacle}
            style={{ left: `${obs.x}px` }}
          ></div>
        ))}
      </div>
      {isGameOver && (
        <div className={styles.gameOver}>
          <h2>Game Over</h2>
          <button onClick={startGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default DinoGame;
