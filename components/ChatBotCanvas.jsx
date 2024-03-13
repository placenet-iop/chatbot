"use client"
import { useEffect, useState, Suspense }from 'react'
import { Canvas } from '@react-three/fiber'
import { useAnimations, Plane, useVideoTexture } from '@react-three/drei'
import Character from './Character'


const ChatBotCanvas = () => {
  const [stream, setStream] = useState(null)

  useEffect(() => {
    const accessCamera = async () => {
      try {
        setStream(await navigator.mediaDevices.getUserMedia({ video: true }) )
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
    <Canvas className="z-10">
      {/* <OrbitControls 
        enableZoom={false}
        enableDamping
        minAzimuthAngle={-Math.PI * 0.05}
        maxAzimuthAngle={Math.PI * 0.05}
      /> */}
      <ambientLight />
      <Character />
      <mesh>
        <Suspense fallback={<meshBasicMaterial wireframe />}>
          <Plane args={[15, 15]} position={[0, 0, -3]} >
            <VideoMaterial src={stream} />
          </Plane>
        </Suspense>
      </mesh>
    </Canvas>
  )
}

export default ChatBotCanvas