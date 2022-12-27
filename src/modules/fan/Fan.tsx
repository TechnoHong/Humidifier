import React, {useState} from 'react'
import styled from 'styled-components'
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import ThreeContainer from './ThreeContainer'
import Buttons from './Buttons'

const Fan = () => {
  const [speed, setSpeed] = useState(0.05)
  const [rotate, setRotate] = useState(false)
  const [fanStyle, setFanStyle] = useState('/assets/propeller_polygon.glb')

  const onChangeSpeed = (amount: number) => {
    setSpeed(speed + amount)
    console.log('FAN SPEED button >>', speed)
  }

  const onChangeSliderSpeed = (value: number) => {
    setSpeed(value)
    console.log('FAN SPEED slider >>', speed)
  }

  const onChangeFanModel = (value: string | number) => {
    let fanUrl: string
    switch (value) {
      default:
      case '선풍기1':
        fanUrl = '/assets/propeller_polygon.glb'
        break
      case '선풍기2':
        fanUrl = '/assets/submarine_propeller.glb'
        break
      case '선풍기3':
        fanUrl = '/assets/airplane_propeller.glb'
        break
      case '선풍기4':
        fanUrl = '/assets/vintage_fan.glb'
        break
    }
    setFanStyle(fanUrl)
  }

  const onClickRotate = () => {
    setRotate(!rotate)
    console.log(rotate)
  }

  return (
    <>
      <FanContainer>
        <Canvas>
          <directionalLight position={[0, 10, 0]} intensity={4} />
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <ThreeContainer fanSpeed={speed} fanUrl={fanStyle} rotate={rotate} />
          <OrbitControls />
        </Canvas>
      </FanContainer>
      <Buttons
        speed={speed}
        onChangeSpeed={onChangeSpeed}
        onClickRotate={onClickRotate}
        onChangeSliderSpeed={onChangeSliderSpeed}
        onChangeFanModel={onChangeFanModel}
      />
    </>
  )
}

const FanContainer = styled.div`
  height: 300px;
  background: linear-gradient(45deg, #329fff 1%, #8c00ff 100%);
`

export default Fan
