import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUp/SignUpForm";
import CustomTextField from "./components/CustomTextField";
import InjuryDetailForm from "./pages/SignUp/InjuryDetailForm";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import MainContent from "./pages/MainContent";
import SignIn from "./pages/SignIn";
import Experience from "./pages/MainContent/Experience";

const App = () => {
  return (
    <Router  basename="/physio-frontend">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/text" element={<CustomTextField />} />
        <Route path="/injury" element={<InjuryDetailForm />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<MainContent />}/>
        <Route path="/experience" element={<Experience />}/>
      </Routes>
    </Router>
  );
};

export default App;