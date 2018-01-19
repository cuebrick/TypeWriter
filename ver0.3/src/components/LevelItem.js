import React from 'react';

class LevelItem extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	run(){
		console.log('run()>>>>>>>>>>>>>>>>');
	}

	handleClick(){
		this.props.handleClick(this.props.dataId)
	}

	render(){
		console.log(this.props.dataId, this.props.levelData);
		let statusClassName = (this.props.levelData) ? ' unlock' : '';
		return(
			<div onClick={this.handleClick} className="level-item" data-id={this.props.dataId}>
				<div className={"status" + statusClassName}></div>
				<div className="level-title">{this.props.title}</div>
			</div>
		)
	}
}

export default LevelItem;