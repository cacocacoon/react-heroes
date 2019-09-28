import React from 'react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, Icon } from 'antd';
import useHeros from '../../hooks/useHeros'
import HeroCard from '../heroCard/heroCard'

export default function HeroCards() {
	const { heros, loading } = useHeros()
	
	return (
		<div className="hero-cards">
			<h1>Go Hero!</h1>
			{loading && <Icon type="loading" style={{ fontSize: 24 }} spin ></Icon>}
			<Row gutter={{ xs: 8, sm: 16, md: 24 }}>
				<QueueAnim delay={300}>
					{heros.map(hero => (
						<Col xs={12} sm={6} md={6} key={hero.id}>
							<HeroCard loading={loading} hero={hero} />
						</Col>
					))}
				</QueueAnim>
			</Row>
		</div>
	)
}