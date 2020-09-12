import React, { Component } from 'react';
import Snake from './components/snake'
import Food from './components/Food'
import './styles/App.scss';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			food: this.getRandomCoordinates(),
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