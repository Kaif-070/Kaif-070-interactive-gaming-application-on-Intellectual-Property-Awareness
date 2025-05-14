import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BasicDragDrop.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const correctSound = new Audio("/sounds/correct.mp3");
const incorrectSound = new Audio("/sounds/incorrect.mp3");

const LEVELS = {
  basic: {
    timeLimit: 30,
    items: [
      { id: 1, term: "Patent", matched: false },
      { id: 2, term: "Trademark", matched: false },
      { id: 3, term: "Copyright", matched: false },
      { id: 4, term: "Design", matched: false }
    ],
    dropZones: [
      { id: 1, definition: "Protects inventions", correctTerm: "Patent" },
      { id: 2, definition: "Protects brand names/logos", correctTerm: "Trademark" },
      { id: 3, definition: "Protects creative works", correctTerm: "Copyright" },
      { id: 4, definition: "Protects product appearance", correctTerm: "Design" }
    ]
  },
  intermediate: {
    timeLimit: 25,
    items: [
      { id: 1, term: "Trade Secret", matched: false },
      { id: 2, term: "Fair Use", matched: false },
      { id: 3, term: "Geographical Indication", matched: false },
      { id: 4, term: "Moral Rights", matched: false }
    ],
    dropZones: [
      { id: 1, definition: "Protects confidential business information", correctTerm: "Trade Secret" },
      { id: 2, definition: "Allows limited use of copyrighted material", correctTerm: "Fair Use" },
      { id: 3, definition: "Protects regional product identities", correctTerm: "Geographical Indication" },
      { id: 4, definition: "Protects an author's personal rights over their work", correctTerm: "Moral Rights" }
    ]
  },
  advanced: {
    timeLimit: 20,
    items: [
      { id: 1, term: "Industrial Design", matched: false },
      { id: 2, term: "Plant Breeders' Rights", matched: false },
      { id: 3, term: "Collective Trademark", matched: false },
      { id: 4, term: "Compulsory License", matched: false }
    ],
    dropZones: [
      { id: 1, definition: "Protects the visual design of objects", correctTerm: "Industrial Design" },
      { id: 2, definition: "Grants rights for new plant varieties", correctTerm: "Plant Breeders' Rights" },
      { id: 3, definition: "Trademark owned by an organization", correctTerm: "Collective Trademark" },
      { id: 4, definition: "Government allows use of a patent without owner consent", correctTerm: "Compulsory License" }
    ]
  }
};

const BasicDragDrop = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(Number(localStorage.getItem("points")) || 0);
  const [level, setLevel] = useState("basic");
  const [items, setItems] = useState(LEVELS[level].items);
  const [dropZones, setDropZones] = useState(LEVELS[level].dropZones);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(LEVELS[level].timeLimit);
  const [incorrectDrop, setIncorrectDrop] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintPair, setHintPair] = useState(null);
  const [achievement, setAchievement] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      alert("Time's up! Try again.");
      restartGame(level);
    }
  }, [timeLeft, gameOver]);

  const onDragStart = (e, term) => {
    e.dataTransfer.setData("term", term);
  };

  const onDrop = (e, dropZoneId) => {
    const draggedTerm = e.dataTransfer.getData("term");
    const dropZone = dropZones.find((dz) => dz.id === dropZoneId);

    if (dropZone.correctTerm === draggedTerm) {
      correctSound.play();

      setItems((prev) =>
        prev.map((item) =>
          item.term === draggedTerm ? { ...item, matched: true } : item
        )
      );

      setScore((prevScore) => {
        const newScore = prevScore + 1;

      
        const updatedPoints = points + 10;
        setPoints(updatedPoints);
        localStorage.setItem("points", updatedPoints);

      
        const username = localStorage.getItem("username");
        if (username) {
          axios.post("http://localhost:5000/api/points/update", {
            username,
            points: updatedPoints,
          }).catch((err) => console.error("Error updating points:", err));
        }

        
        if (newScore === items.length) {
          handleLevelCompletion();
        }

        return newScore;
      });
    } else {
      incorrectSound.play();
      setIncorrectDrop(dropZoneId);
      setTimeout(() => setIncorrectDrop(null), 500);
    }
  };

  const handleLevelCompletion = () => {
    setGameOver(true);

    if (timeLeft > 20) {
      setAchievement(true);
    }

    setTimeout(() => {
      if (level === "advanced") {
        alert("🎉 Congrats! You have completed all levels!");
        navigate("/");
      } else {
        alert(`🎉 Congrats! Level ${level.toUpperCase()} completed!`);
        if (level === "basic") {
          setLevel("intermediate");
          restartGame("intermediate");
        } else if (level === "intermediate") {
          setLevel("advanced");
          restartGame("advanced");
        }
      }
    }, 500);
  };

  const useHint = () => {
    if (!hintUsed) {
      const unmatchedPair = dropZones.find((zone) =>
        items.some((item) => item.term === zone.correctTerm && !item.matched)
      );

      if (unmatchedPair) {
        setHintPair(unmatchedPair);
        setHintUsed(true);
        setTimeout(() => setHintPair(null), 3000);
      }
    }
  };

  const restartGame = (newLevel) => {
    setItems(LEVELS[newLevel].items.map((item) => ({ ...item, matched: false })));
    setDropZones(LEVELS[newLevel].dropZones);
    setScore(0);
    setGameOver(false);
    setTimeLeft(LEVELS[newLevel].timeLimit);
    setHintUsed(false);
    setHintPair(null);
    setAchievement(false);
  };

  return (
    <>
      <Header />
      <div className="game-container">
        <h2>{level.toUpperCase()} Level - Drag & Drop</h2>
        <p>Match the IP terms with their correct definitions!</p>
        <p className={timeLeft <= 10 ? "warning-text" : ""}>Time Left: {timeLeft} seconds</p>

        <div className="timer-container">
          <div className={`timer-bar ${timeLeft <= 10 ? "blink-red" : ""}`} style={{ width: `${(timeLeft / LEVELS[level].timeLimit) * 100}%` }}></div>
        </div>

        <div className="drag-container">
          {items.map((item) => (
            <div key={item.id}
              draggable={!item.matched}
              onDragStart={(e) => onDragStart(e, item.term)}
              className={`drag-item ${item.matched ? "matched" : hintPair?.correctTerm === item.term ? "hint-highlight" : ""}`}>
              {item.term}
            </div>
          ))}
        </div>

        <div className="drop-container">
          {dropZones.map((zone) => (
            <div key={zone.id}
              className={`drop-zone ${incorrectDrop === zone.id ? "incorrect" : hintPair?.id === zone.id ? "hint-highlight" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, zone.id)}>
              {zone.definition}
            </div>
          ))}
        </div>

        {achievement && <div className="achievement">🏆 <strong>Speed Master!</strong> Completed under 20 seconds!</div>}

        <div className="buttons">
          <button onClick={() => navigate("/")} className="btn back">🔙 Back to Game Modes</button>
          <button onClick={() => restartGame(level)}>🔄 Restart</button>
          <button onClick={useHint} disabled={hintUsed}>💡 Use Hint {hintUsed && "✔"}</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BasicDragDrop;
