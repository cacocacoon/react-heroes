import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { selectHero } from '../../reducers/uiReducer'
import './heroCard.scss'

export default function HeroCard({ key, hero, selected }) {
	const dispatch = useDispatch()

	function clickHeroCard() {
		dispatch(selectHero(hero.id))
	}

	return (
		<div key={key} className="card-wrapper">
			<Link to={`/heroes/${hero.id}`} onClick={clickHeroCard}>
				<Card className={`custom-card ${selected ? 'selected' : ''}`}>
					<img className="hero-img" src={hero.image} alt={hero.name} />
					<p>{hero.name}</p>
				</Card>
			</Link>
		</div>
	)
}
