import React from 'react';
import Level from './Level';
import LevelItem from './LevelItem';
import LevelData from '../json/level-data';
import { Link } from 'react-router-dom';

class LevelList extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let params = new URLSearchParams(location.search);
		let prevLevel = params.get('lv');
		if(prevLevel){
			let top = document.getElementById(prevLevel).offsetTop;
			document.getElementById("levelList").scrollTop = top;
		}
	}

	render(){
		return(
			<div id="levelList" className="level-list">
				{
					LevelData.map( (obj, index) => {
						if(obj.type === Level.GROUP_TYPE){
							return(
								<div key={'breaker'+index} className="break-line">
									<div className="group-title">{obj.title}</div>
								</div>
							);
						} else {
							return (
								<Link to={'/typing/'+ obj.id} key={obj.id} id={obj.id}>
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