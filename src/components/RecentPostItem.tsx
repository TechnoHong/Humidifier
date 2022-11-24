import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

export interface RecentPostItemProps {
  id?: number
  title: string
  author?: string | null
  date?: string
}

const RecentPostItem = ({id, title, author, date}: RecentPostItemProps) => {
  const navigate = useNavigate()

  const onClickDetail = () => {
    navigate(`/document/${id}`)
  }

  return (
    <ItemContainer>
      <div>{id}</div>
      <div style={{cursor: 'pointer'}} onClick={onClickDetail}>
        {title}
      </div>
      <div>{author || 'Anonymous'}</div>
      <div>{date}</div>
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export default RecentPostItem
