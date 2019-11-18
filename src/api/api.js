import axios from 'axios'

// http://REAL_HOST/playlistInfo/16FzcfDid0m2i2EttomvSR
const WEB_SERVICE = 'http://localhost:8080/response.json'

const fetchPlaylist = async (id) => {
  return axios(`${WEB_SERVICE}?query=${id}`, { mode: 'no-cors' })
}

export default fetchPlaylist
