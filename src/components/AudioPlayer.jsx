import { useEffect, useState, useRef } from 'react'
import { convertTextToAudio } from '../services/apiService'

const AudioPlayer = ({ binaryAudioData, onPlay, onEnded, onPause }) => {

    const audioRef = useRef(null)
    
    useEffect(() => {
        const audio = audioRef.current
        const blob = new Blob([binaryAudioData], {type: 'audio/mp3'})
        const url = URL.createObjectURL(blob)
        audio.src = url

        console.log('audio', audio)

        if(audio) {
          console.log('audio converted', audio)
          audioRef.current.play()
        }
    }, [binaryAudioData, onPlay, onEnded, onPause ]);

    const playAudio = () => {
      audioRef.current.play()
    }

    const pauseAudio = () => {
      audioRef.current.pause()
    }
   
   
  return (
    <div>
        <audio ref={audioRef} autoPlay />
        <button onClick={playAudio}>Play</button>
        <button onClick={pauseAudio}>Pause</button>
    </div>
  )
}

export default AudioPlayer
