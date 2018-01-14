import UserInfo from './UserInfo';

class User{
	static _instance;
	static getInstance(){
		if(this._instance)
			return this._instance;
		else
			return new User();
	}

	_users;
	_info;
	_level;

	// components
	_badge;

	constructor(){
		if(!User._instance){
			User._instance = this;
		} else {
			new Error('User is Singlton class !!')
		}

		this.initUser();
	}

	get users(){
		return this._users;
	}
	get info(){
		return this._info;
	}


	setBadge(badge){
		this._badge = badge;
	}

	setLevel(level){
		this._level = level;
	}

	initUser(){
		// localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			this.reloadUserList();

			let data = this.getCurrentUserInfo();

			// data 가 undefined 라면 UserInfo 에서 이름없는 사용자를 자동으로 만들어줌.
			this.setUserInfo(new UserInfo(data));
		} else {
			// TODO: No Web Storage support..
		}
	}

	changeUser(id){
		localStorage.setItem('currentUser', id);
		this.initUser();
		return this._info;
	}

	setUserInfo(userInfo){
		this._info = userInfo;
		this.saveUser(userInfo);
	}

	reloadUserList(){
		return this._users = this.getUserListData();
	}

	requestDeleteUser(id){
		console.log('requestDeleteUser: >>', id);
		// this.reloadUserList();
		delete this._users[id];
		this.saveUsers();
		return this.reloadUserList();
	}

	getUserListData(){
		let users = JSON.parse(localStorage.getItem('users'));
		if(!users)
			users = {};
		return users;
	}

	getCurrentUserId(){
		return localStorage.getItem('currentUser');
	}

	getCurrentUserInfo(){
		let currentUserId = this.getCurrentUserId();
		return this._users[currentUserId];
	}

	saveCurrentUserId(id){
		localStorage.setItem('currentUser', id);
	}

	saveUser(userInfo){
		let info = (userInfo) ? userInfo : this._info;
		this._users[info.id] = info.data;
		this.saveUsers();
		this.saveCurrentUserId(info.id);
	}

	saveUsers(){
		localStorage.setItem('users', JSON.stringify(this._users));
	}

	saveLevelData(level){
		this._info.level[level.id] = level.result.star;
		this._users[this._info.id] = this._info.data;
		this.saveUsers();
	}

	report(){
		this.saveLevelData(this._level);
		this._badge.show(this._level);
	}
}

export default User;