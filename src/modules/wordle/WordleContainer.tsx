import React, {useEffect, useState} from 'react'
import WordleDropdown from './WordleDropdown'
import {Button, Input, message} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import WordleGameBoard from './WordleGameBoard'
import styled from 'styled-components'
import validationWord from '../../service/ValidationWord'

type WordleGame = {
  words?: string[]
}
type WordleStorageType = 'wordle_single' | 'wordle_double' | 'wordle_quadruple'

const WordleContainer = () => {
  const [difficulty, setDifficulty] = useState('0')
  const [inputValue, setInputValue] = useState('')
  const [boards, setBoards] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const tryCounts = [6, 7, 9]
  const answers = [
    ['SUPER'],
    ['MINDS', 'MERRY'],
    ['PROXY', 'LOVES', 'MOVIE', 'GOOSE'],
  ]

  const wordleInitialState = (level: WordleStorageType) => {
    if (localStorage.getItem(level)) {
      const wordleGame = JSON.parse(localStorage.getItem(level)!)
      return wordleGame.words
    } else {
      const wordleGame: WordleGame = {
        words: [],
      }
      localStorage.setItem(level, JSON.stringify(wordleGame))
    }
    return []
  }

  const singleGame: string[] = wordleInitialState('wordle_single')
  const doubleGame: string[] = wordleInitialState('wordle_double')
  const quadrupleGame: string[] = wordleInitialState('wordle_quadruple')

  const onChangeDifficulty = (key: string) => {
    setDifficulty(key)
  }

  const onSubmitWord = (word: string, level: WordleStorageType) => {
    if (!checkWordRule(word)) {
      return
    }
    setLoading(true)
    validationWord
      .validateWord(word)
      .then(() => {
        setInputValue('')
        const wordleGame = getWordleGame(level)
        wordleGame.push(word.toUpperCase())
        localStorage.setItem(
          level,
          JSON.stringify({
            words: wordleGame,
          }),
        )
        setBoards(setBoard(level))
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: ' 올바른 단어를 입력하세요. ',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const setBoard = (level: WordleStorageType) => {
    const boards = []
    for (let i = 0; i < 2 ** parseInt(difficulty); i++) {
      boards.push(
        <WordleGameBoard
          key={'board' + parseInt(difficulty) + i}
          answer={answers[parseInt(difficulty)][i]}
          words={getWordleGame(level)}
          tryCount={tryCounts[parseInt(difficulty)]}
        />,
      )
    }
    return boards
  }

  useEffect(() => {
    setBoards(setBoard(getLevelType(difficulty)))
  }, [difficulty])

  const onChangeInput = (value: string) => {
    setInputValue(value)
  }

  const checkWordRule = (word: string) => {
    if (word.length !== 5) {
      messageApi.open({
        type: 'warning',
        content: ' 다섯 글자 단어를 입력하세요 ',
      })
      return false
    }
    return true
  }

  const getLevelType = (difficulty: string) => {
    let level: WordleStorageType
    switch (difficulty) {
      case '0':
        level = 'wordle_single'
        break
      case '1':
        level = 'wordle_double'
        break
      case '2':
        level = 'wordle_quadruple'
        break
      default:
        level = 'wordle_single'
    }
    return level
  }

  const getWordleGame = (level: WordleStorageType) => {
    let wordleGame: string[] = []
    switch (level) {
      case 'wordle_single':
        wordleGame = singleGame
        break
      case 'wordle_double':
        wordleGame = doubleGame
        break
      case 'wordle_quadruple':
        wordleGame = quadrupleGame
        break
    }
    return wordleGame
  }

  const clearAllWordleHistory = () => {
    localStorage.removeItem('wordle_single')
    localStorage.removeItem('wordle_double')
    localStorage.removeItem('wordle_quadruple')

    location.reload()
  }

  return (
    <WordleRootContainer>
      {contextHolder}
      <Input.Search
        style={{maxWidth: '20rem'}}
        enterButton='Enter'
        placeholder='Input 5 letter word'
        maxLength={5}
        value={inputValue}
        onChange={e => onChangeInput(e.currentTarget.value)}
        onSearch={() => onSubmitWord(inputValue, getLevelType(difficulty))}
        loading={loading}
        allowClear
      />
      <WordleOptionsContainer>
        <Button
          type='ghost'
          shape='circle'
          icon={<DeleteOutlined onClick={clearAllWordleHistory} />}
        />
        <WordleDropdown
          difficulty={difficulty}
          onChangeDifficulty={onChangeDifficulty}
        />
      </WordleOptionsContainer>
      <WordleBoards>{boards}</WordleBoards>
    </WordleRootContainer>
  )
}

const WordleRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:focus {
    outline: none;
  }
`

const WordleBoards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const WordleOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  margin-top: 0.5rem;
`

export default WordleContainer
