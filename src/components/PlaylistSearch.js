import React, { useState } from 'react'
import { DEFAULT_PLAYLIST } from '../App'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PlaylistSearch = ({ setSearch }) => {
  const [query, setQuery] = useState(DEFAULT_PLAYLIST)

  return (
    <form onSubmit={(event) => { setSearch(query); event.preventDefault() }}>
      <Form.Group as={Row} controlId='stuff'>
        <Form.Label column sm='2'>Spotify playlist id</Form.Label>
        <Col sm='8'>
          <Form.Control
            type='text'
            placeholder={DEFAULT_PLAYLIST}
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </Col>
        <Col sm='2'>
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </Col>
      </Form.Group>

    </form>
  )
}

export default PlaylistSearch
