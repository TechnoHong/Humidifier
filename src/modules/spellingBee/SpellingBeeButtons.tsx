import React from 'react'
import {Button, Tooltip} from 'antd'
import {
  ReloadOutlined,
  EnterOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'

interface ButtonsProps {
  deleteClickHandler: () => void
  shuffleClickHandler: () => void
  submitClickHandler: () => void
  isLoading: boolean
}

const SpellingBeeButtons = ({
  deleteClickHandler,
  shuffleClickHandler,
  submitClickHandler,
  isLoading,
}: ButtonsProps) => {
  return (
    <ButtonsContainer>
      <Tooltip title='섞기'>
        <Button
          type='primary'
          shape='circle'
          icon={<ReloadOutlined />}
          onClick={shuffleClickHandler}
        />
      </Tooltip>
      <Button
        type='primary'
        icon={<EnterOutlined />}
        onClick={submitClickHandler}
        loading={isLoading}
      >
        Enter
      </Button>
      <Tooltip title='지우기'>
        <Button
          type='primary'
          shape='circle'
          icon={<ArrowLeftOutlined />}
          onClick={deleteClickHandler}
        />
      </Tooltip>
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled.div`
  max-width: 20rem;
  display: flex;
  justify-content: space-around;
  margin: 3rem auto;
`

export default SpellingBeeButtons
