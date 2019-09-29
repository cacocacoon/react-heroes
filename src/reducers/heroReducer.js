const initState = {
	list: [],
	profiles: {}
}

const SET_HEROES = 'SET_HEROES'
const SET_PROFILE = 'SET_PROFILE'

export function fetchHeroes() {
	return async disptach => {
		const response = await fetch('https://hahow-recruit.herokuapp.com/heroes')
		const heroes = await response.json()
		disptach(setHeroes(heroes))
	}
}

function setHeroes(heroes) {
	return {
		type: SET_HEROES,
		payload: { heroes }
	}
}

export function fetchHeroProfile(heroId) {
	return async disptach => {
		const response = await fetch(`http://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
		const profile = await response.json()
		const maxPoints = Object.values(profile).reduce((accu, v) => accu + v, 0)
		profile.maxPoints = maxPoints
		disptach(setProfile(heroId, profile))
	}
}

export function setProfile(heroId, profile) {
	return {
		type: SET_PROFILE,
		payload: { heroId, profile }
	}
}

export function patchHeroProfile(heroId, profile) {
	return async () => {
		const response = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
			method: 'PATCH',
			body: JSON.stringify(profile),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const text = await response.text()
		return text
	}
}

export default function heroReducer(state = initState, action) {
	switch (action.type) {
		case SET_HEROES:
			return { ...state, list: action.payload.heroes }
		case SET_PROFILE:
			return { ...state, profiles: { ...state.profiles, [action.payload.heroId]: action.payload.profile } }
		default:
			return state
	}
}