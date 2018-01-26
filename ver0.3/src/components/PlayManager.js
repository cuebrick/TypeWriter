
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

	setLevels(levels){
		this._levels = levels;
	}

	setTyping(typing){
		this._typing = typing;
	}




	selectedLevel(id){
		console.log('PlayManager.selectedLevel() : ', id);
		this._typing.display(id);
		// let data = this.getLevelDataById(id);
		//
		// let level = new Level(data);
		// this.setState({
		// 	level: level,
		// 	mode: App.TYPING_MODE
		// });
		//
		// let user = User.getInstance();
		// user.setLevel(level);
		// user.getProfile().toggleTypingMode(true);
	}
}

export default PlayManager;