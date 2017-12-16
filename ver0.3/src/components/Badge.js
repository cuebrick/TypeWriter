import React from 'react';

class Badge extends React.Component{
	render(){
		return(
			<div className="badge">
				<div className="badge-title">견습 마법사 등급</div>
				<div className="stars">
					<span className="star"></span><span className="star"></span><span className="star incomplete"></span>
				</div>
				<div className="description"></div>
			</div>
		)
	}
}

export default Badge;