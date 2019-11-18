import React, { useState } from 'react'
import { DEFAULT_PLAYLIST } from '../App'

const PlaylistSearch = ({ setSearch }) => {
  const [query, setQuery] = useState(DEFAULT_PLAYLIST)

  return (
    <form onSubmit={(event) => { setSearch(query); event.preventDefault() }}>
      <label>
    Spotify playlist id:
        <input
          type='text'
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>
      <button type='submit'> Search </button>
    </form>
  )
}

export default PlaylistSearch
