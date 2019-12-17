import React, { useState } from 'react'

import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

const GenreCheckBox = ({ g, selected, setSelected }) => {
  return (
    <Form.Check inline type='checkbox' id={`genre-list-${g.value}`}>
      <Form.Check.Input
        type='checkbox'
        data-testid={`genre-toggle-${g.value}`}
        checked={selected}
        onChange={() => {
          setSelected(!selected)
        }}
      />
      <Form.Check.Label>
        {g.value} <Badge variant='secondary'>{g.count}</Badge>
      </Form.Check.Label>
    </Form.Check>
  )
}

const YearCheckBox = ({ year, selected, setSelected }) => {
  return (
    <Form.Check inline type='checkbox' id={`year-${year.value}`}>
      <Form.Check.Input
        type='checkbox'
        checked={selected}
        data-testid={`year-toggle-${year.value}`}
        onChange={() => {
          setSelected(!selected)
        }}
      />
      <Form.Check.Label>
        {year.value} <Badge variant='secondary'>{year.count}</Badge>
      </Form.Check.Label>
    </Form.Check>
  )
}

const Track = ({ track }) => {
  return (
    <ListGroup.Item role='listitem'>
      <strong>{track.title}</strong> • {track.artists[0]}
    </ListGroup.Item>
  )
}

const Playlist = ({ name, author, years, tracks, genres }) => {
  const extendedGenres = genres.map(g => {
    return { ...g, selected: true }
  })
  const [genreWithSelection, setGenreWithSelection] = useState(extendedGenres)
  const removedGenres = genreWithSelection
    .filter(g => !g.selected)
    .map(g => g.value)
  const bannedGenre = g => removedGenres.includes(g)

  const extendedYears = years.map(y => {
    return { ...y, selected: true }
  })
  const [yearsWithSelection, setYearsWithSelection] = useState(extendedYears)
  const removedYears = yearsWithSelection
    .filter(y => !y.selected)
    .map(y => y.value)
  const bannedYear = y => removedYears.includes(y)

  const filteredTracks = tracks
    .filter(t => !t.genres.some(bannedGenre))
    .filter(t => !bannedYear(t.releaseYear))

  return (
    <>
      <Row>
        <Col>
          <h2>
            {name} <em>by</em> {author}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col sm='4'>
          <h3>Years</h3>
          <Form>
            {yearsWithSelection.map((year, index) => (
              <YearCheckBox
                key={year.value}
                year={year}
                selected={year.selected}
                setSelected={value => {
                  setYearsWithSelection(prevState =>
                    prevState.map((ps, i) => {
                      if (index === i) {
                        return { ...ps, selected: value }
                      }
                      return ps
                    })
                  )
                }}
              />
            ))}
          </Form>

          <h3>Genres</h3>
          <Form>
            {genreWithSelection.map((g, index) => (
              <GenreCheckBox
                key={g.value}
                g={g}
                selected={g.selected}
                setSelected={value => {
                  setGenreWithSelection(prevState =>
                    prevState.map((ps, i) => {
                      if (index === i) {
                        return { ...ps, selected: value }
                      }
                      return ps
                    })
                  )
                }}
              />
            ))}
          </Form>
        </Col>
        <Col sm='8'>
          <h3>
            Tracks ({filteredTracks.length} / {tracks.length})
          </h3>
          <ListGroup variant='flush'>
            {filteredTracks.map(track => (
              <Track key={track.trackId} track={track} />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default Playlist
