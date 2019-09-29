import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import MyHeroes from './components/myHeroes/myHeroes'

function App() {
	return (
		<Provider store={store}>
			<MyHeroes />
		</Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))