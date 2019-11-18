import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

const GenreCheckBox = ({ g }) => {
  const [selected, setSelected] = useState(true)
  return (
    <Form.Check inline type='checkbox' id={`genre-list-${g.genre}`}>
      <Form.Check.Input
        type='checkbox'
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
  return (
    <>
      <Row>
        <Col>
          <h2>{name} by {author}</h2>
        </Col>
      </Row>
      <Row>
        <Col sm='4'>

          <h3>Years</h3>
          {years.map((year) => (<YearCheckBox key={year} year={year} />))}

          <h3>Genres</h3>
          <Form>
            {genres.map((g) => (<GenreCheckBox key={g.genre} g={g} />))}
          </Form>
        </Col>
        <Col sm='8'>
          <h3>Tracks ({tracks.length})</h3>
          <ListGroup variant='flush'>
            {tracks.map(track => (<Track key={track.trackId} track={track} />))}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default Playlist
