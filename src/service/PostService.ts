import axios from 'axios'
import {PostVo} from '../models/PostVo'

const POST_API_BASE_URL = 'http://localhost:8080/api/'

class PostService {
  getPosts() {
    return axios.get(POST_API_BASE_URL + 'posts')
  }

  postPost(post: PostVo) {
    return axios.post(POST_API_BASE_URL + 'posts', post)
  }

  getPost(postId: string | undefined) {
    return axios.get(POST_API_BASE_URL + 'document/' + postId)
  }

  updatePost(postId: string | undefined, post: PostVo) {
    return axios.put(POST_API_BASE_URL + 'document/' + postId, post)
  }

  deletePost(postId: string | undefined) {
    return axios.delete(POST_API_BASE_URL + 'document/' + postId)
  }
}

export default new PostService()
