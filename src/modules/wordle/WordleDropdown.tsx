import React from 'react'
import {Dropdown, MenuProps, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'

interface WordleDropdownProps {
  difficulty: string
  onChangeDifficulty: (key: string) => void
}

const WordleDropdown = ({
  difficulty,
  onChangeDifficulty,
}: WordleDropdownProps) => {
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'x1 Single',
      onClick: () => onChangeDifficulty('0'),
    },
    {
      key: '1',
      label: 'x2 Double',
      onClick: () => onChangeDifficulty('1'),
    },
    {
      key: '2',
      label: 'x4 Quadruple',
      onClick: () => onChangeDifficulty('2'),
    },
  ]

  return (
    <Dropdown
      menu={{items, selectable: true, defaultSelectedKeys: [difficulty]}}
    >
      <a
        style={{width: '20rem', margin: '0.5rem 0', textAlign: 'end'}}
        onClick={e => e.preventDefault()}
      >
        <Space>
          options
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default WordleDropdown
