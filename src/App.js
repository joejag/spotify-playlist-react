import React, { useState, useEffect } from 'react'

import fetchPlaylist from './api/api'
import Playlist from './components/Playlist'
import PlaylistSearch from './components/PlaylistSearch'
import './App.css'

const App = () => {
  const [playlist, setPlaylist] = useState(null)
  const [search, setSearch] = useState('Pitchfork')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    const fetchUsersPlaylist = () => {
      setIsLoading(true)
      setIsError(null)
      setPlaylist(null)

      fetchPlaylist(search)
        .then(
          result2 => {
            setPlaylist({ result: result2.data })
            setIsLoading(false)
          },
          error => {
            setIsError(error)
            setIsLoading(false)
          }
        )
    }

    fetchUsersPlaylist()
  }, [search])

  return (
    <article>
      <PlaylistSearch setSearch={setSearch} />

      <div role='alert' aria-live='polite'>
        {isLoading ? 'Loading...' : isError ? 'Something went wrong...' + isError.message : null}
      </div>

      {playlist ? <Playlist tracks={playlist.result.tracks} genres={playlist.result.genres} /> : null}
    </article>
  )
}

export default App
