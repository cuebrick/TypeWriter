class User{
	static _instance;
	static getInstance(){
		return this._instance;
	}

	constructor(){
		if(!User._instance){
			User._instance = this;
		} else {
			new Error('User is Singlton class !!')
		}
	}

	_badge;

	setBadge(badge){
		this._badge = badge;
	}

	report(obj){
		this._badge.show();
	}
}

export default User;