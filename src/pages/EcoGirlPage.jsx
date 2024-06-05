import React, { useState } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import TextToSpeech from '../components/ChatText'
import AudioPlayer from '../components/AudioPlayer'

const EcoGirlPage = () => {
    const [isTalking, setIsTalking] = useState(false)
    const [messageAudio, setMessageAudio] = useState(null)

    const handlePlay = () => {
        setAnimate(true)
    }

    const handleEnded = () => {
        setAnimate(false)
    }
  return (
    <div>
      <ChatBotCanvas isTalking={isTalking} selectedModel="ecogirl"/>
      <TextToSpeech />
      <AudioPlayer 
        messageAudio={messageAudio}
        onPlay={handlePlay}
        onEnded={handleEnded}
      />
    </div>
  )
}

export default EcoGirlPage
