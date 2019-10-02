import React from 'react'
import thunk from 'redux-thunk'
import { MemoryRouter as Router } from 'react-router-dom'
import { cleanup, render, fireEvent } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import TestRenderer, { act } from 'react-test-renderer'

import HeroProfile from '../heroProfile'

global.fetch = jest.fn().mockImplementation(() => (
	Promise.resolve({
		json: () => Promise.resolve({})
	})
))

afterEach(cleanup)
const mockStore = configureMockStore([thunk])

function TestHeroProfile({ store, heroId }) {
	return (
		<Provider store={store} >
			<Router>
				<HeroProfile match={{ params: { heroId } }} />
			</Router>
		</Provider>
	)
}

const store = mockStore({
	hero: {
		profiles: { '1': {
			str: 2,
			int: 7,
			agi: 9,
			luk: 7,
			maxPoints: 25
		}}
	}
})
describe('heroProfile', () => {
	test('dont show', async () => {
		let heroProfile
		await act(async () => {
			heroProfile = TestRenderer.create(
				<TestHeroProfile store={store} />
			)
		})

		expect(heroProfile.toJSON()).toMatchSnapshot()
	})

	test('loading', async () => {
		let heroProfile
		await act(async () => {
			heroProfile = TestRenderer.create(
				<TestHeroProfile store={store} heroId="2" />
			)
		})

		expect(heroProfile.toJSON()).toMatchSnapshot()
	})

	test('show profile', async () => {
		let heroProfile
		await act(async () => {
			heroProfile = TestRenderer.create(
				<TestHeroProfile store={store} heroId="1" />
			)
		})

		expect(heroProfile.toJSON()).toMatchSnapshot()
	})

	test('save profile success', async () => {
		store.dispatch = jest.fn(store.dispatch)
		global.fetch = jest.fn().mockImplementationOnce(() => (
			Promise.resolve({
				text: () => Promise.resolve('ok')
			})
		))
		await act(async () => {
			render(<TestHeroProfile store={store} heroId="1" />)
		})

		const button = document.getElementsByClassName('save-button')[0]
		act(() => {
			fireEvent.click(button)
		})
		const response = await store.dispatch.mock.results[1].value
		expect(response).toBe('ok')
	})
})