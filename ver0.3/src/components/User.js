class User{
	static _instance;
	static get getInstance(){
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
		console.log('badge: ', badge);
	}
}

export default User;