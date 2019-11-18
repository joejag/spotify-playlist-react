import React, { useState, useEffect } from 'react'

import fetchPlaylist from './api/api'
import Playlist from './components/Playlist'
import PlaylistSearch from './components/PlaylistSearch'
import './App.css'

export const DEFAULT_PLAYLIST = '16FzcfDid0m2i2EttomvSR'

const App = () => {
  const [search, setSearch] = useState(DEFAULT_PLAYLIST)
  const [appState, setAppState] = useState({ playlist: null, loading: false, error: null })
  const { playlist, loading, error } = appState

  useEffect(() => {
    const fetchUsersPlaylist = () => {
      setAppState({ playlist: null, loading: true, error: null })

      fetchPlaylist(search)
        .then(
          result => setAppState({ playlist: result.data, loading: false, error: null }),
          error => setAppState({ playlist: null, loading: false, error })
        )
    }

    fetchUsersPlaylist()
  }, [search])

  return (
    <article>
      <PlaylistSearch setSearch={setSearch} />

      <div role='alert' aria-live='polite'>
        {loading ? 'Loading...' : error ? 'Something went wrong...' + error.message : null}
      </div>

      {playlist ? <Playlist tracks={playlist.tracks} genres={playlist.genres} /> : null}
    </article>
  )
}

export default App
