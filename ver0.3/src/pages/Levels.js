import React from 'react';
import PlayManager from '../components/PlayManager';
import LevelList from "../components/LevelList";
import UserManager from "../components/UserManager";

class Levels extends React.Component{
	constructor(props){
		super(props);
		this.reloadLevels = this.reloadLevels.bind(this);
		this._pm = PlayManager.getInstance();
		this._pm.setLevels(this);
		this._um = UserManager.getInstance();

		this.state = {
			saveData : this._um.info.saveData
		}

		this._um.setReloadLevelsCallback(this.reloadLevels);

	}

	_pm;
	_um;

	reloadLevels(){
		this.setState({saveData : this._um.info.saveData});
	}

	render(){
		console.log('Levels.render', this._um.info.saveData);

		return(
			<div className="level-list-area">
				<h3>단계 목록</h3>
				<LevelList saveData={this.state.saveData}/>
			</div>
		)
	}
}

export default Levels;