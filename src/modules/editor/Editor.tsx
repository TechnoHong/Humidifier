import React, {useEffect, useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import {Button, Typography} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'
import {PostVo} from '../../models/PostVo'
import PostService from '../../service/PostService'

const Editor = () => {
  const navigate = useNavigate()

  const modules = {
    toolbar: [
      [{header: [1, 2, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]

  const [post, setPost] = useState<PostVo>({
    title: 'Edit Title',
    content: '',
  })
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('Edit Title')
  const {state} = useLocation()

  useEffect(() => {
    state &&
      PostService.getPost(state.postId).then(res => {
        setPost(res.data)
        setValue(res.data.content)
        setTitle(res.data.title)
      })
  }, [])

  useEffect(() => {
    setPost({
      ...post,
      title: title,
      content: value,
    })
  }, [title, value])

  const onSubmitHandler = () => {
    const post: PostVo = {
      title: title,
      content: value,
    }
    console.log('Posting Post >> ' + JSON.stringify(post))
    PostService.postPost(post).then(res => {
      navigate(-1)
    })
  }

  const onEditHandler = () => {
    console.log('Updating Post >> ' + JSON.stringify(post))
    PostService.updatePost(state.postId, post).then(res => {
      navigate(-1)
    })
  }

  const onCancelHandler = () => {
    navigate(-1)
  }

  return (
    <EditorContainer>
      <EditorHeader style={{flexGrow: 0}}>
        <Typography.Title
          editable={{onChange: setTitle}}
          level={1}
          style={{margin: 0}}
        >
          {title}
        </Typography.Title>
        <div>
          <Button
            danger
            onClick={onCancelHandler}
            style={{marginRight: '0.5rem'}}
          >
            Cancel
          </Button>
          {state ? (
            <Button type='primary' onClick={onEditHandler}>
              Edit
            </Button>
          ) : (
            <Button type='primary' onClick={onSubmitHandler}>
              Submit
            </Button>
          )}
        </div>
      </EditorHeader>
      <ReactQuill
        style={{flexGrow: 1}}
        theme='snow'
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
      />
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const EditorHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
`

export default Editor
