import React, {useEffect, useState} from 'react'
import Hexagons from './Hexagons'
import RcQueueAnim from 'rc-queue-anim'
import SpellingBeeInput from './SpellingBeeInput'
import SpellingBeeButtons from './SpellingBeeButtons'
import SpellingBeeTable from './SpellingBeeTable'
import SpellingBeeLevel from './SpellingBeeLevel'
import validationWord from '../../service/ValidationWord'
import {message} from 'antd'

export type HexaKey = {
  key: string
  isPrime: boolean
  type: 'Mo' | 'Ja'
}

export interface HistoryData {
  key: string
  index: number
  words: string
  definitions: string
}

const SpellingBeeContainer = () => {
  const [history, setHistory] = useState<HistoryData[]>([])
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messageApi, contextHolder] = message.useMessage()
  const [spells, setSpells] = useState<HexaKey[]>([
    {
      key: 'A',
      isPrime: false,
      type: 'Mo',
    },
    {
      key: 'B',
      isPrime: false,
      type: 'Ja',
    },
    {
      key: 'C',
      isPrime: false,
      type: 'Ja',
    },
    {
      key: 'D',
      isPrime: true,
      type: 'Ja',
    },
    {
      key: 'E',
      isPrime: false,
      type: 'Mo',
    },
    {
      key: 'F',
      isPrime: false,
      type: 'Ja',
    },
    {
      key: 'G',
      isPrime: false,
      type: 'Ja',
    },
  ])

  useEffect(() => {
    if (localStorage.getItem('sb-history')) {
      setHistory(JSON.parse(localStorage.getItem('sb-history')!).data)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sb-history', JSON.stringify({data: history}))
  }, [history])

  const hexagonClickHandler = (key: HexaKey) => {
    console.log('OnClick Hexagon >> ' + key.key)

    setInput(input + key.key)
  }

  const deleteClickHandler = () => {
    setInput(input.slice(0, -1))
  }

  const shuffleClickHandler = () => {
    const spellsCpy = [...spells]
    setSpells(spellsCpy.sort(() => Math.random() - 0.5))
  }

  const submitClickHandler = () => {
    if (!checkWordRule(input)) {
      return
    }
    setLoading(true)
    validationWord
      .validateWord(input)
      .then(res => {
        const def = res.data[0].meanings[0].definitions[0].definition
        setHistory([
          {
            key: String(history.length),
            index: history.length + 1,
            words: input,
            definitions: def,
          },
          ...history,
        ])
        setInput('')
        messageApi.open({
          type: 'success',
          content: ' +1 ',
        })
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

  const checkWordRule = (word: string) => {
    if (word.length < 3) {
      // Too short
      messageApi.open({
        type: 'warning',
        content: ' 너무 짧아요. ',
      })
      return false
    }
    const primeKey = getPrimeKey(spells)
    if (primeKey && !word.includes(primeKey.key)) {
      // Missing prime word
      messageApi.open({
        type: 'warning',
        content: ' 중요 글자가 포함되지 않았어요. ',
      })
      return false
    }
    for (const item of history) {
      if (item.words === word) {
        messageApi.open({
          type: 'warning',
          content: ' 이미 찾은 단어에요. ',
        })
        return false
      }
    }

    return true
  }

  const getPrimeKey = (spells: HexaKey[]): HexaKey | null => {
    for (let i = 0; i < spells.length; i++) {
      if (spells[i].isPrime) return spells[i]
    }
    return null
  }

  return (
    <>
      {contextHolder}
      <RcQueueAnim delay={300} className='queue-simple'>
        <div key='level'>
          <SpellingBeeLevel count={history.length} />
        </div>
        <div key='input'>
          <SpellingBeeInput input={input} />
        </div>
        <div key='hexagon'>
          <Hexagons hexagonClickHandler={hexagonClickHandler} spells={spells} />
        </div>
        <div key='buttons'>
          <SpellingBeeButtons
            deleteClickHandler={deleteClickHandler}
            shuffleClickHandler={shuffleClickHandler}
            submitClickHandler={submitClickHandler}
            isLoading={loading}
          />
        </div>
        <div key='table'>
          <SpellingBeeTable history={history} />
        </div>
      </RcQueueAnim>
    </>
  )
}

export default SpellingBeeContainer
