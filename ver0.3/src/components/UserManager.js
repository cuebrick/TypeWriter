import UserInfo from "./UserInfo";

class UserManager{
	/****************************************************
	 * static
	 ****************************************************/
	static _instance;

	static getInstance() {
		if (UserManager._instance)
			return UserManager._instance;
		else
			return new UserManager();
	}


	/****************************************************
	 * private instance variables
	 ****************************************************/
	_info;
	_users;

	_reloadLevelsCallback;
	_reloadSettingsCallback;

	/****************************************************
	 * instance method
	 ****************************************************/
	constructor() {
		if (!UserManager._instance) {
			UserManager._instance = this;
		} else {
			new Error('UserManager is Singlton class !!');
		}

		this.initUser();
	}

	reloadUserList(){
		return this.getUserListData();
	}

	createNewUser(options){
		this._info = new UserInfo(options);
		this.saveUser();
	}

	changeUser(id){
		localStorage.setItem('currentUser', id);
		this.initUser();
		this.getUserListData();
		if(this._reloadLevelsCallback)
			this._reloadLevelsCallback();
		if(this._reloadSettingsCallback)
			this._reloadSettingsCallback();
		return this._info;
	}

	requestDeleteUser(id){
		console.log('requestDeleteUser: >>', id);
		delete this._users[id];
		localStorage.removeItem(id);
		return this.reloadUserList();
	}

	saveLevelData(level){
		this._info.saveData[level.id] = level.result;
		this.saveUser(this._info);
	}

	setReloadLevelsCallback(callback){
		this._reloadLevelsCallback = callback;
	}

	setReloadSettingsCallback(callback){
		this._reloadSettingsCallback = callback;
	}

	removeSaveData(){
		this._info.removeSaveData();
		this.saveUser();
	}

	saveSettings(key, value){
		this._info.saveSettings(key, value);
		this.saveUser();
	}


	/****************************************************
	 * private method
	 ****************************************************/
	initUser(){
		// localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			this.reloadUserList();

			let data = this.getCurrentUserInfo();

			// data 가 undefined 라면 UserInfo 에서 이름없는 사용자를 자동으로 만들어줌.
			this._info = new UserInfo(data);
			this.saveUser(this._info);

		} else {
			// TODO: No Web Storage support..
		}
	}

	getUserListData(){
		if(!this._users)
			this._users = {};

		for(let uid in localStorage){
			if(uid.substr(0, 6) === '_USER_'){
				this._users[uid] = this.getUserInfo(uid);
			}
		}
		return this._users;
	}

	getUserInfo(id){
		return JSON.parse(localStorage.getItem(id));
	}

	getCurrentUserInfo(){
		let currentUserId = localStorage.getItem('currentUser');
		return this.getUserInfo(currentUserId);
	}

	saveUser(userInfo){
		let info = (userInfo) ? userInfo : this._info;
		this.saveCurrentUserId(info.id);

		localStorage.setItem(info.id, JSON.stringify(info.data));

		console.log('UserManager.saveUser() > localStorage :', localStorage);
	}

	saveCurrentUserId(id){
		localStorage.setItem('currentUser', id);
	}

	/****************************************************
	 * GETTER
	 ****************************************************/
	get info(){
		return this._info;
	}

	get users(){
		return this._users;
	}
}

export default UserManager;