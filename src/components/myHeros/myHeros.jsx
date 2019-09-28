import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import HeorCards from '../heroCards/heroCards'
import HoerProfile from '../heroProfile/heroProfile'
import './myHeros.scss'

export default function MyHeros() {
	return (
		<div className="my-heros">
			<HeorCards />
			<Router>
				<Switch>
					<Route path="/heros/:id?" component={HoerProfile} exact />
					<Redirect to="/" />
				</Switch>
			</Router>
		</div>
	)
}