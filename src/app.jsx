import React from 'react'
import ReactDOM from 'react-dom'

import MyHeros from './components/myHeros/myHeros'

function App() {
	return (
		<MyHeros />
	)
}

ReactDOM.render(<App />, document.getElementById('app'))