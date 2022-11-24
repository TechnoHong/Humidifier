import React, {useEffect, useState} from 'react'
import PostService from '../../service/PostService'
import {useNavigate, useParams} from 'react-router-dom'
import {PostVo} from '../../models/PostVo'
import {Button, Space, Tooltip, Typography, Modal, message} from 'antd'
import {EditOutlined, DeleteOutlined, BookOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const {Title, Text} = Typography

const Document = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostVo>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    PostService.getPost(params.postId)
      .then(res => {
        setPost(res.data)
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: ' 데이터 호출 실패... ',
        })
      })
  }, [])

  const onEditHandler = () => {
    navigate('/editor', {
      state: {
        postId: params.postId,
      },
    })
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    PostService.deletePost(params.postId)
      .then(res => {
        console.log('Delete Result >> ' + JSON.stringify(res))
        if (res.status == 200) {
          navigate(-1)
        }
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: ' 삭제 실패... ',
        })
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {contextHolder}
      {post && (
        <Space direction='vertical' style={{display: 'flex'}}>
          <Space style={{float: 'right'}}>
            <Tooltip title='bookmark'>
              <Button type='primary' shape='circle' icon={<BookOutlined />} />
            </Tooltip>
            <Tooltip title='edit'>
              <Button
                type='primary'
                shape='circle'
                icon={<EditOutlined />}
                onClick={onEditHandler}
              />
            </Tooltip>
            <Tooltip title='delete'>
              <Button
                type='primary'
                shape='circle'
                icon={<DeleteOutlined />}
                onClick={showModal}
              />
            </Tooltip>
          </Space>
          <Title style={{margin: 0}}>{post.title}</Title>
          <Text style={{float: 'right'}} type='secondary'>
            최초작성자 : {post.firstAuthor || 'Anonymous'}
            수정자 : {post.lastAuthor || 'Anonymous'}
          </Text>
          <Text style={{float: 'right'}} type='secondary' italic>
            최초등록일 : {post.firstDate} 수정일 : {post.lastDate}
          </Text>
          <div dangerouslySetInnerHTML={{__html: post.content}} />
        </Space>
      )}
      <Modal
        title='삭제하시겠습니까?'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>삭제된 문서는 복구할 수 없습니다.</p>
      </Modal>
    </>
  )
}

export default Document
