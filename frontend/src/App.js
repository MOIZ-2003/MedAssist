import { Route,Routes } from "react-router-dom";
import Login from "./pages/candidate/Login";
import SignUp from "./pages/candidate/SignUp";
import LandingPage from "./pages/LandingPage";
import CandidateDashboard from "./pages/candidate/candidate_dashboard";
import Dashboard from "./pages/candidate/Dashboard";
import Chatbot from "./pages/candidate/chatbot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/candidatedash" element={<CandidateDashboard/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/chatbot" element={<Chatbot/>}/>
      
    </Routes>
  );
}

export default App;
