import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const [playlist, setPlaylist] = useState({ result: { tracks: [], genres: [] } })
  const [query, setQuery] = useState('Pitchfork')
  const [search, setSearch] = useState('Pitchfork')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchStuff = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        const result = await axios(`http://localhost:8080/response.json?query=${search}`, { mode: 'no-cors' })
        setPlaylist({ result: result.data })
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchStuff()
  }, [search])

  return (
    <article>
      <form onSubmit={(event) => { setSearch(query); event.preventDefault() }}>
        <input
          type='text'
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type='submit'> Search </button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <h3>Tracks</h3>
          <ul>
            {playlist.result.tracks.map(track => (
              <li key={track.trackId}>{track.title} by {track.artists[0]}</li>
            ))}
          </ul>
          <h3>Genres</h3>
          <ul>
            {playlist.result.genres.map(g => (
              <li key={g.genre}>{g.genre} : {g.count}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}

export default App
