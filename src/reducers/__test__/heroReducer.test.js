import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import heroReducer, { fetchHeroes, fetchHeroProfile, patchHeroProfile } from '../heroReducer'


const mockHeroes = [{ id: "1", image: "jpg", name: "Daredevil" }]
const mockProfile = { str: 2, int: 7, agi: 9, luk: 7 }
global.fetch = jest.fn().mockImplementationOnce(() => (
	Promise.resolve({
		json: () => Promise.resolve(mockHeroes)
	})
)).mockImplementationOnce(() => (
	Promise.resolve({
		json: () => Promise.resolve(mockProfile)
	})
)).mockImplementationOnce(() => (
	Promise.resolve({
		text: () => Promise.resolve('ok')
	})
))
const mockStore = configureMockStore([thunk])

describe('heroReducer - async actions', () => {
	test('fetchHeroData', async () => {
		const store = mockStore({})
		await store.dispatch(fetchHeroes())
		await store.dispatch(fetchHeroProfile('1'))
		const actions = store.getActions()
		const text = await store.dispatch(patchHeroProfile('1', { str: 2, int: 7, agi: 9, luk: 7 }))

		expect(actions[0]).toEqual({
			type: "SET_HEROES",
			payload: {
				heroes: [{ id: "1", image: "jpg", name: "Daredevil" }]
			}
		})

		expect(actions[1]).toEqual({
			type: "SET_PROFILE",
			payload: {
				heroId: '1',
				profile: { str: 2, int: 7, agi: 9, luk: 7, maxPoints: 25 }
			}
		})

		expect(text).toEqual('ok')

	})

	const initState = {
		list: [],
		profiles: {}
	}
	test('heroReducer', () => {
		expect(heroReducer(undefined, { type: 'init' })).toEqual(initState)

		expect(heroReducer(initState, { type: 'SET_HEROES', payload: { heroes: mockHeroes } }))
			.toEqual({ list: [{ id: "1", image: "jpg", name: "Daredevil" }], profiles: {} })

		expect(heroReducer(initState, { type: 'SET_PROFILE', payload: { heroId: '2', profile: mockProfile } }))
			.toEqual({ list: [], profiles: { "2": { agi: 9, int: 7, luk: 7, maxPoints: 25, str: 2 } } })
	})
})
