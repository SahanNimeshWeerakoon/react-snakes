import React, { Component } from 'react';
import Snake from './components/snake'
import Food from './components/Food'
import './styles/App.scss';

class App extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			food: this.getRandomCoordinates(),
			speed: 200,
			direction: 'RIGHT',
			highScore: 0,
			move: true,
			snakeDots : [
				[0,0],
				[2,0],
				[4,0]
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

	checkIfOutofBounds = () => {
		const { snakeDots } = this.state
		let head = snakeDots[snakeDots.length-1]
		if(head[0] > 100 || head[0] < 0 || head[1] >100 || head[1]<0) {
			this.handleGameOver()
		}
	}

	handleGameOver = () => {
		const { snakeDots, highScore } = this.state
		this.setState( (state, props) => {
			return {
				food: this.getRandomCoordinates(),
				speed: 2000,
				direction: 'RIGHT',
				snakeDots : [
					[0,0],
					[2,0],
					[4,0]
				]
			}
		})
		if(snakeDots.length - 3 > highScore) {
			this.setState({ highScore: snakeDots.length - 3 })
		}
		alert(`Game over dude. Your score is ${this.state.snakeDots.length - 3}`)
	}

	moveSnake = () => {
		const { snakeDots, direction, move } = this.state

		if(move) {

			let dots = [...snakeDots]
			let head = dots[dots.length - 1]

			switch(direction) {
				case 'LEFT':
					head = [head[0]-2, head[1]]
					break
				case 'UP':
					head = [head[0], head[1]-2]
					break
				case 'RIGHT':
					head = [head[0]+2, head[1]]
					break
				case 'DOWN':
					head = [head[0], head[1]+2]
					break
			}

			dots.push(head)
			dots.shift()

			this.setState({ snakeDots: dots })
		}
	}

	handleKeyDown = e => {
		e = e || window.event

		switch(e.keyCode) {
			case 37:
				this.setState({ move: true, direction: 'LEFT' })
				break
			case 38:
				this.setState({ move: true, direction: 'UP' })
				break
			case 39:
				this.setState({ move: true, direction: 'RIGHT' })
				break
			case 40:
				this.setState({ move: true, direction: 'DOWN' })
				break
			case 32:
				this.setState({ move: !this.state.move })
		}
	}

	checkIfCollpsed = () => {
		let snake = [...this.state.snakeDots]
		let head = snake[snake.length - 1]

		snake.pop()
		snake.forEach(dot => {
			if(head[0] == dot[0] && head[1]==dot[1]) {
				this.handleGameOver()
			}
		})
	}

	checkIfEat() {
		const { snakeDots, food, highScore } = this.state

		let head = snakeDots[snakeDots.length - 1]

		if(head[0]==food[0] && head[1]==food[1]) {
			this.setState({
				food: this.getRandomCoordinates()
			})

			if(snakeDots.length - 3 >= highScore) {
				this.setState({ highScore: snakeDots.length - 2 })
			}
			
			this.enlargeSnake()
			this.increaseSpeed()
		}
	}

	enlargeSnake = () => {
		let newSnake = [...this.state.snakeDots]
		newSnake.unshift([])

		this.setState({
			snakeDots: newSnake
		})

	}

	increaseSpeed = () => {
		const { speed } = this.state
		if(speed > 10) {
			this.setState({
				speed: speed-10
			})
		}
	}

	componentDidUpdate() {
		this.checkIfOutofBounds()
		this.checkIfCollpsed()
		this.checkIfEat()
	}

	componentDidMount() {
		document.onkeydown = this.handleKeyDown

		setInterval(this.moveSnake, this.state.speed)
	}

    render() {
    	const {snakeDots, food, move, highScore} = this.state
        return (
            <div className="game-area">
            	<Snake snakeDots={ snakeDots ? snakeDots : test } />
            	<Food dot={food}/>
            	<div className="data">
            		<p>Score: {snakeDots.length-3}</p>
            		<p>High Score: {highScore}</p>
            		<p>{move ? '' : 'PAUSED'}</p>
            	</div>
            </div>
        )
    }
}

export default App;