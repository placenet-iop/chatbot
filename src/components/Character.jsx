import { useGLTF } from '@react-three/drei'
import Gaudi from './Gaudi'
import EcoGirl from './EcoGirl'
import { useEffect } from 'react'

const Character = ({ selectedModel, isSpeaking }) => {
  let characterToRender;

  useEffect(() => {
    if(isSpeaking) {

    } else {

    }
  }, [isSpeaking])

  if(selectedModel == 'gaudi') {
    characterToRender = <Gaudi />
  } else {
    characterToRender = <EcoGirl />
  }
  return (
    {characterToRender}
  )
}

export default Character