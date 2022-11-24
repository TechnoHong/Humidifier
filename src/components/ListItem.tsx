import React from 'react'
import {Card} from 'antd'

export interface ListItemProps {
  id: string
  title: string
  category: string
  author: string
  date: string
}

const ListItem = ({id, title, category, author, date}: ListItemProps) => {
  return (
    <Card
      title={title}
      extra={<a href='#'>More</a>}
      style={{width: '20rem'}}
      size='small'
    >
      <p>{id}</p>
      <p>{author}</p>
      <p>{category}</p>
      <p>{date}</p>
    </Card>
  )
}

export default ListItem
