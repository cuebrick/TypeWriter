import React from 'react';

class LevelItem extends React.Component{
	render(){
		return(
			<div className="level-item">
				<div className="level-title">{this.props.title}</div>
			</div>
		)
	}
}

export default LevelItem;