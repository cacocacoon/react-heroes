import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Divider, Row, Col, Skeleton, message } from 'antd'

import { selectHero } from '../../reducers/uiReducer'
import { setProfile, patchHeroProfile } from '../../reducers/heroReducer'
import useHeroProfile from '../../hooks/useHeroProfile'
import './heroProfile.scss'

const ABILITIES = ['str', 'int', 'agi', 'luk']

export default function HeroProfile({ match }) {
	const heroId = match.params.heroId || '0'
	const [saving, setSaving] = useState(false)
	const heroProfile = useHeroProfile(heroId)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(selectHero(heroId))
	}, [dispatch, heroId])

	if (!heroId) {
		return null
	}

	const loading = Number(heroId) > 0 && !heroProfile

	if (loading) {
		return (
			<div className="hero-profile">
				<Divider dashed />
				<Skeleton paragraph={{ rows: 4 }} active />
			</div>
		)
	}

	function decrease(ability) {
		const newProfile = { ...heroProfile, [ability]: heroProfile[ability] - 1 }
		dispatch(setProfile(heroId, newProfile))
	}

	function increase(ability) {
		const newProfile = { ...heroProfile, [ability]: heroProfile[ability] + 1 }
		dispatch(setProfile(heroId, newProfile))
	}

	async function save() {
		if (saving) {
			return
		}

		const { maxPoints, ...profile } = heroProfile
		let totalPoints = 0
		for (const points of Object.values(profile)) {
			if (points < 0) {
				return
			}

			totalPoints += points
		}

		if (totalPoints !== maxPoints) {
			return
		}
		setSaving(true)
		const response = await dispatch(patchHeroProfile(heroId, profile))
		
		if (response === 'OK') {
			setSaving(false)
			message.success('儲存成功！')
		}
	}

	const remainingPoints = heroProfile.maxPoints - ABILITIES.reduce((accu, key) => accu + heroProfile[key], 0)

	return (
		<div className="hero-profile">
			<Divider dashed />
			<Row gutter={{ xs: 16, sm: 16, md: 24 }} type="flex" align="bottom">
				<Col xs={24} sm={12} md={12}>
					{ABILITIES.map(a => (
						<Ability
							key={a}
							ability={a}
							point={heroProfile[a]}
							increase={increase}
							decrease={decrease}
							remainingPoints={remainingPoints}
						/>
					))}
				</Col>
				<Col xs={24} sm={12} md={12}>
					<div className="right-panel">
						<p className="remaining">剩餘點數：{remainingPoints}</p>
						<Button
							type="primary"
							className="save-button"
							onClick={save}
							disabled={remainingPoints !== 0}
							loading={saving}
						>
							儲存
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	)
}

function Ability({ ability, point, increase, decrease, remainingPoints }) {
	const increaseDisabled = remainingPoints <= 0
	const decreaseDisabled = point <= 0

	return (
		<div className="ability">
			<p>{ability.toUpperCase()}</p>
			<Button shape="circle" icon="plus" onClick={() => increase(ability)} disabled={increaseDisabled}/>
			<p>{point}</p>
			<Button shape="circle" icon="minus" onClick={() => decrease(ability)} disabled={decreaseDisabled}/>
		</div>
	)
}