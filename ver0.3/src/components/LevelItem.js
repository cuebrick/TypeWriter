import React from 'react';

class LevelItem extends React.Component{
	render(){
		let statusClassName = '';
		let starNum = undefined;
		let stars;
		console.log('LevelItem.render:', this.props.saveData);
		if(this.props.saveData){
			statusClassName = ' unlock';
			starNum = this.props.saveData.star;

			stars = [...Array(3)].map((v, i) => {
				console.log(starNum , i);
				if(i < starNum){
					return <span key={"key"+i} className="star" />
				} else {
					return <span key={"key"+i} className="star incomplete" />
				}
			});
		}
		let level = this.props.level;
		return(
			<div className="level-item" data-id={level.dataId}>
				<div className={"status" + statusClassName}> </div>
				<div className="level-grade">
					<img src={"/images/grades/grade-icon-" + level.grade + ".svg"}/>
				</div>
				<div className="star-rating stars">
					{stars}
				</div>
				<div className="level-title">{level.title}</div>
				<div className="level-desc">{level.description}</div>
			</div>
		)
	}
}

export default LevelItem;