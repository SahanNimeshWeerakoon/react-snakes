import React from 'react'

const Snake = ({snakeDots}) => {
	return (
		<div className="snake">
			{snakeDots.map((dot, i) => {
				const style = {
					top: `${dot[1]}%`,
					left: `${dot[0]}%`
				}
				return (
					<div className="snake-dot" key={i} style={style}></div>
				)
			})}
		</div>
	)
}

export default Snake