import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroes } from '../reducers/heroReducer'
export default function useHeroes() {
	const heroes = useSelector(state => state.hero.list)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchHeroes())
	}, [dispatch])

	return { heroes, loading: heroes.length === 0 }
}