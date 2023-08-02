import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Layout, Menu, MenuProps} from 'antd'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import NavigationLoginItem from '../components/NavigationLoginItem'

const {Header, Content, Footer} = Layout

const MainScreen = () => {
  const [currentMenu, setCurrentMenu] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setCurrentMenu(location.pathname)
  }, [location])

  const onClickMenu: MenuProps['onClick'] = e => {
    console.log('click ', e)
  }

  const items = [
    {
      key: '/',
      label: <div onClick={() => navigate('/')}>Home</div>,
    },
    {
      key: '/empty',
      label: <div onClick={() => navigate('/empty')}>🚧빈페이지🚧</div>,
    },
    {
      key: '/profile',
      label: <NavigationLoginItem />,
    },
    {
      key: '/spellingBee',
      label: <div onClick={() => navigate('/spellingBee')}>🚧SpellingBee🚧</div>,
    },
    {
      key: '/wordle',
      label: <div onClick={() => navigate('/wordle')}>🚧Wordle+🚧</div>,
    },
  ]

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header className='layout'>
        <LogoContainer />
        <Menu
          style={{borderBottom: '0'}}
          theme='dark'
          mode='horizontal'
          onClick={onClickMenu}
          defaultSelectedKeys={[currentMenu]}
          selectedKeys={[currentMenu]}
          items={items}
        />
      </Header>
      <Content
        style={{
          padding: '1rem 0',
          background: 'var(--bg)',
          margin: '1rem 0',
        }}
      >
        <Outlet />
      </Content>
      <Footer style={{textAlign: 'center'}}>Fan 3D ©2022-2023 Created by Hong</Footer>
    </Layout>
    // branch test test
  )
}

export default MainScreen

const LogoContainer = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
`

// branch test
