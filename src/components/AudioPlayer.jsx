import { useEffect, useState } from 'react'

const AudioPlayer = ({ audioSource, isPlaying }) => {

    const [audio, setAudio] = useState(new Audio(audioSource))
    
    useEffect(() => {
        if(isPlaying) {
            audio.play()
        } else {
            audio.pause()
            audio.currentTime = 0
        }
    }, [isPlaying, audio])

  return (
    <div>
      <audio controls>
        <source src={audioSource} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default AudioPlayer
