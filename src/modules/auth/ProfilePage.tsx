import React, {useContext} from 'react'
import UserInfo from '../../components/UserInfo'
import AuthContext from '../../service/auth/store/authContext'
import {useNavigate} from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const logoutHandler = () => {
    authCtx.logout()
    navigate('/', {replace: true})
  }

  return (
    <div>
      <UserInfo
        email={authCtx.userObj.email}
        nickname={authCtx.userObj.nickname}
        onLogout={logoutHandler}
      />
    </div>
  )
}

export default ProfilePage
