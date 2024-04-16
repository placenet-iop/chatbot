import { useGLTF } from '@react-three/drei'

const Character = () => {
  const model = useGLTF('/assets/EcoGirl.gltf')
  return (
    <primitive object={model.scene} scale={7}  position={[0, -3, 0]} />
  )
}

export default Character