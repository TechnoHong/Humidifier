import React from 'react'
import {Button, Radio} from 'antd'
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons'
import styled from 'styled-components'

type ButtonsProps = {
  speed: number
  fanStyle: string
  onChangeSpeed: (amount: number) => void
  onChangeFanStyle: (fanStyle: string) => void
}

const Buttons = ({
  speed,
  onChangeSpeed,
  fanStyle,
  onChangeFanStyle,
}: ButtonsProps) => {
  const isControlFaster = (speed: number) => {
    return speed < 1
  }

  const isControlSlower = (speed: number) => {
    return speed > 0
  }
  return (
    <ButtonsContainer>
      <Radio.Group
        size='small'
        defaultValue={fanStyle}
        buttonStyle='solid'
        onChange={e => onChangeFanStyle(e.target.value)}
      >
        <Radio.Button value='/assets/propeller_polygon.glb'>
          Type 1
        </Radio.Button>
        <Radio.Button value='/assets/submarine_propeller.glb'>
          Type 2
        </Radio.Button>
        <Radio.Button value='/assets/airplane_propeller.glb'>
          Type 3
        </Radio.Button>
        <Radio.Button value='/assets/vintage_fan.glb'>Type 4</Radio.Button>
      </Radio.Group>
      <Button.Group>
        <Button
          disabled={!isControlFaster(speed)}
          type='primary'
          icon={<CaretUpOutlined />}
          onClick={() => onChangeSpeed(+0.05)}
        />
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
