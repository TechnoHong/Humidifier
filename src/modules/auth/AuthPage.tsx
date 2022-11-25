import React, {useContext, useRef, useState} from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {AutoComplete, Button, Checkbox, Form, Input} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../../service/auth/store/authContext'
import {useForm} from 'antd/es/form/Form'

const AuthPage = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  const submitHandler = async () => {
    setIsLoading(true)
    authCtx.login(
      form.getFieldValue('username'),
      form.getFieldValue('password'),
    )
    setIsLoading(false)

    if (authCtx.isSuccess) {
      navigate('/', {replace: true}) // { replace: true } 뒤로가기 방지
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
      name='normal_login'
      initialValues={{remember: true}}
      onFinish={submitHandler}
    >
      <Form.Item name='username'>
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </AutoComplete>
      </Form.Item>
      <Form.Item name='password'>
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember (Not Working)</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' style={{width: '100%'}}>
          Sign in
        </Button>
        or <Link to='/signup'>Sign up</Link>
      </Form.Item>
    </Form>
  )
}

export default AuthPage
