/* eslint-env jest */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Playlist from './Playlist'

const tracks = [
  {
    title: 'TITLE_1',
    artists: ['ARTIST_1'],
    trackId: 'TRACK_ID_1',
    genres: ['GENRE_1', 'GENRE_2']
  },
  {
    title: 'TITLE_2',
    artists: ['ARTIST_2'],
    trackId: 'TRACK_ID_2',
    genres: ['GENRE_2']
  }]

const genres = [{ genre: 'GENRE_1', count: 1 }, { genre: 'GENRE_2', count: 2 }]

it('filters tracks with a specified genre', () => {
  const { getAllByRole, getByTestId } = render(
    <Playlist
      name='NAME'
      author='AUTHOR'
      years={['2019', '2018']}
      tracks={tracks}
      genres={genres}
    />)

  const tracksText = getAllByRole('listitem').map(el => el.textContent)
  expect(tracksText).toEqual(['TITLE_1 by ARTIST_1', 'TITLE_2 by ARTIST_2'])

  const hiphopCheckbox = getByTestId('genre-toggle-GENRE_1')
  expect(hiphopCheckbox.checked).toEqual(true)
  fireEvent.click(hiphopCheckbox)
  expect(hiphopCheckbox.checked).toEqual(false)

  const updatesTracksText = getAllByRole('listitem').map(el => el.textContent)
  expect(updatesTracksText).toEqual(['TITLE_2 by ARTIST_2'])
})
