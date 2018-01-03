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

	initUser(){
		if (typeof(Storage) !== "undefined") {
			this._users = this.getUserList();

			let currentUserId = this.getCurrentUserId();
			let currentUserData = this._users[currentUserId];
			if(!currentUserData)
				currentUserData = this.getNewUserData();

			this._profile = new UserProfile(currentUserData);

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
			name: "이름없는 사용자",
			grade: "수련생",
			level: 1,
			icon: 0
		};
	}

	saveUser(profile){
		let p = (profile) ? profile : this._profile;

		this._users[p.id] = p;
		localStorage.setItem('users', JSON.stringify(this._users));
	}

	report(obj){
		console.log('this._badge>>>>', this._badge);
		this._badge.show();
	}
}

export default User;