import React from 'react';
import LevelItem from './LevelItem';
import LevelData from '../json/level-data';

class LevelList extends React.Component{
	constructor(props){
		super(props);
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick(id){
		console.log('handleItemClick:>>>>', id);
	}

	render(){
		return(
			<div className="level-list-area">
				<h3>단계 목록</h3>
				<div id="levelList" className="level-list">
					{
						LevelData.map( (obj) => {
							return (
								<LevelItem
									key={obj.id}
									dataId={obj.id}
									title={obj.title}
									handleClick={this.handleItemClick}
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