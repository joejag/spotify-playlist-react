import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

const Playlist = ({ tracks, genres }) => {
  return (
    <Container>
      <Row>
        <Col sm='4'>
          <h3>Genres</h3>
          <Form>
            {genres.map(g => (
              <Form.Check inline key={g.genre} type='checkbox' id={`genre-list-${g.genre}`}>
                <Form.Check.Input type='checkbox' />
                <Form.Check.Label>{g.genre} <Badge variant='secondary'>{g.count}</Badge></Form.Check.Label>
              </Form.Check>
            ))}
          </Form>
        </Col>
        <Col sm='8'>
          <h3>Tracks</h3>
          <ListGroup variant='flush'>
            {tracks.map(track => (
              <ListGroup.Item
                key={track.trackId}
                role='listitem'
              >{track.title} by {track.artists[0]}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Playlist
