import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Icon } from 'antd'
import { useSelector } from 'react-redux'

import useHeroes from '../../hooks/useHeroes'
import HeroCard from '../heroCard/heroCard'
import './heroCards.scss'

export default function HeroCards() {
	const { heroes, loading } = useHeroes()
	const selectedHeroId = useSelector(state => state.ui.selectedHeroId)
	return (
		<div className="hero-cards-wrapper">
			{loading && <Icon type="loading" style={{ fontSize: 24 }} spin />}
			<div className="hero-cards">
				<QueueAnim delay={300}>
					{heroes.map(hero => (
						<HeroCard key={hero.id} hero={hero} selected={selectedHeroId === hero.id} />
					))}
				</QueueAnim>
			</div>
		</div>
	)
}