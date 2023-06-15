import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import ThreeContainer from './ThreeContainer'
import Buttons from './Buttons'
import {Button} from "antd";
import {FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons'
import GoldenFishContainer from "./GoldenFishContainer";

const Fan = () => {
  const [speed, setSpeed] = useState(0.05)
  const [rotate, setRotate] = useState(false)
  const [fanStyle, setFanStyle] = useState('/assets/propeller_polygon.glb')
  const [fullScreen, setFullScreen] = useState(false)
  const [fishes, setFishes] = useState<any>([])

  const onChangeSpeed = (amount: number) => {
    setSpeed(speed + amount)
  }

  const onChangeSliderSpeed = (value: number) => {
    setSpeed(value)
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

  const onToggleFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

  const onAddFish = () => {
    setFishes([...fishes, [getRandom(-50, 50), getRandom(-50, 50), getRandom(-50, 50)]])
  }

  useEffect(() => {
    console.log(fishes)
  }, [fishes])

  return (
    <>
      <FanContainer fullScreen={fullScreen}>
        <Canvas>
          <directionalLight position={[0, 10, 0]} intensity={4} />
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <ThreeContainer fanSpeed={speed} fanUrl={fanStyle} rotate={rotate} />
          {
            fishes.map((fish: any, index: number) => <GoldenFishContainer initPosition={[fish[0], fish[1], fish[2]]} key={index}/>)
          }
          <OrbitControls />
        </Canvas>
        <Button
            style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: '100'}}
            onClick={onToggleFullScreen}
            icon={fullScreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
        />
      </FanContainer>
      <ButtonsWrapper fullScreen={fullScreen}>
        <Buttons
          speed={speed}
          onChangeSpeed={onChangeSpeed}
          onClickRotate={onClickRotate}
          onChangeSliderSpeed={onChangeSliderSpeed}
          onChangeFanModel={onChangeFanModel}
        />
        <Button style={{ margin: '0 auto' }} onClick={onAddFish}>금붕어 담그기</Button>
      </ButtonsWrapper>
    </>
  )
}

const FanContainer = styled.div<{ fullScreen: boolean }>`
  ${props => (props.fullScreen ? `
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
  ` : `
    position: relative;
    height: 300px;
  `)}
  width: 100%;
  background: linear-gradient(45deg, #329fff 1%, #8c00ff 100%);
  z-index: 99;
  transition: all 100ms ease-in-out;
`

const ButtonsWrapper = styled.div<{ fullScreen: boolean }>`
  ${props => (props.fullScreen ? `
    position: absolute;
    z-index: 100;
    bottom: 3rem;
    left:50%;
    transform:translateX(-50%);
    background-color: rgba( 255, 255, 255, 0.6 );
    border-radius: 10px;
    padding: 0.5rem;
  ` : `
  
  `)}
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Fan
