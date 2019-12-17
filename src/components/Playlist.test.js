/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react'

import Playlist from './Playlist'
import React from 'react'

const tracks = [
  {
    title: 'TITLE_1',
    artists: ['ARTIST_1'],
    trackId: 'TRACK_ID_1',
    genres: ['GENRE_1', 'GENRE_2'],
    releaseYear: 'YEAR_1'
  },
  {
    title: 'TITLE_2',
    artists: ['ARTIST_2'],
    trackId: 'TRACK_ID_2',
    genres: ['GENRE_2'],
    releaseYear: 'YEAR_2'
  }
]

const genres = [
  { value: 'GENRE_1', count: 1 },
  { value: 'GENRE_2', count: 2 }
]

const years = [
  { value: 'YEAR_1', count: 1 },
  { value: 'YEAR_2', count: 2 }
]

it('filters tracks with a specified genre', () => {
  const { getAllByRole, getByTestId } = render(
    <Playlist
      name='NAME'
      author='AUTHOR'
      years={years}
      tracks={tracks}
      genres={genres}
    />
  )

  const genreOneCheckbox = getByTestId('genre-toggle-GENRE_1')
  fireEvent.click(genreOneCheckbox)

  const updatesTracksText = getAllByRole('listitem').map(el => el.textContent)
  expect(updatesTracksText).toEqual(['TITLE_2 • ARTIST_2'])
})

it('filters tracks with a specified year', () => {
  const { getAllByRole, getByTestId } = render(
    <Playlist
      name='NAME'
      author='AUTHOR'
      years={years}
      tracks={tracks}
      genres={genres}
    />
  )

  const genreOneCheckbox = getByTestId('year-toggle-YEAR_2')
  fireEvent.click(genreOneCheckbox)

  const updatesTracksText = getAllByRole('listitem').map(el => el.textContent)
  expect(updatesTracksText).toEqual(['TITLE_1 • ARTIST_1'])
})
