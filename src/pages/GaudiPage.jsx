import React, { useState } from 'react'
import ChatBotCanvas from '../components/ChatBotCanvas'
import TextToSpeech from '../components/TextToSpeech'
import AudioPlayer from '../components/AudioPlayer'


const GaudiPage = () => {
    const [isTalking, setIsTalking] = useState(false)
    const [messageAudio, setMessageAudio] = useState(null)


    const handlePlay = () => {
        setIsTalking(true)
    }

    const handleEnded = () => {
        setIsTalking(false)
    }
     
  return (
    <div>
      <ChatBotCanvas isTalking={isTalking} />
      <TextToSpeech />
      <AudioPlayer 
        messageAudio={messageAudio}
        onPlay={handlePlay}
        onEnded={handleEnded}
      />
    </div>
  )
}

export default GaudiPage
