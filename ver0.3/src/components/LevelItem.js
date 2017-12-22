import React from 'react';

class LevelItem extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		// console.log(this.key);
	}

	run(){
		console.log('run()>>>>>>>>>>>>>>>>');
	}

	handleClick(){
		this.props.handleClick(this.props.dataId)
	}

	render(){
		return(
			<div onClick={this.handleClick} className="level-item" data-id={this.props.dataId}>
				<div className="level-title">{this.props.title}</div>
			</div>
		)
	}
}

export default LevelItem;