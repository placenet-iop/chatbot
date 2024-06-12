import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Gaudi = (props) => {
  const { isTalking } = props
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./assets/Gaudi.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    console.log('en el MODELO GAUDI *******************', isTalking)
    if(isTalking){
      actions[names[0]].reset().fadeIn(1).play()
    } else {
      actions[names[1]].reset().fadeIn(1).play()
    }
    return () => {
      actions[names[0]].fadeOut(1).stop()
      actions[names[1]].fadeOut(1).stop()
    }
  }, [isTalking, actions, names])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Gaudi" rotation={[-Math.PI, 0, -Math.PI]}>
          <group name="DeformationSystem">
            <primitive object={nodes.Root_M} />
            <skinnedMesh name="Bear" geometry={nodes.Bear.geometry} material={materials.Gaudi} skeleton={nodes.Bear.skeleton} />
            <skinnedMesh name="Body1" geometry={nodes.Body1.geometry} material={materials.Gaudi} skeleton={nodes.Body1.skeleton} />
            <skinnedMesh name="EL" geometry={nodes.EL.geometry} material={materials.Gaudi} skeleton={nodes.EL.skeleton} />
            <skinnedMesh name="ER" geometry={nodes.ER.geometry} material={materials.Gaudi} skeleton={nodes.ER.skeleton} />
            <skinnedMesh name="Eyebrow_L" geometry={nodes.Eyebrow_L.geometry} material={materials.Gaudi} skeleton={nodes.Eyebrow_L.skeleton} />
            <skinnedMesh name="Eyebrow_R" geometry={nodes.Eyebrow_R.geometry} material={materials.Gaudi} skeleton={nodes.Eyebrow_R.skeleton} />
            <skinnedMesh name="Hair" geometry={nodes.Hair.geometry} material={materials.Gaudi} skeleton={nodes.Hair.skeleton} />
            <skinnedMesh name="Hat" geometry={nodes.Hat.geometry} material={materials.Gaudi} skeleton={nodes.Hat.skeleton} />
            <skinnedMesh name="Shirt1" geometry={nodes.Shirt1.geometry} material={materials.Gaudi} skeleton={nodes.Shirt1.skeleton} />
            <skinnedMesh name="Teeth_Inf" geometry={nodes.Teeth_Inf.geometry} material={materials.Gaudi} skeleton={nodes.Teeth_Inf.skeleton} />
            <skinnedMesh name="Teeth_Sup" geometry={nodes.Teeth_Sup.geometry} material={materials.Gaudi} skeleton={nodes.Teeth_Sup.skeleton} />
            <skinnedMesh name="Tongue" geometry={nodes.Tongue.geometry} material={materials.Gaudi} skeleton={nodes.Tongue.skeleton} />
          </group>
          <group name="Geometry">
            <group name="geo" />
          </group>
        </group>
      </group>
    </group>
  )
}

export default Gaudi

useGLTF.preload('./assets/Gaudi.glb')
