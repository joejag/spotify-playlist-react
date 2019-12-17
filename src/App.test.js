/* eslint-env jest */

import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render, wait, waitForElement } from '@testing-library/react'

import App from './App'
import React from 'react'
import fetchPlaylist from './api/api'

jest.mock('./api/api')

afterAll(() => {
  jest.resetAllMocks()
})

const buildPlaylist = () => {
  return {
    data: {
      tracks: [
        {
          title: 'Alright',
          artists: ['Kendrick Lamar'],
          artistId: '2YZyLoL8N0Wb9xBt1NhZWg',
          trackId: '3iVcZ5G6tvkXZkZKlMpIUs',
          url: 'https://open.spotify.com/track/3iVcZ5G6tvkXZkZKlMpIUs',
          genres: [
            'conscious hip hop',
            'hip hop',
            'pop rap',
            'rap',
            'west coast rap'
          ]
        }
      ],
      genres: [{ value: 'escape room', count: 25 }],
      years: []
    }
  }
}

it('loads playlist and renders tracks', async () => {
  fetchPlaylist.mockResolvedValueOnce(buildPlaylist())
  const { getByText, getAllByRole } = render(<App />)

  fireEvent.click(getByText(/search/i))
  expect(getByText(/loading/i)).toBeInTheDocument()

  await waitForElement(() => getByText(/Tracks/i))

  const tracksAndGenresText = getAllByRole('listitem').map(el => el.textContent)
  expect(tracksAndGenresText).toEqual(['Alright • Kendrick Lamar'])

  expect(getByText(/escape room/i)).toBeInTheDocument()
})

it('an error is rendered if there is a problem loading the playlist', async () => {
  fetchPlaylist.mockRejectedValueOnce({ message: 'oh no' })
  const { getByText, getByRole } = render(<App />)

  // expect(getByText(/loading/i)).toBeInTheDocument()

  await waitForElement(() => getByText(/wrong/i))

  const alert = getByRole('alert')
  await wait(() => expect(alert).toHaveTextContent('oh no'))
})
