const initState = {
	selectedHeroId: '0'
}

const SELECT_HERO = 'SELECT_HERO'

export function selectHero(heroId) {
	return {
		type: SELECT_HERO,
		payload: { heroId }
	}
}

export default function uiReducer(state = initState, action) {
	switch (action.type) {
		case SELECT_HERO:
			return { ...state, selectedHeroId: action.payload.heroId }
		default:
			return state
	}
}