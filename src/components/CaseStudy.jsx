import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import caseStudies from "./caseStudies.json";
import "./CaseStudy.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const levels = ["Basic", "Intermediate", "Advanced"];

const CaseStudy = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentCase, setCurrentCase] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false); 

  const navigate = useNavigate();
  const caseStudy = caseStudies[currentCase];
  const question = caseStudy.questions[currentQuestion];
  const level = levels[currentCase] || "Advanced";

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < caseStudy.questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowHint(false); 
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleNextCase = () => {
    if (currentCase + 1 < caseStudies.length) {
      setCurrentCase((prev) => prev + 1);
      setCurrentQuestion(0);
      setShowQuiz(false);
      setShowResult(false);
      setScore(0);
      setSelectedAnswer(null);
      setShowHint(false);
      setHintUsed(false); 
    }
  };

  const handleRestart = () => {
    setCurrentCase(0);
    setCurrentQuestion(0);
    setShowQuiz(false);
    setShowResult(false);
    setScore(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setHintUsed(false); 
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsed(true); 

  
    setTimeout(() => {
      setShowHint(false);
    }, 5000);
  };

  return (
    <>
      <Header />
    <div className="casestudy-container">
      <h1 className="casestudy-title">Case Study - {level} Level</h1>
      <h2 className="casestudy-subtitle">{caseStudy.title}</h2>
      <p className="casestudy-description">{caseStudy.description}</p>

      {!showQuiz ? (
        <button className="casestudy-start-btn" onClick={() => setShowQuiz(true)}>
          Take Quiz
        </button>
      ) : (
        <>
          {!showResult && (
            <div className="casestudy-hint-container">
              {!hintUsed ? (
                <button className="casestudy-hint-btn" onClick={handleShowHint}>
                  Show Hint
                </button>
              ) : (
                <button className="casestudy-hint-btn disabled" disabled>
                  Hint Used
                </button>
              )}
              {showHint && <p className="casestudy-hint-text">{question.hint}</p>}
            </div>
          )}

          {!showResult ? (
            <div>
              <h3 className="casestudy-question">{question.question}</h3>
              <div className="casestudy-options">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className={`casestudy-option-btn ${
                      selectedAnswer === option
                        ? option === question.answer
                          ? "correct"
                          : "wrong"
                        : ""
                    }`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="casestudy-result">
              <h2>Case Study Completed!</h2>
              <p>Your Score: {score} / {caseStudy.questions.length}</p>

              
              <div className="casestudy-achievements">
                {score === caseStudy.questions.length && (
                  <p className="casestudy-achievement">🏆 Perfect Score!</p>
                )}
                {currentCase === caseStudies.length - 1 && (
                  <p className="casestudy-achievement">👑 Case Study Master!</p>
                )}
              </div>

              <button className="casestudy-restart-btn" onClick={handleRestart}>
                Restart
              </button>
              <button className="casestudy-home-btn" onClick={() => navigate("/")}>
                Back to Mode Games
              </button>

              {currentCase + 1 < caseStudies.length && (
                <button className="casestudy-next-btn" onClick={handleNextCase}>
                  Next Case Study
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CaseStudy;
