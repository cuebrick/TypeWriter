class UserProfile{

	_data;

	constructor(props){
		if(props){
			this._data = {
				id: props.id,
				name: props.name,
				grade: props.grade,
				level: props.level,
				icon: props.icon
			}
		} else {
			this._data = {
				id: 'user' + Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1),
				name: "이름없는 사용자",
				grade: "수련생",
				level: 1,
				icon: 0
			}
		}
	}

	rename(name){
		this._data.name = name;
	}

	changeIcon(num){
		this._data.icon = num;
	}

	get data(){
		return this._data;
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