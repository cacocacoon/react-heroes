import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import HeorCards from '../heroCards/heroCards'
import HoerProfile from '../heroProfile/heroProfile'
import './myHeroes.scss'

export default function MyHeroes() {
	return (
		<div className="my-heroes">
			<Router>
				<HeorCards />
				<Switch>
					<Route path="/heroes/:heroId?" component={HoerProfile} exact />
					<Redirect to="/" />
				</Switch>
			</Router>
		</div>
	)
}