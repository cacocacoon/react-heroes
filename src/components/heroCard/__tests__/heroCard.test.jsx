import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import TestRenderer from 'react-test-renderer'

import HeroCard from '../heroCard'

afterEach(cleanup)
const mockStore = configureMockStore()

function TestHeroCard({ store, hero, selected }) {
	return (
		<Provider store={store}>
			<Router>
				<HeroCard hero={hero} selected={selected} />
			</Router>
		</Provider>
	)
}
const hero = {
	id: "1",
	image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
	name: "Daredevil"
}

describe('heroCard', () => {
	const store = mockStore({})

	test('view', () => {
		const testHeroCard = TestRenderer.create(
			<TestHeroCard store={store} hero={hero} selected/>
		)

		expect(testHeroCard.toJSON()).toMatchSnapshot()
	})

	test('click hero card', () => {
		store.dispatch = jest.fn(store.dispatch)
		act(() => {
			render(<TestHeroCard store={store} hero={hero} selected />)
		})
		const a = document.getElementsByTagName('a')[0]
		fireEvent.click(a)

		expect(store.dispatch.mock.calls[0][0]).toEqual({
			type: "SELECT_HERO",
			payload: {
				heroId: "1"
			}
		})
	})
})