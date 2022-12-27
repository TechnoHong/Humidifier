import React from 'react'
import RcQueueAnim from 'rc-queue-anim'
import styled from 'styled-components'

export interface wordType {
  word: string
  state: WordStateType
}

interface boardProps {
  answer: string
  words?: string[]
  tryCount: number
}

type WordleStatusType = 'Start' | 'Progressing' | 'Success' | 'Failure'
export type WordStateType = 'Nothing' | 'Filled' | 'Ball' | 'Strike'
export type lineType = wordType[]

const WordleGameBoard = ({answer, words, tryCount}: boardProps) => {
  const checkStatus = (
    words: string[] | undefined,
    answer: string,
  ): WordleStatusType => {
    if (!words) return 'Start'
    for (let i = 0; i < words.length; i++) {
      if (words[i] === answer) return 'Success'
    }
    if (words.length >= tryCount) {
      return 'Failure'
    }
    return 'Progressing'
  }

  const setGameData = () => {
    const line = []
    for (let i = 0; i < tryCount; i++) {
      if (!words || !words[i]) {
        line.push(<WordleWord key={i}>{setEmptyCell()}</WordleWord>)
      } else {
        line.push(
          <WordleWord key={i}>{setWordleCell(words[i], answer)}</WordleWord>,
        )
      }
    }
    return line
  }

  const setEmptyCell = () => {
    const word = []
    for (let i = 0; i < 5; i++) {
      word.push(<WordleLetter key={i} wordState='Nothing' />)
    }
    return word
  }

  const setWordleCell = (word: string, answer: string) => {
    const wordArr = []
    for (let i = 0; i < 5; i++) {
      const state = getWordleState(word.at(i), i, answer)
      wordArr.push(
        <WordleLetter key={word + i} wordState={state}>
          {word.at(i)}
        </WordleLetter>,
      )
    }
    return wordArr
  }

  const getWordleState = (
    letter: string | undefined,
    letterIdx: number,
    answer: string,
  ) => {
    if (!letter) return 'Nothing'
    else {
      if (answer.at(letterIdx) === letter) {
        return 'Strike'
      }
      if (answer.includes(letter)) {
        return 'Ball'
      } else {
        return 'Filled'
      }
    }
  }

  return (
    <WordleBoard>
      <RcQueueAnim delay={300}>{setGameData()}</RcQueueAnim>
      <WordleDimmed boardStatus={checkStatus(words, answer)}>
        {handlerBoardType(checkStatus(words, answer)).text}
      </WordleDimmed>
    </WordleBoard>
  )
}

const handlerColorType = (state: WordStateType) => {
  switch (state) {
    case 'Filled':
      return '#F5F5F5'
    case 'Ball':
      return '#fccc51'
    case 'Strike':
      return '#3FC1C9'
    case 'Nothing':
    default:
      return 'transparent'
  }
}

const handlerBoardType = (status: WordleStatusType) => {
  switch (status) {
    case 'Success':
      return {bg: '#000000', text: ''}
    case 'Failure':
      return {bg: '#000000', text: ''}
    case 'Progressing':
    case 'Start':
      return {bg: '', text: ''}
  }
}

const WordleBoard = styled.div`
  position: relative;
  margin: 1rem;
`

const WordleDimmed = styled.div<{boardStatus: WordleStatusType}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  border-radius: 5px;

  background: ${props => handlerBoardType(props.boardStatus).bg};
  opacity: 0.2;

  font-size: 2rem;
  color: #ffffff;
  text-align: center;

  transition: all linear 500ms;
`

const WordleWord = styled.div`
  display: flex;
  flex-wrap: nowrap;
  & + & {
    margin-top: 0.25rem;
  }
`

const WordleLetter = styled.div<{wordState: WordStateType}>`
  display: inline-block;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: #1e2c3b;
  vertical-align: middle;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border: #43464d 2px solid;
  border-radius: 5px;
  background-color: ${props => handlerColorType(props.wordState)};
  transition: background-color 500ms linear;

  & + & {
    margin-left: 0.25rem;
  }
`

export default WordleGameBoard
