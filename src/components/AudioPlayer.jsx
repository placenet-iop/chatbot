import { useEffect, useState, useRef } from 'react'
import { convertTextToAudio } from '../services/apiService'

const AudioPlayer = ({ binaryAudioData }) => {

    const [audioSrc, setAudioSrc] = useState(null)
    
    useEffect(() => { 
        const blob = new Blob([binaryAudioData], {type: 'audio/mp3'})
        const audioUrl = URL.createObjectURL(blob)
        setAudioSrc(audioUrl)

        
    }, [binaryAudioData]);

    const playAudio = () => {
      audioRef.current.play()
    }

    const pauseAudio = () => {
      audioRef.current.pause()
    }

    const fetchBinaryAudioData = (binaryAudioData) => {
      const blob = new Blob([binaryAudioData], {type: 'audio/mp3'})
        const audioUrl = URL.createObjectURL(blob)
        
        console.log('audio =>', audioUrl)
        setAudioSrc(audioUrl)
    }
   
   
  return (
    <div>
        <audio controls autoPlay >
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
    </div>
  )
}

export default AudioPlayer
