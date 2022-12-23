import React, {useRef} from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

type FanProps = {
  fanSpeed: number
  fanUrl: string
}

const ThreeContainer = ({fanSpeed, fanUrl}: FanProps) => {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + fanUrl)
  const ref = useRef<any>()
  useFrame(() => (ref.current.rotation.z += fanSpeed))
  return (
    <mesh position={[0, 0, 0]} ref={ref} scale={0.5}>
      <primitive object={gltf.scene} position={[0, 0, 0]} />
    </mesh>
  )
}

export default ThreeContainer
