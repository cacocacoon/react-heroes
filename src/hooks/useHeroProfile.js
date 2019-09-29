import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroProfile } from '../reducers/heroReducer' 

export default function useHeroProfile(heroId) {
	const heroProfile = useSelector(state => state.hero.profiles[heroId])
	const dispatch = useDispatch()
	if (heroId && !heroProfile) {
		dispatch(fetchHeroProfile(heroId))
	}

	return heroProfile
}