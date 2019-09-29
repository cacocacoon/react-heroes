import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { selectHero } from '../../reducers/uiReducer'
import './heroCard.scss'

export default function HeroCard({ loading, hero, selected, ...props }) {
	const dispatch = useDispatch()

	function clickHeroCard() {
		dispatch(selectHero(hero.id))
	}

	return (
		<Link key={hero.id} to={`/heroes/${hero.id}`} onClick={clickHeroCard}>
			<Card className={`card-body ${selected ? 'selected' : ''}`} {...props}>
				<img className="hero-img" src={hero.image} alt={hero.name} />
				<p>{hero.name}</p>
			</Card>
		</Link>
	)
}
