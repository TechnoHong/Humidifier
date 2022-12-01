import React from 'react'
import {Table} from 'antd'
import {HistoryData} from './SpellingBeeContainer'

interface HistoryProps {
  history: HistoryData[]
}

const SpellingBeeTable = ({history}: HistoryProps) => {
  const columns = [
    {
      title: 'index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'words',
      dataIndex: 'words',
      key: 'words',
    },
    {
      title: 'definitions',
      dataIndex: 'definitions',
      key: 'definitions',
    },
  ]
  return <Table dataSource={history} columns={columns} />
}

export default SpellingBeeTable
