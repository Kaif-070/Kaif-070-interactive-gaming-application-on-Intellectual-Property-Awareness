import { Link } from "react-router-dom";
import Header from "./Header"; 
import Footer from "./Footer"; 
import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <Header /> {/* Add the header here */}
      <h1 className="title">🎮 IP Awareness Game 🎓</h1>
      <p className="subtitle">Learn about Intellectual Property in a fun and interactive way!</p>
      
      <div className="game-modes">
        <Link to="/puzzle" className="game-mode puzzle">🧩 Puzzle Mode</Link>
        <Link to="/role-play" className="game-mode role">🎭 Role-Playing Mode</Link>
        <Link to="/quiz" className="game-mode quiz">❓ Quiz Mode</Link>
        <Link to="/case-study" className="game-mode case">📖 Case Study Mode</Link>
        <Link to="/drag-drop" className="game-mode drag">🎨 Drag-and-Drop Mode</Link>
      </div>

      <Footer /> {}
    </div>
  );
};

export default Home;
