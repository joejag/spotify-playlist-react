import axios from 'axios'

// const WEB_SERVICE = 'http://localhost:4000/playlistInfo'
const WEB_SERVICE = 'https://ndb4t6or5d.execute-api.eu-west-2.amazonaws.com/prod/playlistInfo'

const fetchPlaylist = async (id) => {
  return axios(`${WEB_SERVICE}/${id}`, { mode: 'no-cors' })
}

export default fetchPlaylist
