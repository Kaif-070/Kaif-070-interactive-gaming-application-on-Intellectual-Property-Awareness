import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clickSound from "/sounds/click.mp3";
import snapSound from "/sounds/snap.mp3";
import cheerSound from "/sounds/cheer.mp3";
import confetti from "canvas-confetti"; 
import "./JigsawPuzzle.css";

const JigsawPuzzle = () => {
  const images = {
    basic: "/images/puzzle-basic.png",
    intermediate: "/images/puzzle-intermediate.jpg",
    advanced: "/images/puzzle-advanced.jpg",
  };

  const navigate = useNavigate();
  const [gridSize, setGridSize] = useState(3);
  const [pieceSize, setPieceSize] = useState(100);
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [draggingPiece, setDraggingPiece] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = useState(images.basic);
  const [isCompleted, setIsCompleted] = useState(false);

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  const handleLevelChange = (level) => {
    if (level === "basic") {
      setGridSize(3);
      setPieceSize(100);
      setImageSrc(images.basic);
    } else if (level === "intermediate") {
      setGridSize(4);
      setPieceSize(75);
      setImageSrc(images.intermediate);
    } else if (level === "advanced") {
      setGridSize(5);
      setPieceSize(60);
      setImageSrc(images.advanced);
    }
    setIsCompleted(false);
    generatePuzzlePieces();
  };

  const generatePuzzlePieces = () => {
    let pieces = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        pieces.push({
          id: row * gridSize + col,
          correctX: col * pieceSize,
          correctY: row * pieceSize,
          currentX: Math.random() * 300,
          currentY: Math.random() * 300,
          placed: false,
        });
      }
    }
    setPuzzlePieces(pieces);
  };

  const shufflePieces = () => {
    setIsCompleted(false);
    setPuzzlePieces((prevPieces) =>
      prevPieces.map((piece) => ({
        ...piece,
        currentX: Math.random() * 300,
        currentY: Math.random() * 300,
        placed: false,
      }))
    );
  };

  useEffect(() => {
    generatePuzzlePieces();
  }, [gridSize]);

  const handleDragStart = (e, id) => {
    playSound(clickSound);
    const piece = puzzlePieces.find((p) => p.id === id);
    setDraggingPiece(id);
    setOffset({ x: e.clientX - piece.currentX, y: e.clientY - piece.currentY });
  };

  const handleDrag = (e) => {
    if (draggingPiece === null) return;
    setPuzzlePieces((prev) =>
      prev.map((piece) =>
        piece.id === draggingPiece
          ? { ...piece, currentX: e.clientX - offset.x, currentY: e.clientY - offset.y }
          : piece
      )
    );
  };

  const handleDragEnd = () => {
    setPuzzlePieces((prev) => {
      const updatedPieces = prev.map((piece) => {
        if (piece.id === draggingPiece) {
          const isClose =
            Math.abs(piece.currentX - piece.correctX) < 15 &&
            Math.abs(piece.currentY - piece.correctY) < 15;
          if (isClose) {
            playSound(snapSound);
            return {
              ...piece,
              currentX: piece.correctX,
              currentY: piece.correctY,
              placed: true,
            };
          }
        }
        return piece;
      });

      if (updatedPieces.every((piece) => piece.placed)) {
        setIsCompleted(true);
        playSound(cheerSound);
        triggerConfetti(); 
      }
      return updatedPieces;
    });
    setDraggingPiece(null);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="jigsaw-game-wrapper">

      <div className="jigsaw-game-level-selection">
        <button onClick={() => handleLevelChange("basic")}>Basic</button>
        <button onClick={() => handleLevelChange("intermediate")}>Intermediate</button>
        <button onClick={() => handleLevelChange("advanced")}>Advanced</button>
      </div>

      <div className="jigsaw-game-content">
        <div className="jigsaw-game-reference-image">
          <p>Reference Image</p>
          <img src={imageSrc} alt="Reference" style={{ width: gridSize * pieceSize, height: gridSize * pieceSize }} />
        </div>

        <div className="jigsaw-game-puzzle-game" onMouseMove={handleDrag} onMouseUp={handleDragEnd}>
          <p>Puzzle</p>
          <div className="jigsaw-game-puzzle-container" style={{ width: gridSize * pieceSize, height: gridSize * pieceSize }}>
            {puzzlePieces.map((piece) => (
              <div
                key={piece.id}
                className={`jigsaw-game-puzzle-piece ${piece.placed ? "placed" : ""}`}
                style={{
                  width: pieceSize,
                  height: pieceSize,
                  backgroundImage: `url(${imageSrc})`,
                  backgroundPosition: `-${piece.correctX}px -${piece.correctY}px`,
                  backgroundSize: `${gridSize * pieceSize}px ${gridSize * pieceSize}px`,
                  left: `${piece.currentX}px`,
                  top: `${piece.currentY}px`,
                }}
                onMouseDown={(e) => handleDragStart(e, piece.id)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="jigsaw-game-buttons">
        <button className="jigsaw-game-shuffle-btn" onClick={shufflePieces}>Shuffle</button>
        <button className="jigsaw-game-back-btn" onClick={() => navigate("/")}>Back to Modes</button>
      </div>

      {isCompleted && <div className="celebration-popup">🎉 Puzzle Completed! 🎉</div>}
    </div>
  );
};

export default JigsawPuzzle;
