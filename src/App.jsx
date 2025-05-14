import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from "./components/Home.jsx";
import ProtectedRoute from './components/ProtectedRoute';
import DragDropGame from "./components/DragDropGame.jsx";
import PuzzleGame from "./components/JigsawPuzzle.jsx";
import QuizGame from "./components/quiz.jsx";
import CaseStudyGame from "./components/CaseStudy.jsx";
import RolePlayingMode from "./components/RolePlaying.jsx";
import Leaderboard from "./components/Leaderboard.jsx"; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
        <Route path="/puzzle" element={<PuzzleGame />} />
        <Route path="/role-play" element={<RolePlayingMode />} />
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/case-study" element={<CaseStudyGame />} />
        <Route path="/drag-drop" element={<DragDropGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
