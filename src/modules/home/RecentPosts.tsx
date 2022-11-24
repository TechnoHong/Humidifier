import React, {useEffect, useState} from 'react'
import RcQueueAnim from 'rc-queue-anim'
import {Card, message, Skeleton} from 'antd'
import RecentPostItem from '../../components/RecentPostItem'
import styled from 'styled-components'
import TestService from '../../service/PostService'
import {PostVo} from '../../models/PostVo'

const RecentPosts = () => {
  const [posts, setPosts] = useState<PostVo[]>([])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    TestService.getPosts()
      .then(res => {
        setPosts(res.data)
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: ' 데이터 호출 실패... ',
        })
      })
  }, [])

  return (
    <>
      {contextHolder}
      <CardContainer
        title='CARD1'
        extra={<a href='#'>More</a>}
        style={{width: '100%'}}
        size='small'
        hoverable
      >
        {posts ? (
          <RcQueueAnim delay={900} style={{minHeight: '4rem'}}>
            {posts.map((item, idx) => {
              return (
                <div key={idx}>
                  <RecentPostItem
                    id={item.id}
                    title={item.title}
                    author={item.firstAuthor}
                    date={item.firstDate}
                  />
                </div>
              )
            })}
          </RcQueueAnim>
        ) : (
          <Skeleton active />
        )}
      </CardContainer>
    </>
  )
}

const CardContainer = styled(Card)`
  cursor: default;
`

export default RecentPosts
