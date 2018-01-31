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
	 * instance variables
	 ****************************************************/
	_info;
	_users;

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

	reloadUserList(){
		return this._users = this.getUserListData();
	}

	getUserListData(){
		let users = JSON.parse(localStorage.getItem('users'));
		if(!users)
			users = {};
		return users;
	}

	getCurrentUserInfo(){
		let currentUserId = localStorage.getItem('currentUser');
		return this._users[currentUserId];
	}

	setUserInfo(userInfo){
		this._info = userInfo;
		this.saveUser(userInfo);
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

	saveCurrentUserId(id){
		localStorage.setItem('currentUser', id);
	}

	createNewUser(options){
		this._info = new UserInfo(options);
		this.saveUser();
	}

	changeUser(id){
		localStorage.setItem('currentUser', id);
		this.initUser();
		return this._info;
	}

	requestDeleteUser(id){
		console.log('requestDeleteUser: >>', id);
		delete this._users[id];
		this.saveUsers();
		return this.reloadUserList();
	}

	/****************************************************
	 * GET method
	 ****************************************************/
	get info(){
		return this._info;
	}

	get users(){
		return this._users;
	}
}

export default UserManager;