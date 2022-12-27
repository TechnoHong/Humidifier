import React from 'react'
import {Button, Segmented, Slider} from 'antd'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

type ButtonsProps = {
  speed: number
  onChangeSpeed: (amount: number) => void
  onClickRotate: () => void
  onChangeSliderSpeed: (value: number) => void
  onChangeFanModel: (value: string | number) => void
}

const Buttons = ({
  speed,
  onChangeSpeed,
  onClickRotate,
  onChangeSliderSpeed,
  onChangeFanModel,
}: ButtonsProps) => {
  const isControlFaster = (speed: number) => {
    return speed < 1
  }

  const isControlSlower = (speed: number) => {
    return speed > 0
  }
  return (
    <ButtonsContainer>
      <Segmented
        options={['선풍기1', '선풍기2', '선풍기3', '선풍기4']}
        defaultValue={'선풍기1'}
        onChange={onChangeFanModel}
      />
      <Slider
        style={{width: '20rem'}}
        min={0}
        max={1}
        onChange={onChangeSliderSpeed}
        value={speed}
        step={0.001}
      />
      <Button.Group>
        <Button
          disabled={!isControlFaster(speed)}
          type='primary'
          icon={<CaretUpOutlined />}
          onClick={() => onChangeSpeed(+0.05)}
        />
        <Button type='dashed' icon={<UndoOutlined />} onClick={onClickRotate} />
        <Button
          disabled={!isControlSlower(speed)}
          type='primary'
          icon={<CaretDownOutlined />}
          onClick={() => onChangeSpeed(-0.05)}
        />
      </Button.Group>
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto;
  button {
    margin: 0.5rem;
  }
`

export default Buttons
