import LevelData from '../json/level-data';
import Level from "./Level";
import UserManager from "./UserManager";

class PlayManager {

	/****************************************************
	 * static
	 ****************************************************/
	static _instance;

	static getInstance() {
		if (PlayManager._instance)
			return PlayManager._instance;
		else
			return new PlayManager();
	}


	/****************************************************
	 * instance variables (private)
	 ****************************************************/
	// components
	_levels;
	_typing;
	_profile;

	// commons
	_um;

	/****************************************************
	 * instance method
	 ****************************************************/
	constructor() {
		if (!PlayManager._instance) {
			PlayManager._instance = this;
		} else {
			new Error('PlayManager is Singlton class !!');
		}

		this._um = UserManager.getInstance();
	}


	/****************************************************
	 * SET methods
	 ****************************************************/
	setLevels(levels){
		this._levels = levels;
		this._profile.toggleTypingMode(false);
	}

	setTyping(typing){
		this._typing = typing;
		this._profile.toggleTypingMode(true);
	}

	setProfile(profile){
		this._profile = profile;
	}

	/****************************************************
	 * GET methods
	 ****************************************************/
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