import React from 'react';
import LevelItem from './LevelItem';
import LevelData from '../json/level-data';
import { Link } from 'react-router-dom';

class LevelList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="levelList" className="level-list">
				{
					LevelData.map( (obj) => {
						return (
							<Link to={'/typing/'+ obj.id} key={obj.id}>
								<LevelItem
									dataId={obj.id}
									title={obj.title}
									// handleClick={this.handleItemClick}
									// levelData={this.props.levelListData[obj.id]}
								/>
							</Link>
						);
					})
				}
			</div>
		)
	}
}

export default LevelList;