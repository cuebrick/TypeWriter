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
						if(obj.break){
							return(
								<div className="break-line"></div>
							)
						} else {
							return (
								<Link to={'/typing/'+ obj.id} key={obj.id}>
									<LevelItem
										level={obj}
										saveData={this.props.saveData[obj.id]}
									/>
								</Link>
							);
						}

					})
				}
			</div>
		)
	}
}

export default LevelList;