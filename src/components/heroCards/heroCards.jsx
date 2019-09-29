import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, Icon } from 'antd'
import useHeroes from '../../hooks/useHeroes'
import { useSelector } from 'react-redux'
import HeroCard from '../heroCard/heroCard'

export default function HeroCards() {
	const { heroes, loading } = useHeroes()
	const selectedHeroId = useSelector(state => state.ui.selectedHeroId)
	return (
		<div className="hero-cards">
			<h1>Go Hero!</h1>
			{loading && <Icon type="loading" style={{ fontSize: 24 }} spin ></Icon>}
			<Row gutter={{ xs: 16, sm: 16, md: 24 }}>
				<QueueAnim delay={300}>
					{heroes.map(hero => (
						<Col xs={12} sm={6} md={6} key={hero.id}>
							<HeroCard loading={loading} hero={hero} selected={selectedHeroId === hero.id} />
						</Col>
					))}
				</QueueAnim>
			</Row>
		</div>
	)
}