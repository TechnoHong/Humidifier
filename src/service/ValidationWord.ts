import axios from 'axios'

const WORDS_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

class ValidationWord {
  validateWord(word: string) {
    return axios.get(WORDS_API_URL + word)
  }
}

export default new ValidationWord()
