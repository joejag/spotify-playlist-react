import React, { useState } from 'react'

const PlaylistSearch = ({ setSearch }) => {
  const [query, setQuery] = useState('Pitchfork')

  return (
    <form onSubmit={(event) => { setSearch(query); event.preventDefault() }}>
      <input
        type='text'
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type='submit'> Search </button>
    </form>
  )
}

export default PlaylistSearch
