import React from 'react'
import thunk from 'redux-thunk'
import { MemoryRouter as Router } from 'react-router-dom'
import { cleanup } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import TestRenderer, { act } from 'react-test-renderer'

import HeroCards from '../heroCards'

jest.mock('rc-queue-anim', () => {
	return function MockQueueAnim(props) {
		return props.children
	}
})

global.fetch = jest.fn().mockImplementation(() => (
	Promise.resolve({
		json: () => Promise.resolve([])
	})
))

afterEach(cleanup)
const mockStore = configureMockStore([thunk])

function TestHeroCards({ store }) {
	return (
		<Provider store={store} >
			<Router>
				<HeroCards />
			</Router>
		</Provider>
	)
}

describe('heroCards', () => {
	test('empty hero', async () => {
		const store = mockStore({ hero: { list: [] }, ui: { selectedHeroId: 1 } })
		let heroCards
		await act(async () => {
			heroCards = TestRenderer.create(
				<TestHeroCards store={store} />
			)
		})

		expect(heroCards.toJSON()).toMatchSnapshot()
	})

	test('include heros', async () => {
		const store = mockStore({
			hero: {
				list: [{
					id: "1",
					image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
					name: "Daredevil"
				}, {
					id: "2",
					image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
					name: "Test"
				}]
			},
			ui: { selectedHeroId: 1 }
		})
		let testHeroCards
		await act(async () => {
			testHeroCards = TestRenderer.create(
				<TestHeroCards store={store} />
			)
		})

		expect(testHeroCards).toMatchSnapshot()
	})
})