import UserProfile from './UserProfile';

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
	_profile;

	// components
	_badge;
	_userList;

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
	get profile(){
		return this._profile;
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

	setUserList(userList){
		this._userList = userList;
	}

	initUser(){
		// localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			this.reloadUserList();

			let currentUserId = this.getCurrentUserId();
			let currentUserData = this._users[currentUserId];
			// if(!currentUserData)
			// 	currentUserData = this.getNewUserData();

			this.setUserProfile(new UserProfile(currentUserData));
		} else {
			// TODO: No Web Storage support..
		}
	}

	changeUser(id){
		localStorage.setItem('currentUser', id);
		this.initUser();
		return this.profile;
	}

	setUserProfile(profile){
		this._profile = profile;
		this.saveUser(profile);
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

	saveUser(profile){
		let p = (profile) ? profile : this._profile;
		this._users[p.id] = p.data;
		localStorage.setItem('users', JSON.stringify(this._users));
		localStorage.setItem('currentUser', p.id);
	}

	report(obj){
		console.log('this._badge>>>>', this._badge);
		this._badge.show();
	}
}

export default User;