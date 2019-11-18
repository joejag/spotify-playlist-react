import React from 'react'

const Playlist = ({ tracks, genres }) => {
  return (
    <div>
      <h3>Tracks</h3>
      <ul>
        {tracks.map(track => (
          <li key={track.trackId} data-id={track.trackId}>{track.title} by {track.artists[0]}</li>
        ))}
      </ul>
      <h3>Genres</h3>
      <ul>
        {genres.map(g => (
          <li key={g.genre}>{g.genre} : {g.count}</li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist
