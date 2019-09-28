import { useState, useEffect } from 'react'

export default function useHeros() {
	const [{ heros, loading }, setHeros] = useState({ heros: [], loading: true })

	useEffect(() => {
		async function fetchHeros() {
			const response = await fetch('https://hahow-recruit.herokuapp.com/heroes')
			const heros = await response.json()
			setHeros({ heros, loading: false })
		}

		fetchHeros()
	}, [])

	return { heros, loading }
}