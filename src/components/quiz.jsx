import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizMode.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const questions = {
  basic: [
    {
      question: "What does IP stand for in Intellectual Property?",
      options: ["Internet Protocol", "Intellectual Property", "Industrial Process", "International Patent"],
      answer: "Intellectual Property",
      hint: "It protects creations like patents and trademarks.",
    },
    {
      question: "Which of these is NOT a type of Intellectual Property?",
      options: ["Trademark", "Patent", "Copyright", "Land Ownership"],
      answer: "Land Ownership",
      hint: "Think about legal protections for creative and industrial ideas.",
    },
  ],
  intermediate: [
    {
      question: "How long does a copyright generally last?",
      options: ["10 years", "25 years", "50 years", "Author's life + 70 years"],
      answer: "Author's life + 70 years",
      hint: "It extends beyond the author's lifetime.",
    },
    {
      question: "What is a Patent used for?",
      options: ["Protecting brand names", "Protecting an invention", "Protecting creative works", "None of these"],
      answer: "Protecting an invention",
      hint: "It grants exclusive rights to inventors.",
    },
  ],
  advanced: [
    {
      question: "Which international agreement governs global patents?",
      options: ["Berne Convention", "Madrid Protocol", "Patent Cooperation Treaty", "WIPO Copyright Treaty"],
      answer: "Patent Cooperation Treaty",
      hint: "It's an agreement related to patent cooperation.",
    },
    {
      question: "Which symbol represents a registered trademark?",
      options: ["™", "©", "®", "℗"],
      answer: "®",
      hint: "This symbol is only used for officially registered trademarks.",
    },
  ],
};

const QuizMode = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState("basic");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [achievements, setAchievements] = useState([]); 

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const nextQuestion = () => {
    if (selectedAnswer === questions[level][currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions[level].length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setRemovedOptions([]);
    } else {
      checkAchievements();
      setShowResult(true);
    }
  };

  const checkAchievements = () => {
    let newAchievements = [];

    if (score + 1 === questions[level].length) {
      newAchievements.push("🏆 Perfect Score - Answered all correctly!");
    }

    if (!hintUsed) {
      newAchievements.push("🎖️ No Hint Master - Completed without using hints!");
    }

    setAchievements(newAchievements);
  };

  const nextLevel = () => {
    let newLevel = level;
    if (level === "basic") newLevel = "intermediate";
    else if (level === "intermediate") newLevel = "advanced";
    else navigate("/"); 

    setLevel(newLevel);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setHintUsed(false);
    setRemovedOptions([]);
    setAchievements([]);
  };

  const restartLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setHintUsed(false);
    setRemovedOptions([]);
    setAchievements([]); 
  };

  const useHint = () => {
    if (!hintUsed) {
      const incorrectOptions = questions[level][currentQuestion].options.filter(
        (opt) => opt !== questions[level][currentQuestion].answer
      );
      const optionsToRemove = incorrectOptions.sort(() => Math.random() - 0.5).slice(0, 2);
      setRemovedOptions(optionsToRemove);
      setHintUsed(true);
    }
  };

  return (
    <>
      <Header />
    <div className="quiz-game-container">
      <h1 className="quiz-game-level">
        Quiz Mode - {level.charAt(0).toUpperCase() + level.slice(1)} Level
      </h1>
      {!showResult ? (
        <div className="quiz-game-box">
          <h2 className="quiz-game-question">
            {questions[level][currentQuestion].question}
          </h2>
          <div className="quiz-game-options">
            {questions[level][currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`quiz-game-option ${
                  selectedAnswer === option ? "selected-option" : ""
                } ${removedOptions.includes(option) ? "removed-option" : ""}`}
                onClick={() => handleAnswer(option)}
                disabled={removedOptions.includes(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {!hintUsed && (
            <button className="quiz-game-hint-btn" onClick={useHint}>
              Use Hint
            </button>
          )}

          {selectedAnswer && (
            <button className="quiz-game-next-btn" onClick={nextQuestion}>
              Next
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-game-box">
          <h2 className="quiz-game-score">Level Completed!</h2>
          <p className="quiz-game-score">
            Your Score: {score} / {questions[level].length}
          </p>

          {achievements.length > 0 && (
            <div className="quiz-game-achievements">
              <h3>🏆 Achievements Earned:</h3>
              <ul>
                {achievements.map((achieve, index) => (
                  <li key={index}>{achieve}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="quiz-game-restart-btn" onClick={restartLevel}>
            Restart Level
          </button>
          <button className="quiz-game-next-btn" onClick={nextLevel}>
            {level === "advanced" ? "Finish" : "Next Level"}
          </button>
          <button className="quiz-game-back-btn" onClick={() => navigate("/")}>
            Back to Game Modes
          </button>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default QuizMode;
