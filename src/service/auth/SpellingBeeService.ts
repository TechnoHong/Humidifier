import axios from 'axios'
import {SpellingBeeVo} from '../../models/SpellingBeeVo'

const SB_API_BASE_URL = 'http://localhost:8080/spellingbee/'

class SpellingBeeService {
  getBees() {
    return axios.get(SB_API_BASE_URL + 'allbees')
  }

  postBee(bee: SpellingBeeVo) {
    return axios.post(SB_API_BASE_URL + 'bee', bee)
  }

  getBee(memberId: string) {
    return axios.get(SB_API_BASE_URL + 'bee/' + memberId)
  }

  updateBee(postId: string, bee: SpellingBeeVo) {
    return axios.put(SB_API_BASE_URL + 'bee/' + postId, bee)
  }
}

export default new SpellingBeeService()
