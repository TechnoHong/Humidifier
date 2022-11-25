import React from 'react'
import {Button, Form, Input} from 'antd'

export interface UserInfoProps {
  email: string
  nickname: string
  onLogout: () => void
}

const UserInfo = ({email, nickname, onLogout}: UserInfoProps) => {
  return (
    <Form layout='vertical'>
      <Form.Item label='Username'>
        <Input value={email} disabled />
      </Form.Item>
      <Form.Item label='Nickname'>
        <Input value={nickname} disabled />
      </Form.Item>
      <Form.Item>
        <Button danger style={{width: '100%'}} onClick={onLogout}>
          Logout
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserInfo
