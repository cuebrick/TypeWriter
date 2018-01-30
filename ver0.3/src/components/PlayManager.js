import LevelData from '../json/level-data';
import Level from "./Level";

class PlayManager {

	static _instance;

	static getInstance() {
		if (PlayManager._instance)
			return PlayManager._instance;
		else
			return new PlayManager();
	}

	constructor() {
		if (!PlayManager._instance) {
			PlayManager._instance = this;
		} else {
			new Error('PlayManager is Singlton class !!');
		}
	}

	_levels;
	_typing;
	_profile;

	setLevels(levels){
		this._levels = levels;
	}

	setTyping(typing){
		this._typing = typing;
	}

	setProfile(profile){
		this._profile = profile;
	}


	getLevelObject(id){
		return new Level(this.getLevelDataById(id));
	}

	getLevelDataById(id){
		return LevelData.find(function(item){
			return (item.id === id);
		});
	}

	getNextLevelId(id){
		let data = this.getLevelDataById(id);
		let index = LevelData.indexOf(data);
		return LevelData[index + 1].id;
	}
}

export default PlayManager;