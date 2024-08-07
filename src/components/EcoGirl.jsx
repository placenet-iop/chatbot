/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\assets\EcoGirl.glb 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const EcoGirl = (props) => {
  const { isTalking } = props
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./assets/EcoGirl.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if(isTalking){
      actions[names[1]].reset().fadeIn(1).play()
    } else {
      actions[names[0]].reset().fadeIn(1).play()
    }
    return () => {
      actions[names[0]].fadeOut(1).stop()
      actions[names[1]].fadeOut(1).stop()
    }
  }, [isTalking, actions, names])
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="SuperEco" rotation={[-Math.PI, 0, -Math.PI]}>
          <group name="DeformationSystem">
            <primitive object={nodes.Root_M} />
            <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials.SuperEco} skeleton={nodes.Body.skeleton} />
            <skinnedMesh name="EL" geometry={nodes.EL.geometry} material={materials.SuperEco} skeleton={nodes.EL.skeleton} />
            <skinnedMesh name="ER" geometry={nodes.ER.geometry} material={materials.SuperEco} skeleton={nodes.ER.skeleton} />
            <skinnedMesh name="Eyebrow_L" geometry={nodes.Eyebrow_L.geometry} material={materials.SuperEco} skeleton={nodes.Eyebrow_L.skeleton} />
            <skinnedMesh name="Eyebrow_R" geometry={nodes.Eyebrow_R.geometry} material={materials.SuperEco} skeleton={nodes.Eyebrow_R.skeleton} />
            <skinnedMesh name="SuperEco_Eyelashes" geometry={nodes.SuperEco_Eyelashes.geometry} material={materials.SuperEco} skeleton={nodes.SuperEco_Eyelashes.skeleton} />
            <skinnedMesh name="SuperEco_Hair" geometry={nodes.SuperEco_Hair.geometry} material={materials.SuperEco} skeleton={nodes.SuperEco_Hair.skeleton} />
            <skinnedMesh name="SuperEco_Teeth_Bottom" geometry={nodes.SuperEco_Teeth_Bottom.geometry} material={materials.SuperEco} skeleton={nodes.SuperEco_Teeth_Bottom.skeleton} />
            <skinnedMesh name="SuperEco_Teeth_Top" geometry={nodes.SuperEco_Teeth_Top.geometry} material={materials.SuperEco} skeleton={nodes.SuperEco_Teeth_Top.skeleton} />
            <skinnedMesh name="Tongue" geometry={nodes.Tongue.geometry} material={materials.SuperEco} skeleton={nodes.Tongue.skeleton} />
          </group>
          <group name="Geometry">
            <group name="geo" />
          </group>
        </group>
      </group>
    </group>
  )
}

export default EcoGirl

useGLTF.preload('./assets/EcoGirl.glb')
