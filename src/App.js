import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import fetchPlaylist from './api/api'
import Playlist from './components/Playlist'
import PlaylistSearch from './components/PlaylistSearch'

export const DEFAULT_PLAYLIST = '16FzcfDid0m2i2EttomvSR' // Pitchforks 2010s

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
    <Container>
      <Row>
        <Col>
          <h1>Spotify Playlist Splitter</h1>
          <PlaylistSearch setSearch={setSearch} />
        </Col>
      </Row>
      <Row>
        <Col>
          {error ? <Alert variant='danger'>Something went wrong... {error.message}</Alert> : null}
          {loading ? <Alert variant='info'> Loading </Alert> : null}
        </Col>
      </Row>
      {playlist ? (
        <Playlist
          name='Pitchfork 2010s'
          author='a person'
          years={playlist.years}
          tracks={playlist.tracks}
          genres={playlist.genres}

        />) : null}
    </Container>
  )
}

export default App
