import React from 'react';

class LevelItem extends React.Component{
	render(){
		// console.log(this.props.dataId, this.props.saveData);
		let statusClassName = (this.props.saveData) ? ' unlock' : '';
		return(
			<div className="level-item" data-id={this.props.dataId}>
				<div className={"status" + statusClassName}></div>
				<div className="level-title">{this.props.title}</div>
			</div>
		)
	}
}

export default LevelItem;