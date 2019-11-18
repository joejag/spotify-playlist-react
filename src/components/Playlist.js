import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

const GenreCheckBox = ({ g, selected, setSelected }) => {
  return (
    <Form.Check inline type='checkbox' id={`genre-list-${g.genre}`}>
      <Form.Check.Input
        type='checkbox'
        data-testid={`genre-toggle-${g.genre}`}
        checked={selected}
        onChange={() => { setSelected(!selected) }}
      />
      <Form.Check.Label>{g.genre} <Badge variant='secondary'>{g.count}</Badge></Form.Check.Label>
    </Form.Check>
  )
}

const YearCheckBox = ({ year }) => {
  const [selected, setSelected] = useState(true)
  return (
    <Form.Check inline type='checkbox' id={`year-${year}`}>
      <Form.Check.Input
        type='checkbox'
        checked={selected}
        onChange={() => { setSelected(!selected) }}
      />
      <Form.Check.Label>{year} <Badge variant='secondary'>80</Badge></Form.Check.Label>
    </Form.Check>
  )
}

const Track = ({ track }) => {
  return (
    <ListGroup.Item role='listitem'>
      {track.title} by {track.artists[0]}
    </ListGroup.Item>
  )
}

const Playlist = ({ name, author, years, tracks, genres }) => {
  const extendedGenres = genres.map((g) => { return { ...g, selected: true } })
  const [genreWithSelection, setGenreWithSelection] = useState(extendedGenres)

  const removedGenres = genreWithSelection.filter(g => !g.selected).map(g => g.genre)
  const bannedGenre = g => removedGenres.includes(g)

  const filteredTracks = tracks.filter(t => !t.genres.some(bannedGenre))

  return (
    <>
      <Row>
        <Col>
          <h2>{name} <em>by</em> {author}</h2>
        </Col>
      </Row>
      <Row>
        <Col sm='4'>
          <h3>Years ({years.length})</h3>
          <Form>
            {years.map((year) => (<YearCheckBox key={year} year={year} />))}
          </Form>

          <h3>Genres ({genreWithSelection.length})</h3>
          <Form>
            {genreWithSelection.map((g, index) => (
              <GenreCheckBox
                key={g.genre}
                selected={g.selected}
                g={g}
                setSelected={(value) => {
                  setGenreWithSelection(prevState =>
                    prevState.map((ps, i) => {
                      if (index === i) {
                        return { ...ps, selected: value }
                      }
                      return ps
                    }))
                }}
              />)
            )}
          </Form>
        </Col>
        <Col sm='8'>
          <h3>Tracks ({filteredTracks.length} / {tracks.length})</h3>
          <ListGroup variant='flush'>
            {filteredTracks.map(track => (<Track key={track.trackId} track={track} />))}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default Playlist
