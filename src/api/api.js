import axios from 'axios'

const WEB_SERVICE = 'http://localhost:8080/response.json'

const fetchPlaylist = async (id) => {
  return axios(`${WEB_SERVICE}?query=${id}`, { mode: 'no-cors' })
}

export default fetchPlaylist
