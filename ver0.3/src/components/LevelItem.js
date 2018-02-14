import React from 'react';

class LevelItem extends React.Component{
	render(){
		let statusClassName = (this.props.saveData) ? ' unlock' : '';
		let level = this.props.level;
		return(
			<div className="level-item" data-id={level.dataId}>
				<div className={"status" + statusClassName}> </div>
				<div className="level-grade">
					<img src={"/images/grades/grade-icon-" + level.grade + ".svg"}/>
				</div>
				<div className="level-title">{level.title}</div>
				<div className="level-desc">{level.description}</div>
			</div>
		)
	}
}

export default LevelItem;