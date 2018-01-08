import UserProfile from './UserProfile';
import Reporter from './Reporter';

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
	_level;

	// object
	_reporter;

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

		this._reporter = new Reporter();
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

	setLevel(level){
		this._level = level;
	}

	initUser(){
		// localStorage.clear();
		if (typeof(Storage) !== "undefined") {
			this.reloadUserList();

			let currentUserId = this.getCurrentUserId();
			let currentUserData = this._users[currentUserId];

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

	report(data){
		this._level.result = this._reporter.getResult(data);
		this._badge.show(this._level);
	}
}

export default User;