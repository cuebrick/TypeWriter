import React from 'react';
import PlayManager from '../components/PlayManager';
import LevelList from "../components/LevelList";

class Levels extends React.Component{
	constructor(props){
		super(props);
		this.selectedLevel = this.selectedLevel.bind(this);
		this._pm = PlayManager.getInstance();
		this._pm.setLevels(this);
	}

	_pm;

	selectedLevel(id){
		this._pm.selectedLevel(id);
	};

	render(){
		return(
			<div className="level-list-area">
				<h3>단계 목록</h3>
				<LevelList/>
			</div>
		)
	}
}

export default Levels;