import React from 'react'
import styled from 'styled-components'
import 'rc-texty/assets/index.css'
import Title from 'antd/es/typography/Title'

interface InputProps {
  input?: string
}

const SpellingBeeInput = ({input}: InputProps) => {
  return (
    <InputContainer>
      <Title>{input}</Title>
    </InputContainer>
  )
}

const InputContainer = styled.div`
  min-height: 5rem;
  text-align: center;
`

export default SpellingBeeInput
