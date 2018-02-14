import React from 'react';

class LevelItem extends React.Component{
	render(){
		let statusClassName = (this.props.saveData) ? ' unlock' : '';
		return(
			<div className="level-item" data-id={this.props.dataId}>
				<div className={"status" + statusClassName}></div>
				<div className="level-grade">
					<img src={"/images/grades/grade-icon-" + this.props.grade + ".svg"}/>
				</div>
				<div className="level-title">{this.props.title}</div>
				<div className="level-desc">{this.props.description}</div>
			</div>
		)
	}
}

export default LevelItem;