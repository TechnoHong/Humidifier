import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../service/auth/store/authContext'
import {useForm} from 'antd/es/form/Form'
import {AutoComplete, Button, Form, Input} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'

const CreateAccount = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  const submitHandler = async () => {
    setLoading(true)
    authCtx.signup(
      form.getFieldValue('username'),
      form.getFieldValue('password'),
      form.getFieldValue('nickname'),
    )
    setLoading(false)

    if (authCtx.isSuccess) {
      // TODO 화면이 넘어가지 않음
      navigate('/', {replace: true})
    }
  }

  const onWebsiteChange = (value: string) => {
    if (!value || value.includes('@')) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(
        ['@ocube.co.kr', '@naver.com', '@gmail.com'].map(
          domain => `${value}${domain}`,
        ),
      )
    }
  }

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }))

  return (
    <Form
      form={form}
      style={{maxWidth: '25rem', margin: '3rem auto'}}
      name='basic'
      onFinish={submitHandler}
    >
      <Form.Item
        name='username'
        rules={[{required: true, message: 'Input E-mail'}]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{required: true, message: 'Input Password'}]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item
        name='nickname'
        rules={[{required: true, message: 'Input Nickname'}]}
      >
        <Input placeholder='Nickname' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' style={{width: '100%'}}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateAccount
