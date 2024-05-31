import React, { useState } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import TextToSpeech from '../components/TextToSpeech'
import AudioPlayer from '../components/AudioPlayer'


const GaudiPage = () => {


    const handlePlay = () => {
        setAnimate(true)
    }

    const handleEnded = () => {
        setAnimate(false)
    }
     
  return (
    <div>
      
    </div>
  )
}

export default GaudiPage
