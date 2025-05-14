import React, { useState } from "react";
import "./RolePlayingMode.css";

const roles = [
  {
    name: "Inventor",
    description: "Protect your invention and make wise business decisions.",
    scenario: {
      title: "Protecting a New Invention",
      story:
        "You have developed an eco-friendly water purification system. A company wants to collaborate, but they request full access to your design before signing a contract.",
      hint: "Always secure your intellectual property before discussing business deals.",
      choices: [
        { text: "Share the design before filing for a patent", outcome: "Risk: The company might take your idea and patent it themselves. You lose control over your invention.", correct: false },
        { text: "File for a patent first, then discuss collaboration", outcome: "Correct Choice! Your invention is legally protected before negotiations. The company must acknowledge your patent and offer fair terms.", correct: true },
        { text: "Keep the idea secret and refuse to collaborate", outcome: "Neutral Choice: You retain full control, but miss a potential business opportunity.", correct: false },
      ],
    },
  },
  {
    name: "Artist",
    description: "Protect your digital art from unauthorized use.",
    scenario: {
      title: "Copyright Protection for Digital Art",
      story:
        "You are a digital artist who posted your latest artwork online. A marketing agency wants to use it in an ad campaign without offering payment.",
      hint: "Copyright registration strengthens your legal protection.",
      choices: [
        { text: "Allow them to use it for free", outcome: "Risk: You receive no compensation, and they might use it without credit.", correct: false },
        { text: "Register your artwork under copyright law before negotiating", outcome: "Correct Choice! You can demand proper credit and fair payment.", correct: true },
        { text: "Ignore the request and take no action", outcome: "Neutral Choice: They may still use your artwork without permission.", correct: false },
      ],
    },
  },
  {
    name: "Business Owner",
    description: "Protect your brand identity and trademarks.",
    scenario: {
      title: "Trademarking a Brand Name",
      story:
        "You own a small bakery called 'Sweet Bites.' A larger company opens a bakery with the same name, confusing your customers.",
      hint: "Trademark registration ensures legal protection for your brand.",
      choices: [
        { text: "Ignore the issue and hope customers stay loyal", outcome: "Risk: The larger company dominates the market, and you lose customers.", correct: false },
        { text: "File for a trademark to protect your brand", outcome: "Correct Choice! A trademark ensures only you can use 'Sweet Bites' in your industry.", correct: true },
        { text: "Sue the larger company without a trademark", outcome: "Risk: Without a registered trademark, you have no legal ground. The case is dismissed.", correct: false },
      ],
    },
  },
];

const RolePlayingMode = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [points, setPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [achievement, setAchievement] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setSelectedChoice(null);
    setHintUsed(false);
    setShowHint(false);
  };

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    if (choice.correct) {
      setPoints((prevPoints) => prevPoints + 1);
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    }

  
    if (correctAnswers + 1 === 2) {
      setAchievement("Role-Playing Expert 🏆");
    } 
    if (correctAnswers + 1 === 3) {
      setAchievement("IP Knowledge Master 🌟");
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintUsed(true);
    setTimeout(() => {
      setShowHint(false);
    }, 5000);
  };

  return (
    <div className="role-playing-container">
      {!selectedRole ? (
        <div className="role-selection">
          <h1>Select Your Role</h1>
          {roles.map((role, index) => (
            <button key={index} onClick={() => handleRoleSelection(role)}>
              {role.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="scenario-container">
          <h1>{selectedRole.scenario.title}</h1>
          <p>{selectedRole.scenario.story}</p>

          {!selectedChoice ? (
            <>
              {/* Hint System */}
              {!hintUsed && (
                <button className="hint-btn" onClick={handleShowHint}>
                  Show Hint 💡
                </button>
              )}
              {showHint && <p className="hint-text">{selectedRole.scenario.hint}</p>}

              <div className="choices">
                {selectedRole.scenario.choices.map((choice, index) => (
                  <button key={index} onClick={() => handleChoiceSelection(choice)}>
                    {choice.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="outcome">
              <p>{selectedChoice.outcome}</p>
              <p className="points-display">Points: {points}</p>

              {achievement && <p className="achievement">🏅 {achievement}</p>}

              <button onClick={() => setSelectedRole(null)}>Play Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RolePlayingMode;
