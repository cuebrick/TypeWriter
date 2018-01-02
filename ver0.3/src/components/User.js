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
	get image(){
		return this._data.icon;
	}
	get level(){
		return this._data.level;
	}

	setBadge(badge){
		this._badge = badge;
	}

	initUser(){
		if (typeof(Storage) !== "undefined") {
			this._users = this.getUserList();
			let currentUserId = this.getCurrentUserId();
			let currentUserData = this._users[currentUserId];
			if(!currentUserData)
				currentUserData = this.getNewUserData();

			this._profile = new UserProfile(currentUserData);


			// console.log('this._profile: ', this._profile);
			// let currentUserId = this.getCurrentUserId();
			// if(!currentUserId)
			// 	currentUserId = this.getNewUserId();
			//
			// let profile = userList[currentUserId];
			// if(profile)
			// 	this.setUserProfile(profile);
		} else {
			// TODO: No Web Storage support..
		}
	}

	getUserList(){
		let users = JSON.parse(localStorage.getItem('users'));
		if(!users)
			users = {};
		return users;
	}

	getCurrentUserId(){
		return localStorage.getItem('currentUser');
	}

	getNewUserData(){
		// TODO:
		return {
			id: 'user' + Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1),
			name: "이름 없는 사용자",
			grade: "수련생",
			level: 1,
			icon: 0
		};
	}

	setUserProfile(userId){

	}

	saveUser(userData){

	}

	report(obj){
		this._badge.show();
	}
}

export default User;