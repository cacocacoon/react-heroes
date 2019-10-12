import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchHeroProfile } from '../reducers/heroReducer' 

export default function useHeroProfile(heroId) {
	const heroProfile = useSelector(state => state.hero.profiles[heroId])
	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		if (!heroProfile) {
			dispatch(fetchHeroProfile(heroId)).catch(() => {
				history.push('/')
			})
		}
	}, [dispatch, heroId, heroProfile, history])

	return heroProfile
}