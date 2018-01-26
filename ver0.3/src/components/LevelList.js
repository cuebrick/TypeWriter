import React from 'react';
import LevelItem from './LevelItem';
import LevelData from '../json/level-data';
import { Link } from 'react-router-dom';

class LevelList extends React.Component{
	constructor(props){
		super(props);
		// this.handleItemClick = this.handleItemClick.bind(this);
		this.state = {
			isShow: true,
			levelId: 0
		}
	}

	/*handleItemClick(id){
		this.props.selectLevel(id);
	}*/

	show(){
		this.setState({isShow: true});
	}

	hide(){
		this.setState({isShow: false});
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