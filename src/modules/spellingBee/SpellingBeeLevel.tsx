import React from 'react'
import {Steps} from 'antd'

interface LevelProps {
  count: number
}

const SpellingBeeLevel = ({count}: LevelProps) => {
  const items = [
    {
      title: 'Bronze',
    },
    {
      title: 'Silver',
    },
    {
      title: 'Gold',
    },
    {
      title: 'Platinum',
    },
    {
      title: 'Diamond',
    },
    {
      title: 'Master',
    },
  ]

  const getLevel = (count: number) => {
    let level: number
    if (count < 20) {
      level = 0
    } else if (count < 40) {
      level = 1
    } else if (count < 60) {
      level = 2
    } else if (count < 80) {
      level = 3
    } else if (count < 100) {
      level = 4
    } else {
      level = 5
    }
    return level
  }
  return (
    <div>
      <Steps
        style={{maxWidth: '90%', margin: '0 1rem'}}
        items={items}
        size='small'
        current={getLevel(count)}
        percent={((count % 20) / 20) * 100}
        responsive={false}
      />
    </div>
  )
}

export default SpellingBeeLevel
