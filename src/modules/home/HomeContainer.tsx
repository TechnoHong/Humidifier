import React from 'react'
import RcQueueAnim from 'rc-queue-anim'
import RecentPosts from './RecentPosts'
import styled from 'styled-components'
import {FloatButton} from 'antd'
import {useNavigate} from 'react-router-dom'
import IntroAnimation from '../intro/IntroAnimation'

const HomeContainer = () => {
  const navigate = useNavigate()

  return (
    <>
      <IntroAnimation />
      <RcQueueAnim delay={450}>
        <div key='a'>
          <RecentPosts />
        </div>
      </RcQueueAnim>
      <FloatButton
        type='primary'
        tooltip='새 글 작성'
        onClick={() => navigate('/editor')}
      />
    </>
  )
}

export default HomeContainer
