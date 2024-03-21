import { useEffect, useState, Suspense } from 'react'
import { useAnimations, Plane, useVideoTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
//import Character from './Character'
import Gaudi from './Gaudi'
import Gaudi_Clean from './Gaudi_Clean'

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
    <Canvas className="z-10" shadows >
      {/* <OrbitControls 
        enableZoom={false}
        enableDamping
        minAzimuthAngle={-Math.PI * 0.05}
        maxAzimuthAngle={Math.PI * 0.05}
      /> */}
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
     {/* <Character /> */}

     <group position={[0, -0.35, 4.2]}>
      <Gaudi_Clean />

     </group>
      
     

     <shadowMaterial transparent opacity={0.2} />
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