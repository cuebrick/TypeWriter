import UserInfo from './UserInfo';

class User{
	static _instance;
	static getInstance(){
		if(this._instance)
			return this._instance;
		else
			return new User();
	}

	_data;
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

		this._data = {
			id: undefined,
			name: undefined,
			grade: undefined,
			icon: undefined,
			level: undefined
		};

		this.initUser();
	}

	get data(){
		return this._data;
	}
	get users(){
		return this._users;
	}
	get info(){
		return this._info;
	}


	get id(){
		return this._data.id;
	}
	get name(){
		return this._data.name;
	}
	get grade(){
		return this._data.grade;
	}
	get icon(){
		return this._data.icon;
	}
	get level(){
		return this._data.level;
	}

	setBadge(badge){
		this._badge = badge;
		console.log('this._badge>>>>', this._badge);
	}

	setLevel(level){
		this._level = level;
	}

	initUser(){
		// localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			this.reloadUserList();

			let data = this.getCurrentUserInfo();

			this.setUserInfo(new UserInfo(data));
		} else {
			// TODO: No Web Storage support..
		}
	}

	changeUser(id){
		localStorage.setItem('currentUser', id);
		this.initUser();
		return this.info;
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
		this.reloadUserList();
		delete this._users[id];
		localStorage.setItem('users', JSON.stringify(this._users));
		this.reloadUserList();
		return this._users;
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

	saveUser(userInfo){
		let info = (userInfo) ? userInfo : this._info;
		this._users[info.id] = info.data;
		localStorage.setItem('users', JSON.stringify(this._users));
		localStorage.setItem('currentUser', info.id);
	}

	saveLevelData(level){
		let info = this.getCurrentUserInfo();
		info.level[level.id] = level;
		let p = this._info;
		p.data.level[level.id] = info;
		this._users[p.id] = p.data;
		localStorage.setItem('users', JSON.stringify(this._users));
		console.log('saveLevelData() :', this.reloadUserList());
	}

	report(){
		this.saveLevelData(this._level);
		this._badge.show(this._level);
	}
}

export default User;