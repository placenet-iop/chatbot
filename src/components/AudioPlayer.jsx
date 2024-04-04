import { useEffect, useState } from 'react'
import { convertTextToAudio } from '../services/apiService'

const AudioPlayer = ({ messageToConvertToAudio }) => {

    const [audioData, setAudioData] = useState('')
    
    useEffect(() => {
        const fetchAudioData = async () => {
          try {
          //   const response = await convertTextToAudio(messageToConvertToAudio)
          //   if (!response.ok) {
          //     throw new Error('Failed to fetch audio data');
          //   }
          // const data = await response.data;

            setAudioData(messageToConvertToAudio)
          } catch (error) {
            console.log('Error fetching audio data:', error)
          }
        };

        fetchAudioData()
    }, []);
   
   console.log('audio Data', audioData)
  return (
    <div>
        {audioData && (
            <audio controls>
                <source src={`data:audio/mpeg;base64,${btoa(String.fromCharCode.apply(null, audioData))}`} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            // <audio 
            // autoplay 
            // controls 
            // src="data:audio/mpeg;base64,/+MYxAAEaAIEeUAQAgBgNgP/////KQQ/////Lvrg+lcWYHgtjadzsbTq+yREu495tq9c6v/7vt/of7mna9v6/btUnU17Jun9/+MYxCkT26KW+YGBAj9v6vUh+zab//v/96C3/pu6H+pv//r/ycIIP4pcWWTRBBBAMXgNdbRaABQAAABRWKwgjQVX0ECmrb///+MYxBQSM0sWWYI4A++Z/////////////0rOZ3MP//7H44QEgxgdvRVMXHZseL//540B4JAvMPEgaA4/0nHjxLhRgAoAYAgA/+MYxAYIAAJfGYEQAMAJAIAQMAwX936/q/tWtv/2f/+v//6v/+7qTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV">
            // </audio>
        )}
    </div>
  )
}

export default AudioPlayer
