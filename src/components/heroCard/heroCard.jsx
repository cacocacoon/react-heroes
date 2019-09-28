import React from 'react'
import { Card } from 'antd'
import './heroCard.scss'

export default function HeroCard({ loading, hero, ...props }) {
	return (
		<Card className="card-body" {...props}>
			<img className="hero-img" src={hero.image} alt={hero.name} />
			<h2>{hero.name}</h2>
		</Card>
	)
}
