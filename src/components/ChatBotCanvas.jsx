import { useEffect, useState, Suspense } from 'react'
import { Plane, useVideoTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Gaudi from './Gaudi'
import EcoGirl from './EcoGirl'

const ChatBotCanvas = ({ isTalking, selectedModel }) => {
  const [stream, setStream] = useState(null)

  useEffect(() => {
    const accessCamera = async () => {
      try {
        setStream(await navigator.mediaDevices.getUserMedia({ video: true }))
      }
      catch (error) {
        console.log("Error accessing camera: ", error.message)
      }
    }
    accessCamera();
    return () => {
    }
  }, [])

  const VideoMaterial = ({ src }) => {
    const texture = useVideoTexture(src)
    return <meshBasicMaterial map={texture} toneMapped={false} />
  }

  return (
    <Canvas className="z-10" shadows orthographic camera={{ zoom: 70, position: [0, 0, 100] }} >
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <group position={[0, -0.35, 20.9]} scale={[8, 8, 8]}className="z-20">
        {selectedModel == 'gaudi' && (
          <Gaudi isTalking={isTalking} />
        )}
        {selectedModel == 'ecogirl' && (
          <EcoGirl isTalking={isTalking} />
        )}
      </group>

      <shadowMaterial transparent opacity={0.2} />
      <mesh>
        <Suspense fallback={<meshBasicMaterial wireframe />}>
          <Plane args={[15, 15]} position={[0, 0, -10]} >
            <VideoMaterial src={stream} />
          </Plane>
        </Suspense>
      </mesh>

    </Canvas>
  )
}

export default ChatBotCanvas