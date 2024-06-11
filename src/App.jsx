import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import GaudiPage from './pages/GaudiPage'
import EcoGirlPage from "./pages/EcoGirlPage"
import './App.css'

function App() {

  // 1 is idle, 0 is talking
  const [isTalking, setIsTalking] = useState(0)
  
  useEffect(() => {   
    setIsTalking(isTalking)
  }, [isTalking]);

  const handleAnimation = (modelStatus) => {
    setIsTalking(modelStatus)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GaudiPage />} />
        <Route path="/ecogirl" element={<EcoGirlPage />} />
      </Routes>
    </Router>
  )
}

export default App
