class UserProfile{

	_data;

	constructor(props){
		this._data = {
			id: props.id,
			name: props.name,
			grade: props.grade,
			level: props.level,
			icon: props.icon
		}
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
	get level(){
		return this._data.level;
	}
	get icon(){
		return this._data.icon;
	}

	toString(){
		return JSON.stringify(this._data);
	}
}

export default UserProfile;