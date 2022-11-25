import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../service/auth/store/authContext'

const NavigationLoginItem = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)
  const [nickname, setNickname] = useState('')
  const isLogin = authCtx.isLoggedIn
  const isGet = authCtx.isGetSuccess

  const callback = (str: string) => {
    setNickname(str)
  }

  useEffect(() => {
    if (isLogin) {
      authCtx.getUser()
    }
  }, [isLogin])

  useEffect(() => {
    if (isGet) {
      callback(authCtx.userObj.nickname)
    }
  }, [isGet])

  return (
    <div>
      {!isLogin ? (
        <div onClick={() => navigate('/login')}>로그인</div>
      ) : (
        <div onClick={() => navigate('/profile')}>{nickname}</div>
      )}
    </div>
  )
}

export default NavigationLoginItem
