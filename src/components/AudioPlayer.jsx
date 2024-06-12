import { useEffect, useRef } from 'react'

const AudioPlayer = ({ binaryAudioData, onPlay, onEnded, onPause }) => {

  const audioRef = useRef(null)

  useEffect(() => {
    if (!binaryAudioData) {
      console.error('No binaryAudioData provided');
      return;
    }
    const audio = audioRef.current
    const blob = new Blob([binaryAudioData], { type: 'audio/mp3' })
    const url = URL.createObjectURL(blob)
    audio.src = url

    audio.onloadedmetadata = () => {
      console.log('Audio metadata loaded', audio.duration);
    };

    audio.onerror = (e) => {
      console.error('Error loading audio', e);
    };

    audio.onplay = onPlay;
    audio.onended = onEnded;
    audio.onpause = onPause;

    // Ensure the audio is ready to play
    audio.load();

  }, [binaryAudioData, onPlay, onEnded, onPause]);

  const playAudio = () => {
    audioRef.current.play().catch((e) => {
      console.error('Error playing audio', e);
    });
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };


  return (
    <div>
      <audio ref={audioRef} controls autoPlay />
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>
    </div>
  )
}

export default AudioPlayer
