import ChatBotCanvas from "./components/ChatBotCanvas"
import TextToSpeech from "./components/ChatText"
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import GaudiPage from './pages/GaudiPage'
import EcoGirlPage from "./pages/EcoGirlPage"
import './App.css'

function App() {

  // 1 is idle, 0 is talking
  const [isTalking, setIsTalking] = useState(0)
  
  useEffect(() => {   
    // console.log('en app en useEffect', isTalking)   
    setIsTalking(isTalking)
  }, [isTalking]);

  const handleAnimation = (modelStatus) => {
    // console.log('en app pero en handle Animation', isTalking, modelStatus)
    setIsTalking(modelStatus)
  }

  // return (
  //   <>
  //     <TextToSpeech handleAnimationStatus={handleAnimation} />
  //     <ChatBotCanvas isTalking={isTalking} />
  //   </>
  // )
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
