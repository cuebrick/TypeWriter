import React from 'react';

class LevelItem extends React.Component{
	render(){
		let statusClassName = '';
		let starNum = undefined;
		let stars;

		if(this.props.saveData){
			statusClassName = ' unlock';
			starNum = this.props.saveData.star;

			stars = [...Array(3)].map((v, i) => {
				if(i < starNum){
					return <span key={"key"+i} className="star" />
				} else {
					return <span key={"key"+i} className="star incomplete" />
				}
			});
		}
		let level = this.props.level;
		let breakLineClassName = (level.break) ? ' break-line' : '';

		return(
			<div className={"level-item" + breakLineClassName} data-id={level.dataId}>
				<div className={"status" + statusClassName}> </div>
				<div className="count">{this.props.count}</div>
				<div className="level-grade">
					<img src={"./images/grades/grade-icon-" + level.grade + ".svg"}/>
				</div>
				<div className="star-rating stars">
					{stars}
				</div>
				<div className="level-title">{level.title}</div>
				<div className="level-desc">{level.subtitle}</div>
			</div>
		)
	}
}

export default LevelItem;