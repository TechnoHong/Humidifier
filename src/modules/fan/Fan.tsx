import React, {useState} from 'react'
import styled from 'styled-components'
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import ThreeContainer from './ThreeContainer'
import Buttons from './Buttons'

const Fan = () => {
  const [speed, setSpeed] = useState(0.05)
  const [fanStyle, setFanStyle] = useState('/assets/propeller_polygon.glb')

  const onChangeSpeed = (amount: number) => {
    setSpeed(speed + amount)
    console.log('FAN SPEED >>', speed)
  }

  const onChangeFanStyle = (fanUrl: string) => {
    setFanStyle(fanUrl)
  }

  return (
    <>
      <FanContainer>
        <Canvas>
          <directionalLight position={[0, 10, 0]} intensity={4} />
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <ThreeContainer fanSpeed={speed} fanUrl={fanStyle} />
          <OrbitControls />
        </Canvas>
      </FanContainer>
      <Buttons
        speed={speed}
        onChangeSpeed={onChangeSpeed}
        fanStyle={fanStyle}
        onChangeFanStyle={onChangeFanStyle}
      />
    </>
  )
}

const FanContainer = styled.div`
  height: 300px;
  background: linear-gradient(45deg, #329fff 1%, #8c00ff 100%);
`

export default Fan
