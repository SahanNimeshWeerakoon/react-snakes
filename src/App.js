import React, { Component } from 'react';
import Snake from './components/snake'
import Food from './components/Food'
import './styles/App.scss';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			food: this.getRandomCoordinates(),
			direction: 'RIGHT',
			snakeDots : [
				[0,0],
				[2,0],
				[4,0],
				[6,0]
			]
		}
	}

	getRandomCoordinates = () => {
		let min = 1;
		let max = 98;
		let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
		let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;

		return [x, y]
	}

	moveSnake = () => {
		const { snakeDots, direction } = this.state

		let dots = [...snakeDots]
		let head = dots[dots.length - 1]

	}

	handleKeyDown = e => {
		e = e || window.event

		switch(e.keyCode) {
			case 37:
				this.setState({ direction: 'LEFT' })
				break
			case 38:
				this.setState({ direction: 'UP' })
				break
			case 39:
				this.setState({ direction: 'RIGHT' })
				break
			case 40:
				this.setState({ direction: 'DOWN' })
				break
		}
	}

	componentDidMount() {
		document.onkeydown = this.handleKeyDown
	}

    render() {
    	const {snakeDots, food} = this.state
        return (
            <div className="game-area">
            	<Snake snakeDots={ snakeDots } />
            	<Food dot={food}/>
            </div>
        );
    }
}

export default App;