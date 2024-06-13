import { useEffect, useRef } from 'react';

const AudioPlayer = ({ binaryAudioData, onPlay, onEnded, onPause }) => {
  const audioRef = useRef(new Audio());
  const currentAudioRef = useRef(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    currentAudioRef.current = audio;

    const cleanupPreviousAudio = () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current.src = '';
      }
    };
    cleanupPreviousAudio();
    return () => {
      cleanupPreviousAudio();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!binaryAudioData) {
      console.error('No binaryAudioData provided');
      return;
    }

    const blob = new Blob([binaryAudioData], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    audio.src = url;

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded', audio.duration);
      audio.play().then(() => {
        onPlay();
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);


    const handleEnded = () => {
      onEnded();
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      URL.revokeObjectURL(url);
    };
  }, [binaryAudioData, 
    // onPlay, 
    // onEnded, 
    onPause]);

  return (
    <div>
      <audio 
      style={{ position: 'absolute', top: '-400px' }}
      ref={audioRef} 
      controls />
    </div>
  );
};

export default AudioPlayer;
