import React from 'react';
import LevelItem from './LevelItem';
import LevelData from '../json/level-data';
import PlayManager from './PlayManager';

class LevelList extends React.Component{
	constructor(props){
		super(props);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.state = {
			isShow: true,
			levelId: 0
		}

	}

	handleItemClick(id){
		this.props.selectLevel(id);
	}

	show(){
		this.setState({isShow: true});
	}

	hide(){
		this.setState({isShow: false});
	}

	render(){

		return(
			<div className="level-list-area">
				<h3>단계 목록</h3>
				<div id="levelList" className="level-list">
					{
						LevelData.map( (obj) => {
							let d = this.props.levelData[obj.id];
							return (
								<LevelItem
									key={obj.id}
									dataId={obj.id}
									title={obj.title}
									handleClick={this.handleItemClick}
									levelData={d}
								/>
							);
						})
					}
				</div>
			</div>
		)
	}
}


export default LevelList;