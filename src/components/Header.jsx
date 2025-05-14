import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ points }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  
  useEffect(() => {
    const token = localStorage.getItem("token");

  
    if (!token) {
      localStorage.removeItem("username");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>IP Awareness Game</h2>
      </div>
      <div className="header-right">
        {username && <span className="welcome">👋 {username}</span>}
        <Link to="/leaderboard" className="leaderboard-btn">🏆 Leaderboard</Link>
        <div className="points-display">⭐ Points: 100 {points}</div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
